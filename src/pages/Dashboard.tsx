import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { useUser } from "../contexts/userContext";
import { db } from "../firebase.config";
import uniqid from "uniqid";
import Button from "../components/Button";
import Logout from "../components/auth/Logout";
import { useDashboard } from "../contexts/dashboardContext/DashboardContext";
import { actionTypes } from "../contexts/dashboardContext/types";
import EditGoatModal from "../components/modals/EditGoatModal";
import UserGoatsCard from "../components/cards/UserGoatsCard";
import { GoatType } from "./Home";
import CircularLoader from "../components/CircularLoader";

const Dashboard = () => {
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const { state, dispatch } = useDashboard();
    useEffect(() => {
        const goatsCollectionRef = collection(db, "goats");
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
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
                dispatch({ type: actionTypes.SET_LOADING, payload: false });
            }
        );
    }, [user.id]);

    const handleEdit = (id: string) => {
        setShowModal(true);
        dispatch({ type: actionTypes.EDIT_GOAT, payload: { id } });
    };

    const handleDelete = (id: string) => {
        dispatch({ type: actionTypes.DELETE_GOAT, payload: { id } });
    };
    return (
        <div className=" md:flex  justify-between  mt-10 ">
            {showModal && (
                <EditGoatModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
            <section className="mb-10 md:mb-0">
                <div className="bg-gray-100  p-10 rounded-lg space-y-3 shadow-md grid place-items-center">
                    <img src={user.image} className="rounded-full w-50 h-50" />
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
            <section className="max-h-screen md:overflow-hidden  overflow-auto md:hover:overflow-auto ">
                {state.loading && <CircularLoader />}
                <div className="grid md:grid-cols-2 justify-center items-center lg:grid-cols-3 gap-10 ">
                    {/* return goat component passing props and with optional chainining */}
                    {state.goats?.length ? (
                        state.goats.map((goat) => (
                            <UserGoatsCard
                                contact={goat.contact}
                                location={goat.location}
                                type={goat.type}
                                images={goat.images}
                                id={goat.id}
                                price={goat.price}
                                weight={goat.weight}
                                key={uniqid()}
                                handleDelete={() => handleDelete(goat.id)}
                                handleEdit={() => handleEdit(goat.id)}
                            />
                        ))
                    ) : (
                        <div className="text-2xl grid place-content-center font-bold text-center text-primaryDark">
                            No Goats Created
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
