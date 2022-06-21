import React, { useState } from "react";

export const useUserState = () => {
    const [isLogged, setLogged] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [loginToken, setLoginToken] = useState("");



    return {isLogged, setLogged, authToken, setAuthToken, loginToken, setLoginToken};
}