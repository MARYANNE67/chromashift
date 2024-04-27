import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { UpdateUserType, CreateUserType } from '@/types/index.type'
import { handleError } from '@/lib/utils'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Get the ID and type
  const { id} = evt.data;
  const eventType = evt.type;

//sync creating user with local db and clerk
  if(eventType === "user.created"){
    const {id, email_addresses, image_url, username, first_name, last_name} = evt.data;

    const user : CreateUserType = {
        clerkId: id,
        email: email_addresses[0]?.email_address ,
        username: username!,
        photo: image_url,
        firstName: first_name,
        lastName: last_name
    };

        try{
            const newUser = await createUser(user);
            if(newUser){
                await clerkClient.users.updateUserMetadata(id,{ 
                    publicMetadata: 
                        newUser.clerkId
                    }
                );

                return NextResponse.json({message: "SUCCESS: Create user", user: newUser });
            }else throw new Error("ERROR: User creation faile");
        }catch(error){
            handleError(error);
        }
  }

//sync updating user with local db and clerk
  if(eventType === "user.updated"){
    const {id, username, image_url, first_name, last_name} = evt.data;

    const user : UpdateUserType ={
        username: username!,
        photo: image_url, 
        firstName: first_name,
        lastName: last_name,
    }

    try{    
        const updatedUser = await updateUser(id, user);
        if(updateUser) return NextResponse.json({message: "SUCCESS: Updated user", user: updateUser });
        else throw new Error("ERROR: User update failed")
    }catch(error){
        handleError(error)
    }
  }

//sync deleting user with local db and clerk
  if(eventType === "user.deleted"){
    const {id} = evt.data;

    try{    
        const deletedUser = await deleteUser(id!);
        if(deletedUser) return NextResponse.json({message: "SUCCESS: Updated user", user: deletedUser });
        else throw new Error("ERROR: User deletion failed")
    }catch(error){
        handleError(error)
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}