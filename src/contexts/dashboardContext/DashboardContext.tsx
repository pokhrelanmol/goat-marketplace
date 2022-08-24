import React, { useEffect } from "react";
import { GoatType } from "../../pages/Home";
import { createContext } from "react";
import { Actions, actionTypes, DashboardContextType, IState } from "./types";

import goatsServices from "../../services/goats-services";

const initialState: IState = {
    goats: [],
    goatToEdit: {} as GoatType,
    loading: false,
};

export const reducer = (state: IState, action: Actions): IState => {
    switch (action.type) {
        case actionTypes.FETCH_USER_GOATS:
            return { ...state, goats: [...action.payload] };
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case actionTypes.EDIT_GOAT:
            return {
                ...state,
                goatToEdit: state.goats.find(
                    (goat) => goat.id === action.payload.id
                ) as GoatType,
            };
        case actionTypes.DELETE_GOAT:
            goatsServices.deleteGoat(action.payload.id).then((data) => {
                console.log("deleted");
            });
            return state;

        default:
            return state;
    }
};

export const DashboardContext = createContext<DashboardContextType>(
    {} as DashboardContextType
);
export const DashboardContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState as IState);
    useEffect(() => {
        console.log(state);
    }, [state.goats, state.goatToEdit]);
    return (
        <DashboardContext.Provider value={{ state, dispatch }}>
            {children}
        </DashboardContext.Provider>
    );
};
export const useDashboard = () => React.useContext(DashboardContext);
