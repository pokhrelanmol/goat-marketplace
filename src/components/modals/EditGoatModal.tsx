import { yupResolver } from "@hookform/resolvers/yup";
import { Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { MdCancel } from "react-icons/md";
import { ImageListType } from "react-images-uploading";
import { useDashboard } from "../../contexts/dashboardContext/DashboardContext";
import CreateGoat, { IForm, scheme } from "../../pages/CreateGoat";
import { GoatType } from "../../pages/Home";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
interface EditModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditGoatModal = ({ showModal, setShowModal }: EditModalProps) => {
    const { state, dispatch } = useDashboard();
    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
    } = useForm<IForm>({ resolver: yupResolver(scheme), mode: "onBlur" });

    const onSumbit = (data: IForm) => {
        setLoading(true);
        // GoatDataServices.uploadImagesBase64(images).then((res) => {
        //     const newData = { ...data, images: res, userId: user.id };
        //     GoatDataServices.addGoat(newData);
        //     reset();
        //     setImages([]);
        //     setLoading(false);
        // });
    };
    return (
        <div>
            <div className="justify-center  bg-gray-50 bg-opacity-60  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-center">
                                Modal Title
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="p-10">
                            <Input
                                type="select"
                                name="type"
                                label="Type"
                                register={register}
                                errors={errors}
                                selectOptions={[
                                    "Khasi",
                                    "Boka",
                                    "Baili",
                                    "Mou",
                                    "Pathi",
                                ]}
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
                                defaultValue={state.goatToEdit.type}
                            />
                            <Input
                                type="number"
                                name="weight"
                                label="Weight"
                                register={register}
                                errors={errors}
                                placeholder="Weight"
                                defaultValue={state.goatToEdit.weight}
                            />
                            <Input
                                type="number"
                                name="price"
                                label="Price"
                                register={register}
                                errors={errors}
                                placeholder="Price"
                                defaultValue={state.goatToEdit.price}
                            />
                            <Input
                                type="number"
                                name="contact"
                                label="Contact Number"
                                register={register}
                                errors={errors}
                                placeholder="Contact Number"
                                defaultValue={state.goatToEdit.contact}
                            />

                            <Input
                                type="text"
                                name="location"
                                label="Location"
                                register={register}
                                errors={errors}
                                placeholder="Location"
                                defaultValue={state.goatToEdit.location}
                            />
                            {/* images */}
                            <ImageUpload
                                setValue={setValue}
                                errors={errors}
                                loading={loading}
                                defaultImages={
                                    state.goatToEdit
                                        .images as unknown as ImageListType
                                }
                            />

                            {/* add other input fields */}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150 absolute top-1 right-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                <Tooltip content="cancel">
                                    <MdCancel className="text-3xl" />
                                </Tooltip>
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
};

export default EditGoatModal;
