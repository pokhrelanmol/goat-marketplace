import React from "react";
import { GoatType } from "../../pages/Home";
type IState = GoatType[];
export const initialState: [] = [];
export enum actionTypes {
    FETCH_USER_GOATS = "FETCH_USER_GOATS",
    DELETE_GOAT = "DELETE_GOAT",
    UPDATE_GOAT = "UPDATE_GOAT",
    CREATE_GOAT = "CREATE_GOAT",
}
type CREATE_GOAT = {
    type: actionTypes.CREATE_GOAT;
    payload: GoatType;
};
type FETCH_USER_GOATS = {
    type: actionTypes.FETCH_USER_GOATS;
    payload: GoatType[];
};

type DELETE_GOAT = {
    type: actionTypes.DELETE_GOAT;
    payload: { id: string };
};

type UPDATE_GOAT = {
    type: actionTypes.UPDATE_GOAT;
    payload: { id: string; goat: GoatType };
};
type Actions = CREATE_GOAT | FETCH_USER_GOATS | DELETE_GOAT | UPDATE_GOAT;
export const profileReducer = (state: IState, action: Actions): IState => {
    switch (action.type) {
        case actionTypes.FETCH_USER_GOATS:
            // console.log(action.payload);
            return [...action.payload];

        default:
            return state;
    }
};
