import React, { useEffect, useState } from "react";
import Logout from "../components/auth/Logout";
import GoatDataServices from "../services/goats-services";
type GoatType = {
    contact: number;
    image: string;
    location: string;
    price: number;
    type: string;
    weight: number;
    id: string;
}[];
const Home = () => {
    const [goats, setGoats] = useState<GoatType>([]);
    useEffect(() => {
        fetchGoats();
    }, []);
    const fetchGoats = async () => {
        const data = await GoatDataServices.getGoats();
        setGoats(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as any))
        );
        // data.docs.map((doc) => {
        //     console.log(doc.data);
        //     setGoats([...goats, { ...doc.data(), id: doc.id }] as GoatType);
        // });
    };

    return (
        <div>
            {goats.length > 0 &&
                goats.map((goat) => (
                    <div>
                        <p>{goat.type}</p>
                        <p>{goat.image}</p>
                        <p>{goat.contact}</p>
                        <p>{goat.location}</p>
                        <p>{goat.weight}</p>
                        <p>{goat.price}</p>
                        <p>{goat.id}</p>
                        <br />
                    </div>
                ))}
            {/* homepage */}
            <Logout />
        </div>
    );
};

export default Home;
