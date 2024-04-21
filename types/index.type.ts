import { Image_ } from "@/lib/models/image.model";

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
  declare type CheckoutTransactionType = {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
  };
  
  declare type CreateTransactionType = {
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
declare type FormUrlQueryType = {
  searchType: string;
  key: string;
  value: string | number | null;
};

declare type UrlQueryType = {
  Type: string;
  key: string;
  value: string | null;
};

declare type RemoveUrlQueryType = {
  searchType: string;
  keysToRemove: string[];
};

declare type SearchParamProps = {
  Type: { id: string; type: TransformationTypeKey };
  searchType: { [key: string]: string | string[] | undefined };
};

declare type TransformationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: Image_ | null;
  config?: Transformations | null;
};

declare type TransformedImageProps = {
    image: any;
    type: string;
    title: string;
    transformationConfig: Transformations | null;
    isTransforming: boolean;
    hasDownload?: boolean;
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
  };
