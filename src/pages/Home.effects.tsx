import axios from "axios";
import React, { useState, useEffect } from "react";
import { encrissBaseUrl } from "../config/config";
import { useUserState } from "../hooks/useUserState";

export interface Credentials {
  email: string;
  password: string;
  storeId: string;
}

export const useHomeEffects = () => {
    const [orderId, setOrderId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setOpen] = useState(true);

  const { setLogged, setAuthToken, setLoginToken } = useUserState();

  useEffect(() => {
    setOrderId("111-222");
    setStoreId("86110a3d-f8ba-41c9-9eae-29c04c836ff3");
  }, []);

  const handleClose = () => {
    setOpen(false);
  } 

  const login = async (creds: Credentials) => {
    const { email, password, storeId } = creds;
    const result = await axios({
      method: 'POST',
      url: `${encrissBaseUrl}/auth/login`,
      data: {
        usernameOrEmail: email,
        storeId,
        password
      }
    })

    console.log(result);

    if(result.status === 200 && result.data !== 'Unable to login') {
      setLogged(true);
      const {data} = result;
      setAuthToken(data.accessToken);
      setLoginToken(data.loginToken);
      handleClose();
    } else {
      setLogged(false);
    }

  }


  return {email, setEmail, password, setPassword, orderId, storeId, isOpen, handleClose, login};
};