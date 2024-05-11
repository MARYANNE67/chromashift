/* eslint-disable no-unused-vars */
import { Image_ } from "@/lib/database/models/image.model";

export declare type CreateUserType = {
    clerkId: string; 
    email: string; 
    username: string; 
    photo: string; 
    firstName: string; 
    lastName: string; 
} 

export declare type UpdateUserType ={
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
}


export declare type Transformations = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
      prompt: string;
      removeShadow?: boolean;
      multiple?: boolean;
    };
    recolor?: {
      prompt?: string;
      to: string;
      multiple?: boolean;
    };
    removeBackground?: boolean;
  };
  
  // ====== TRANSACTION Type
export declare type CheckoutTransactionType = {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
  };
  

  export declare type AddImageType ={
    image: {
      title: string;
      publicId: string;
      transformationType: string;
      width: number;
      height: number;
      config: any;
      secureURL: string;
      transformationURL: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };

  
export declare type UpdateImageType = {
  image: {
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

export declare type CreateTransactionType = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
  };

  export declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

// ====== URL QUERY Type
export declare type FormUrlQueryType = {
  searchType: string;
  key: string;
  value: string | number | null;
};

export declare type UrlQueryType = {
  Type: string;
  key: string;
  value: string | null;
};

export declare type RemoveUrlQueryType = {
  searchType: string;
  keysToRemove: string[];
};

 export declare type SearchParamProps = {
  Type: { id: string; type: TransformationTypeKey };
  searchType: { [key: string]: string | string[] | undefined };
};

export declare type TransformationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: Image_ | null;
  config?: Transformations | null;
};

export declare type FinalImageType = {
    image: any;
    type: string;
    title: string;
    transformationConfig: Transformations | null;
    isTransforming: boolean;
    hasDownloaded?: boolean;
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
  };
