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
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [items, setItems] = useState("");
  const [checked, setChecked] = useState(false);
  const {
    setLogged,
    setAuthToken,
    setLoginToken,
    isLogged,
    loginToken,
    authToken,
  } = useUserState();

  useEffect(() => {
    setOrderId("755-147-1");
    setStoreId("86110a3d-f8ba-41c9-9eae-29c04c836ff3");
  }, []);

  const fetchDetails = async (loginToken: string) => {
    const result = await axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      url: `${encrissBaseUrl}/store/getSubOrderDetails`,
      data: {
        orderId: orderId,
        token: {
          fingerprint: {
            createdAt: 0,
            deviceFingerprint: "",
            jsonOtherInfo: "",
            userId: 0,
          },
          loginToken,
        },
      },
    });
    console.log(result);

    if (result.status === 200 && result.data !== "") {
      const pAddress = result.data.store.storeAddress;
      const dAddress = result.data.deliveryAddress;
      const items = result.data.orderItems;
      setPickupAddress(
        pAddress.addLine1 +
          " " +
          pAddress.addLine2 +
          ", " +
          pAddress.city +
          ", " +
          pAddress.addState +
          ", " +
          pAddress.zipCode
      );
      setDeliveryAddress(
        dAddress.addLine1 +
          " " +
          dAddress.addLine2 +
          ", " +
          dAddress.city +
          ", " +
          dAddress.addState +
          ", " +
          dAddress.zipCode
      );
      setItems(items);



    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchDetails(loginToken);
    }
  }, [isLogged]);

  const handleClose = () => {
    setOpen(false);
  };

  const login = async (creds: Credentials) => {
    const { email, password, storeId } = creds;
    const result = await axios({
      method: "POST",
      url: `${encrissBaseUrl}/auth/login`,
      data: {
        usernameOrEmail: email,
        storeId,
        password,
      },
    });

    console.log(result);

    if (result.status === 200 && result.data !== "Unable to login") {
      setLogged(true);
      const { data } = result;
      setAuthToken(data.accessToken);
      setLoginToken(data.loginToken);
      handleClose();
    } else {
      setLogged(false);
    }
  };

  const handleCheck = (checked: boolean) => {
    setChecked(!checked)
    console.log(checked)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    orderId,
    storeId,
    isOpen,
    handleClose,
    login,
    pickupAddress,
    setPickupAddress,
    deliveryAddress,
    setDeliveryAddress,
    items,
    checked,
    handleCheck
  };
};
