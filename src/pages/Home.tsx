import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import uniqid from "uniqid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoatCard from "../components/cards/GoatCard";
import Hero from "../components/layout/Hero";
import { useUser } from "../contexts/userContext";
import { auth, db } from "../firebase.config";
import GoatDataServices from "../services/goats-services";
export type GoatType = {
    contact: number;
    images: string[];
    location: string;
    price: number;
    type: string;
    weight: number;
    id: string;
};
const Home = () => {
    const { user, setUser } = useUser();
    const [goats, setGoats] = useState<GoatType[]>([]);
    useEffect(() => {
        fetchAllGoats();
    }, [user.id]);
    //@dev:gettting all the goats from the database
    // @dev :onSnapshot is a listener that will listen to the database and update the state whenever there is a change
    const goatCollectionRef = collection(db, "goats");
    const fetchAllGoats = () => {
        onSnapshot(
            query(goatCollectionRef, where("userId", "!=", `${user.id}`)),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setGoats(data as unknown as GoatType[]);
            }
        );
    };

    return (
        <main className="mt-20">
            <Hero />
            {/* cards */}
            <h1 className="text-center font-semibold text-4xl mb-5 text-secondaryPink">
                What's New
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center space-y-5  ">
                {goats.length > 0 &&
                    goats.map((goat) => (
                        <div className="" key={uniqid()}>
                            <GoatCard
                                contact={goat.contact}
                                price={goat.price}
                                weight={goat.weight}
                                location={goat.location}
                                type={goat.type}
                                images={goat.images}
                                id={goat.id}
                            />
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default Home;
