declare type CreateUserType = {
    clerkId: string; 
    email: string; 
    username: string; 
    photo: string; 
    firstName: string; 
    lastName: string; 
} 

declare type UpdateUserType ={
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
}

declare type UpdateImageType ={
    image:{
        transformationType: string;
        publicId: string;
        secureUrl: string;
        width: number;
        height: number;
        config: object;
        transformationUrl: string;
        aspectRatio: string;
        color: string;
        prompt?: string;   
    };
    userId: string;
    path: string
}


declare type AddImageType ={
    image:{
        transformationType: string;
        publicId: string;
        secureUrl: string;
        width: number;
        height: number;
        config: object;
        transformationUrl: string;
        aspectRatio: string;
        color: string;
        prompt?: string;   
    };
    userId: string;
    path: string
}
