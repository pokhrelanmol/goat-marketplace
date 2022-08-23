import { GoatType } from "../../pages/Home";

export enum actionTypes {
    FETCH_USER_GOATS = "FETCH_USER_GOATS",
    DELETE_GOAT = "DELETE_GOAT",
    EDIT_GOAT = "EDIT_GOAT",
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
type EDIT_GOAT = {
    type: actionTypes.EDIT_GOAT;
    payload: { id: string };
};

type UPDATE_GOAT = {
    type: actionTypes.UPDATE_GOAT;
    payload: { id: string; goat: GoatType };
};

export type Actions =
    | CREATE_GOAT
    | FETCH_USER_GOATS
    | DELETE_GOAT
    | UPDATE_GOAT
    | EDIT_GOAT;
export type IState = {
    goats: GoatType[];
    goatToEdit: GoatType;
};
export type DashboardContextType = {
    state: IState;
    dispatch: React.Dispatch<Actions>;
};
