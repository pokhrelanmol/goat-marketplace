import { yupResolver } from "@hookform/resolvers/yup";
import { Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useDashboard } from "../../contexts/dashboardContext/DashboardContext";
import { IForm, scheme } from "../../pages/CreateGoat";
import goatsServices from "../../services/goats-services";
import Button from "../Button";
import Input from "../Input";
interface EditModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditGoatModal = ({ showModal, setShowModal }: EditModalProps) => {
    const navigate = useNavigate();
    const { state, dispatch } = useDashboard();
    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
    } = useForm<IForm>({
        resolver: yupResolver(scheme),
        mode: "onBlur",
        defaultValues: {
            type: state.goatToEdit.type,
            weight: state.goatToEdit.weight,
            location: state.goatToEdit.location,
            price: state.goatToEdit.price,
            contact: state.goatToEdit.contact,
            images: state.goatToEdit.images,
        },
    });

    const onSumbit = handleSubmit((data: IForm) => {
        setLoading(true);
        goatsServices
            .updateGoat(state.goatToEdit.id, data)
            .then((res) => {
                setLoading(false);
                navigate("/");
                reset();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    return (
        <div>
            <form
                onSubmit={onSumbit}
                className="justify-center  bg-gray-50 bg-opacity-60  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold ">
                                Update Goat
                            </h3>
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
                                // defaultValue={state.goatToEdit.type}
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
                            <p className="text-red-600 text-sm">
                                NOTE: Images cannot be updated if you want to
                                update image then you have to delete and
                                recreate posts
                            </p>

                            {/* images cannot d */}
                            {/* add other input fields */}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none  ease-linear transition-all duration-150 absolute top-1 right-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                <Tooltip content="cancel">
                                    <MdCancel className="text-3xl" />
                                </Tooltip>
                            </button>
                            <Button buttonType="pink-outline" type="submit">
                                {loading ? "Updating..." : "Update"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
};

export default EditGoatModal;
