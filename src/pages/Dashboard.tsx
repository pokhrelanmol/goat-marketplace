import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import GoatCard from "../components/cards/GoatCard";
import { useUser } from "../contexts/userContext";
import { db } from "../firebase-config";
import uniqid from "uniqid";
import Button from "../components/Button";
import {
    initialState,
    profileReducer,
} from "../reducers/profileReducer/profileReducer";
import { actionTypes } from "../reducers/profileReducer/profileReducer";
import { GoatType } from "./Home";
import Logout from "../components/auth/Logout";
import UserGoatsCard from "../components/cards/UserGoatsCard";
import Input from "../components/Input";
import EditGoatModal from "../components/modals/EditGoatModal";

const Dashboard = () => {
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [state, dispatch] = useReducer(profileReducer, initialState);

    useEffect(() => {
        const goatsCollectionRef = collection(db, "goats");
        onSnapshot(
            query(goatsCollectionRef, where("userId", "==", `${user.id}`)),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                dispatch({
                    type: actionTypes.FETCH_USER_GOATS,
                    payload: data as unknown as GoatType[],
                });
            }
        );
    }, [user.id]);
    const handleEdit = (id: string) => {
        console.log("clicked  " + id);
    };
    const handleDelete = (id: string) => {};
    return (
        <div className=" md:flex justify-between  mt-10 ">
            {showModal && (
                <EditGoatModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
            <section className="mb-10 md:mb-0">
                <div className="bg-gray-100  p-10 rounded-lg space-y-3 shadow-md grid place-items-center">
                    <img src={user.image} className="rounded-full" />
                    <p className="capitalize font-bold before:content-['Name-']  before:text-primaryDark text-gray-400">
                        {user.name}
                    </p>
                    <p className="capitalize font-bold before:content-['Contact-']  before:text-primaryDark text-gray-400">
                        7872130231
                    </p>
                    <p className="capitalize font-bold before:content-['Address-'] before:text-primaryDark text-gray-400">
                        Lingsey,Dabaipani
                    </p>
                    <Button
                        buttonType="dark-filled"
                        onClick={() => setShowModal(true)}
                    >
                        Edit
                    </Button>
                    <Logout />
                    {/* TODO:Add follow button later */}
                </div>
            </section>
            {/* user listed goats */}
            <section className=" h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto ">
                <div className="grid md:grid-cols-2 justify-center items-center lg:grid-cols-3 gap-10 ">
                    {state.length > 0 &&
                        state.map((goat) => (
                            <div className="" key={uniqid()}>
                                <UserGoatsCard
                                    contact={goat.contact}
                                    price={goat.price}
                                    weight={goat.weight}
                                    location={goat.location}
                                    type={goat.type}
                                    images={goat.images}
                                    id={goat.id}
                                    handleEdit={() => handleEdit(goat.id)}
                                    handleDelete={() => handleDelete(goat.id)}
                                />
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
