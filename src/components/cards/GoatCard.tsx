import React from "react";
import { GoatType } from "../../pages/Home";

const GoatCard = ({
    type,
    contact,
    image,
    location,
    price,
    weight,
}: GoatType) => {
    return (
        <div className="">
            <div className="w-80 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800  cursor-pointer   dark:border-gray-700">
                <img
                    className="min-w-full rounded-t-lg h-72  mb-3 "
                    src={image}
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
                </div>
            </div>
        </div>
    );
};

export default GoatCard;
