"use client";

import React from "react";
import { useToast } from "../ui/use-toast"
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploadedType = {
    onValueChange :  (value : string) => void;
    setImage: React.Dispatch<any>;
    publicId:  string;
    image: any;
    type: string
}

const MediaUploader = (
    {onValueChange,
    setImage,
    publicId,
    image,
    type} : MediaUploadedType

) => {
    const {toast} = useToast();

    const uploadSuccesHandler = (result: any) =>{
        setImage((prevState: any)=>({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureUrl: result?.info?.secure_url,
            }))

        onValueChange(result?.info?.public_id)

        toast({
            title: "Image uploading successfully ...." ,
            description:"One credit has been deducted" ,
            duration: 3000,
            className: 'success-toast ',
        })
    }

    const uploadErrorHandler= (result: any) =>{
        toast({
            title: "Error occurred while uploading image ...." ,
            description:"Please try again" ,
            duration: 3000,
            className: 'error-toast',
            variant: "destructive"
        })
    }
  return (
    <div>
        <h1>MediaUploader</h1>

        <CldUploadWidget 
        uploadPreset="ship_chromashift"
        options ={{
            multiple : false,
            resourceType:"image"
        }}
        onSuccess={uploadSuccesHandler}
        onError={uploadErrorHandler}
        >
        {({ open }) => {
            return (
              <div className="flex flex-col gap-4">
                <h3 className="h3-bold text-dark-600">
                    Original Image
                </h3>

                {publicId? 
                <>
                   <div  className="cursor-pointer overflow-hidden rounded=[10px]">
                    <CldImage
                    width={getImageSize(type, image, "width")}
                    height={getImageSize(type, image, "height")}
                    src={publicId}
                    alt="image"
                    sizes ={"(max-width: 767px) 100vw, 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="media-uploader_cldImage"
                    />
                    </div>
                </>
                :
                
                (   
                <div className="media-uploader_cta"
                onClick= {() => open()}>
                <div className="media-uploader_cta-image">
                    <Image 
                    src="/assets/icons/add.svg"
                    alt="Add Image"
                    width = {24}
                    height={24}
                    />   
                 
                </div>
                <p className="p-14-medium">
                    Click here to upload image
                </p> 
                </div>
                )
                } 
              </div>
            );
          }}
       
    </CldUploadWidget>
    </div>

  )
}

export default MediaUploader