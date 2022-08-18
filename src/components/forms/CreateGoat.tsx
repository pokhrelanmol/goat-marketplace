import React, { useState } from "react";
import { useUser } from "../../contexts/userContext";
import GoatDataServices from "../../services/goats-services";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadImages from "react-file-base64";
import Input from "../Input";
import Button from "../Button";
import { getConfigFileParsingDiagnostics } from "typescript";

interface IForm {
    type: string;
    weight: number;
    location: string;
    price: number;
    contact: number;
    images: string[];
}
const CreateGoat = () => {
    const [formData, setFormData] = useState<IForm>({} as IForm);
    const [images, setImages] = useState<Array<string>>([]);
    const { user } = useUser();
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const SUPPORTED_IMAGE_FORMAT = ["image/jpg", "image/jpeg", "image/png"];
    const scheme = yup.object().shape({
        type: yup
            .string()
            .required("Type is required")
            .min(3, "Type must be at least 3 characters")
            .max(20, "Type must be less than 20 characters"),
        weight: yup
            .number()
            .required("Weight is required")
            .min(5, "Weight must be at least 5"),
        location: yup
            .string()
            .required("Location is required")
            .min(3, "Location must be at least 3 characters")
            .max(20, "Location must be less than 20 characters"),
        price: yup.number().required("Price is required"),
        contact: yup
            .string()
            .required("Contact is required")
            .matches(phoneRegExp, "Contact must be a valid phone number")
            .min(10, "Contact must be 10 characters")
            .max(10, "Contact must be 10 characters"),
        images: yup
            .mixed()
            .required("Images are required")
            .test(
                "file format",
                "please upload png/jpeg/jpg images only",
                (value) => value && SUPPORTED_IMAGE_FORMAT.includes(value.type)
            ),
    });
    const {
        register,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
    } = useForm<IForm>({ resolver: yupResolver(scheme) });
    const onSumbit = (data: IForm) => {
        // upload image to firebase storage and get the url and upload to database

        alert(JSON.stringify(data));
    };
    const getFiles = (files: [string]) => {
        setImages([...images, ...files]);
        setValue("images", [...images, ...files]);
    };
    return (
        <div className="p-10">
            <h1 className="text-3xl text-center my-5 text-secondaryPink">
                {" "}
                Create Goat
            </h1>
            <form
                onSubmit={handleSubmit(onSumbit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center "
            >
                <Input
                    type="select"
                    name="type"
                    label="Type"
                    register={register}
                    errors={errors}
                    selectOptions={["Khasi", "Boka", "Baili", "Mou", "Pathi"]}
                    placeholder="Type"
                />
                <Input
                    type="number"
                    name="weight"
                    label="Weight"
                    register={register}
                    errors={errors}
                    placeholder="Weight"
                />
                <Input
                    type="text"
                    name="location"
                    label="Location"
                    register={register}
                    errors={errors}
                    placeholder="Location"
                />
                <Input
                    type="number"
                    name="price"
                    label="Price"
                    register={register}
                    errors={errors}
                    placeholder="Price"
                />
                <Input
                    type="text"
                    name="contact"
                    label="Contact"
                    register={register}
                    errors={errors}
                    placeholder="Contact"
                />
                {/* handle image */}
                <div className="space-y-2">
                    <label
                        htmlFor=""
                        className="mb-2 block text-lg font-semibold text-primaryDark"
                    >
                        Images
                    </label>
                    <UploadImages
                        multiple={true}
                        {...register("images")}
                        onDone={(files: [string]) => getFiles(files)}
                    />
                    {images.length > 0 ? (
                        <div className="flex">
                            {images.map((image: any, index: number) => (
                                <img
                                    key={index}
                                    src={image.base64}
                                    alt="image"
                                    className="w-20 h-20 ml-2 rounded-lg"
                                />
                            ))}
                        </div>
                    ) : null}
                    <p className="text-red-600">{errors.images?.message}</p>
                </div>
            </form>
            <div className="text-center my-5">
                <Button buttonType="pink-filled" type="submit">
                    Create Goat
                </Button>
            </div>
        </div>
    );
};

export default CreateGoat;
