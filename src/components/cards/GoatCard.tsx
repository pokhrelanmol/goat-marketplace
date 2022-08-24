import React from "react";
import { GoatType } from "../../pages/Home";

const GoatCard = ({
    type,
    contact,
    images,
    location,
    price,
    weight,
}: GoatType) => {
    return (
        <div className="">
            <div className="w-80 p-3 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer  ">
                <img
                    className="min-w-full h-72 rounded-t-lg mb-3 "
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
                </div>
            </div>
        </div>
    );
};

export default GoatCard;
