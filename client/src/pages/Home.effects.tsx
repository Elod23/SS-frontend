import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  encrissBaseUrl,
  shipengineApiKey,
  shipengineBaseUrl,
} from "../config/config";
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
  const [isOpenDownload, setOpenDownload] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [items, setItems] = useState([]);
  const [addressCorrect, setAddressCorrect] = useState(false);
  const [itemListCorrect, setItemListCorrect] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessages] = useState("");
  const [rateId, setRateId] = useState("");
  const [shipmentId, setShipmentId] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const {
    setLogged,
    setAuthToken,
    setLoginToken,
    isLogged,
    loginToken,
    authToken,
  } = useUserState();

  const { orderID, storeID } = useParams();

  useEffect(() => {
    setOrderId(orderID || "");
    setStoreId(storeID || "");
  }, [orderID, storeID]);

  const updateTrackingUrl = useCallback( async() => {
    const result = await axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      url: `${encrissBaseUrl}/api/v1/store/updateSubOrderTrackingURL`,
      data: {
        storeId,
        subOrderId: orderId,
        token: {
          fingerprint: {
            deviceFingerprint: "",
            jsonOtherInfo: ""
          },
          loginToken: loginToken
        },
        trackingUrl: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`
      }
    })
    console.log(result);
    if(result.status === 200) {
      console.log("success");
    } else {
      console.log("fail");
    }
  }, [authToken, loginToken, orderId, storeId, trackingNumber]);

  const fetchDetails = useCallback(
    async (loginToken: string) => {
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
        const rateId = result.data.shippingOption.rateId;
        setRateId(rateId);
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
    },
    [authToken, orderId]
  );

  useEffect(() => {
    if (isLogged) {
      fetchDetails(loginToken);
    }
  }, [isLogged, fetchDetails, loginToken]);

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
      setLoginError(true);
      setLoginErrorMessages("Email or password is incorrect");
    }
  };

  const createShipment = useCallback(async () => {
    if (rateId) {
      const shipEngineUrl = `https://api.shipengine.com/v1/labels/rates/${rateId}`;
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "API-Key": shipengineApiKey,
        Host: shipengineBaseUrl,
      };
      const body = {
        "label-format": "pdf",
        "label-layout": "4x6",
      };
      const result = await axios({
        method: "POST",
        url: `http://localhost:3333/shipengine/${encodeURIComponent(
          shipEngineUrl
        )}`,
        headers,
        data: body,
      });
      console.log(result);
      if (result.status === 200 && !result.data.errors) {
        const { shipment_id, tracking_number, label_download } = result.data;
        console.log(shipment_id, tracking_number, label_download.pdf);
        setShipmentId(shipment_id);
        setTrackingNumber(tracking_number);
        setLabels([label_download.pdf!, label_download.png!, label_download.zpl!]);
        setOpenDownload(true);
        await updateTrackingUrl();
      }
    }
  }, [rateId, updateTrackingUrl]);

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
    addressCorrect,
    itemListCorrect,
    setAddressCorrect,
    setItemListCorrect,
    updateTrackingUrl,
    labels,
    shipmentId,
    trackingNumber,
    createShipment,
    isOpenDownload,
    setOpenDownload,
    loginError,
    loginErrorMessage,
  };
};
