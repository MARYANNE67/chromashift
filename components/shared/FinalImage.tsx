import { FinalImageType } from '@/types/index.type'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
// import FinalImageType from 

const downloadHandler = () => {

}

const FinalImage = (
 {   
    image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transformationConfig,
    hasDownloaded=false} : FinalImageType
) => {
  return (
    <div className='flex flex-col gap-4'> 
    <div className='flex-between'>
    <h3 className='h3-bold text-dark-600'>
    Transformed Image
    </h3>

    {hasDownloaded && 
    (<button
    className="download-btn"
    onClick={downloadHandler}>
        <Image
        src="/assets/icons/download.svg"
        alt="Download"
        width={24}
        height={24}
        className='pb-[6px]'
        />

    </button>)}

     </div>
    {image?.publicId && transformationConfig ? (
        <div className='relative'>
             <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={image?.publicId}
                alt={image?.title}
                sizes ={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="transformed-image"
                onLoad= {() => {
                    setIsTransforming && setIsTransforming (false) ;
                
                }}
                onError={() => {
                    debounce(()=> {
                        setIsTransforming && setIsTransforming (false) ;
                    }, 8000)
                }}

                {...transformationConfig}
                />

                {isTransforming && (
                    <div className='transforming-loader'>
                        <Image
                        src="/assets/icons/spinner.svg"
                        alt="Transforming"
                        width={40}
                        height={40}
                        />
                    </div>
                )}
        </div>
    ) : (
        <div className='transformed-placeholder'>
            Transformed Image
        </div>
    )} 
   

    </div>
  )
}

export default FinalImage