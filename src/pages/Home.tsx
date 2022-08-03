import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoatCard from "../components/cards/GoatCard";
import Hero from "../components/layout/Hero";
import { useUser } from "../contexts/userContext";
import { auth } from "../firebase-config";
import GoatDataServices from "../services/goats-services";
export type GoatType = {
    contact: number;
    image: string;
    location: string;
    price: number;
    type: string;
    weight: number;
};
const Home = () => {
    const [goats, setGoats] = useState<GoatType[]>([]);
    useEffect(() => {
        fetchGoats();
    }, []);
    const fetchGoats = async () => {
        const data = await GoatDataServices.getGoats();
        setGoats(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as any))
        );
    };

    return (
        <main className="mt-20">
            <Hero />
            {/* cards */}
            <h1 className="text-center font-semibold text-4xl text-secondaryPink">
                What's New
            </h1>
            <div className="flex mt-5 space-x-10">
                {goats.length > 0 &&
                    goats.map((goat) => (
                        <div className="">
                            <GoatCard
                                contact={goat.contact}
                                price={goat.price}
                                weight={goat.weight}
                                location={goat.location}
                                type={goat.type}
                                image={goat.image}
                            />
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default Home;
