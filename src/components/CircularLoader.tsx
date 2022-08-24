import React from "react";

const CircularLoader = () => {
    return (
        <div className="flex min-w-full justify-centergo items-center  ">
            Loading
            <div className="animate-spin rounded-full  h-12 w-12 border-indigo-500 border-t-4 border-b-4"></div>
        </div>
    );
};

export default CircularLoader;
