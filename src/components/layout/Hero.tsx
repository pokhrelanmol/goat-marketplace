import React from "react";
import goatImage from "../../assets/goat-gceac6b476_1920.jpg";
const Hero = () => {
    return (
        <div>
            {/* left text*/}
            <section className="bg-white dark:bg-gray-900">
                <div className="grid items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mx-auto  lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-primaryDark text-5xl font-semibold tracking-wide leading-snug  capitalize dark:text-white">
                            <span className="text-5xl  text-secondaryPink">
                                All you need is here.
                            </span>
                            stop wasting your valuable time and money in the
                            search of goat
                        </h1>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img
                            src={goatImage}
                            className="shadow-md rounded-lg h-[300px] w-[500px]"
                            alt="mockup"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
