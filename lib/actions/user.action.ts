"use server"

import User from '../models/user.model'
import {connectionToDatabase} from '../mongoose'
import {handleError} from '../utils'
import {CreateUserType, UpdateUserType} from '../../types/index.type'

// create users
export async function createUser(user: CreateUserType){
    try{
        await connectionToDatabase();

        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        handleError(error)
    }
}

//get users
export async function getUser(userId: string){
    try{
        await connectionToDatabase();

        const user = await User.findOne({clerkId: userId});
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

        const updatedUser = await User.findOneAndUpdate(
            {clerkId}, user,{
                new: true
            })

        if(!updatedUser) throw new Error('User update failed')
  
    }catch(error){
        handleError(error)
    }
}

// delete users
export async function deleteUser(clerkId: string){
    try{
        await connectionToDatabase();

        const deletedUser = await User.findOneAndDelete({clerkId})
        if(!deletedUser) throw new Error('User delete failed')
        return JSON.parse(JSON.stringify(deletedUser))
    }catch(error){
        handleError(error)
    }
}