"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import ImageModel from "../database/models/image.model";
import { redirect } from "next/navigation";

// import { v2 as cloudinary } from 'cloudinary'
import UserModel from "../database/models/user.model";
import { connectionToDatabase } from "../database/mongoose";
import { AddImageType, UpdateImageType } from "@/types/index.type";

const populateUserModel = (query: any) => query.populate({
  path: 'author',
  model: UserModel,
  select: '_id firstName lastName clerkId'
})

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageType) {
  try {
    await connectionToDatabase()

    const author = await UserModel.findById(userId);

    if (!author) {
      throw new Error("UserModel not found");
    }

    const newImage = await ImageModel.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error)
  }
}

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageType) {
  try {
    await connectionToDatabase();

    const imageToUpdate = await ImageModel.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await ImageModel.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    )

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error)
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await connectionToDatabase();

    await ImageModel.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error)
  } finally{
    redirect('/')
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    await connectionToDatabase();

    const image = await populateUserModel(ImageModel.findById(imageId));

    if(!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES
// export async function getAllImages({ limit = 9, page = 1, searchQuery = '' }: {
//   limit?: number;
//   page: number;
//   searchQuery?: string;
// }) {
//   try {
//     await connectionToDatabase();

//     cloudinary.config({
//       cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//       secure: true,
//     })

//     let expression = 'folder=imaginify';

//     if (searchQuery) {
//       expression += ` AND ${searchQuery}`
//     }

//     const { resources } = await cloudinary.search
//       .expression(expression)
//       .execute();

//     const resourceIds = resources.map((resource: any) => resource.public_id);

//     let query = {};

//     if(searchQuery) {
//       query = {
//         publicId: {
//           $in: resourceIds
//         }
//       }
//     }

//     const skipAmount = (Number(page) -1) * limit;

//     const images = await populateUserModel(ImageModel.find(query))
//       .sort({ updatedAt: -1 })
//       .skip(skipAmount)
//       .limit(limit);
    
//     const totalImages = await ImageModel.find(query).countDocuments();
//     const savedImages = await ImageModel.find().countDocuments();

//     return {
//       data: JSON.parse(JSON.stringify(images)),
//       totalPage: Math.ceil(totalImages / limit),
//       savedImages,
//     }
//   } catch (error) {
//     handleError(error)
//   }
// }

// // GET IMAGES BY UserModel
// export async function getUserModelImages({
//   limit = 9,
//   page = 1,
//   UserModelId,
// }: {
//   limit?: number;
//   page: number;
//   UserModelId: string;
// }) {
//   try {
//     await connectionToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;

//     const images = await populateUserModel(ImageModel.find({ author: UserModelId }))
//       .sort({ updatedAt: -1 })
//       .skip(skipAmount)
//       .limit(limit);

//     const totalImages = await ImageModel.find({ author: UserModelId }).countDocuments();

//     return {
//       data: JSON.parse(JSON.stringify(images)),
//       totalPages: Math.ceil(totalImages / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }