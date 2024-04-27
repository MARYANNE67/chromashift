"use server"
import {connectionToDatabase} from '../database/mongoose'
import {handleError} from '../utils'
import {
    CreateUserType,
    UpdateUserType,
  } from '../../types/index.type'; // Adjust the path based on your project structure
import UserModel from '../database/models/user.model';
import { revalidatePath } from 'next/cache';
  
// create users
export async function createUser(user: CreateUserType){
    try{
        await connectionToDatabase();

        const newUser = await UserModel.create(user);
        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        handleError(error)
    }
}

//get users
export async function getUser(userId: string){
    try{
        await connectionToDatabase();

        const user = await UserModel.findOne({clerkId: userId});
        
        if(!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user))
    }catch(error){
        handleError(error)
    }
}

// update users 
export async function updateUser(clerkId: string, user: UpdateUserType){
    try{
        await connectionToDatabase();

        const updatedUser = await UserModel.findOneAndUpdate(
            {clerkId}, user,{
                new: true
            })

        if(!updatedUser) throw new Error('User update failed')

        return JSON.parse(JSON.stringify(updateUser));
    }catch(error){
        handleError(error)
    }
}

// delete users
export async function deleteUser(clerkId: string){
    try{
        await connectionToDatabase();

        const userToBeDelete = await UserModel.findOne({clerkId})

        if(!userToBeDelete) throw new Error('User delete failed')
        
        const deletedUser = await UserModel.findOneAndDelete(userToBeDelete._id);

        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    }catch(error){
        handleError(error)
    }
}