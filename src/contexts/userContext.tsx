import React, { createContext, useContext, useState } from "react";
interface UserType {
    name: string;
    email: string;
    id: string;
    image: string;
}
type ProviderProps = {
    children: React.ReactNode;
};
type UserContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
};
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<UserType>({} as UserType);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);
