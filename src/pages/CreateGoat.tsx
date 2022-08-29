import React, { useState } from "react";
import { useUser } from "../contexts/userContext";
import GoatDataServices from "../services/goats-services";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input";
import Button from "../components/Button";
import ImageUpload from "../components/ImageUpload";
import { useToast } from "../contexts/ToastContext";
import { Navigate, useNavigate } from "react-router-dom";

export interface IForm {
    type: string;
    weight: number;
    location: string;
    price: number;
    contact: number;
    images: string[];
}
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const scheme = yup.object().shape({
    type: yup
        .string()
        .required("Type is required")
        .min(3, "Type must be at least 3 characters")
        .max(20, "Type must be less than 20 characters"),
    weight: yup
        .number()
        .typeError("Weight is not a number")
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
    images: yup.array().required("Images are required"),
});

const CreateGoat = () => {
    const { user } = useUser();
    const { setToast } = useToast();
    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
        watch,
    } = useForm<IForm>({ resolver: yupResolver(scheme), mode: "onBlur" });
    const navigate = useNavigate();
    const selectInput = watch("type");
    const onSumbit = (data: IForm) => {
        setLoading(true);
        GoatDataServices.uploadImagesBase64(data.images).then((res) => {
            const newData = { ...data, images: res, userId: user.id };
            GoatDataServices.addGoat(newData);
            reset();
            setValue("images", []);
            setLoading(false);
            navigate("/dashboard");
            setToast({
                type: "success",
                msg: "Goat added successfully",
                show: true,
            });
        });
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl text-center my-5 text-secondaryPink">
                {" "}
                Create Goat
            </h1>
            <form
                // onSubmit={handleSubmit(onSumbit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center "
            >
                <Input
                    type="select"
                    name="type"
                    label="Type"
                    register={register}
                    selectValue={selectInput}
                    errors={errors}
                    selectOptions={["Khasi", "Boka", "Baili", "Mou", "Pathi"]}
                    placeholder="Type"
                    onChange={(
                        e: React.ChangeEvent<
                            HTMLInputElement | HTMLSelectElement
                        >
                    ) =>
                        setValue("type", e.target.value, {
                            shouldValidate: true,
                        })
                    }
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
                    <ImageUpload setValue={setValue} errors={errors} />
                </div>
            </form>
            <div className="text-center my-5">
                <Button
                    buttonType="pink-filled"
                    type="submit"
                    onClick={handleSubmit(onSumbit)}
                    {...(loading ? { disabled: true } : {})}
                >
                    {loading ? "uploading..." : "Create Goat"}
                </Button>
            </div>
        </div>
    );
};

export default CreateGoat;
