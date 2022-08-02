import React from "react";
import { setSourceMapRange } from "typescript";

import { auth } from "../../firebase-config";
const Logout = () => {
    const logout = () => {
        auth.signOut()
            .then(() => {
                console.log("logged out");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return <button onClick={logout}>Logout</button>;
};

export default Logout;
