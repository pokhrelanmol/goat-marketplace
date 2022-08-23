import React, { useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
type ImageUploadProps = {
    setValue: any;
    loading: boolean;
    errors: any;
    defaultImages?: ImageListType;
};
export default function ImageUpload({
    errors,
    defaultImages,
    setValue,
    loading,
}: ImageUploadProps) {
    const [images, setImages] = React.useState(defaultImages!);
    const maxNumber = 69;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        setImages(imageList as never[]);
        setValue("images", imageList, { shouldValidate: true });
    };
    useEffect(() => {
        // @dev- checking if image is uploaded or not
        if (!loading) setImages(defaultImages!);
    }, [loading]);
    return (
        <div className="ImageUpload">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="">
                        <button
                            className="bg-secondaryPink p-3 rounded-full"
                            onClick={(e) => {
                                e.preventDefault();
                                onImageUpload();
                            }}
                            {...dragProps}
                        >
                            Click or Drop images
                        </button>
                        &nbsp;
                        <button
                            className="bg-primaryDark text-white p-3 rounded-full"
                            onClick={onImageRemoveAll}
                        >
                            Remove all images
                        </button>
                        <div className="grid grid-cols-3 mt-3 items-center justify-center gap-2">
                            {imageList.map((image, index) => (
                                <div key={index} className="">
                                    <img
                                        src={image.dataURL}
                                        alt=""
                                        width="100"
                                    />
                                    <div className="space-x-2 text-center">
                                        <button
                                            className=" text-primaryDark font-bold hover:text-gray-500"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className=" text-secondaryPink font-bold hover:text-red-500"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
            <p className="text-red-600">{errors.images?.message}</p>
        </div>
    );
}
function e(e: any, images: ImageListType, arg2: never[]): void {
    throw new Error("Function not implemented.");
}
