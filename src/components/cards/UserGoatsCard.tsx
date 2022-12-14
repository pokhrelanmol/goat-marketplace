import { Tooltip } from "flowbite-react";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { GoatType } from "../../pages/Home";

// extend goat type to inclde handleDelete and handleEdit
type UserGoatType = GoatType & {
    handleDelete: () => void;
    handleEdit: () => void;
};
const UserGoatsCard = ({
    type,
    contact,
    images,
    location,
    price,
    weight,
    handleEdit,
    handleDelete,
}: UserGoatType) => {
    return (
        <div>
            <div className="">
                <div className="w-52 p-5 max-h-72 overflow-y-scroll bg-white rounded-lg border border-gray-200 shadow-md   cursor-pointer">
                    <img
                        className="w-50 rounded-t-lg h-50  mb-3 "
                        src={images[0]}
                        alt=""
                    />
                    <div className="space-y-3 p-3">
                        <p className=" capitalize before:content-['Type:'] before:text-black text-gray-600">
                            {type}
                        </p>
                        <p className=" capitalize before:content-['weight:'] before:text-black text-gray-600">
                            {weight}kg
                        </p>
                        <p className=" capitalize before:content-['price:'] text-gray-600 before:text-black">
                            &#8377;{price}
                        </p>
                        <p className=" capitalize before:content-['location:'] text-gray-600 before:text-black">
                            {location}
                        </p>
                        <p className=" capitalize before:content-['contact:'] text-gray-600 before:text-black">
                            {contact}
                        </p>
                        {/* delete and edit icons */}
                        <div className="flex justify-between">
                            <Tooltip content="Edit">
                                <MdEdit
                                    className="w-7 h-7 bg-gray-100 shadow-md p-2 text-yellow-600 rounded-full"
                                    onClick={handleEdit}
                                />
                            </Tooltip>
                            <Tooltip content="Remove">
                                <MdDelete
                                    onClick={handleDelete}
                                    className="w-7 h-7 p-2 bg-gray-100 shadow-md text-red-600 rounded-full"
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserGoatsCard;
