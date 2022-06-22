import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Divider,
  FormGroup,
  Modal,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { SSLogo } from "../components";
import { useHomeEffects, Credentials } from "./Home.effects";
import { alignProperty } from "@mui/material/styles/cssUtils";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const {
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
    checked,
    handleCheck,
    loginError,
    loginErrorMessage,
  } = useHomeEffects();

  return (
    <div
      className="container"
      style={{
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ alignContent: "center" }}>
        <SSLogo/>
      </div>
      <div
        style={{
          width: "65%",
          border: "2px solid #7c7c90",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        <FormGroup>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              id="order-id"
              label="Order ID"
              helperText="This is prefilled"
              value={orderId}
              disabled
              style={{ marginTop: "5%", width: "50%" }}
            />
          </div>
        </FormGroup>
        <Divider style={{ marginTop: "3%", marginBottom: "3%" }} />
        <FormGroup>
          <TextField
            id="pickup-address"
            label="Pickup Address"
            value={pickupAddress}
            onChange={(e) => {
              setPickupAddress(e.target.value);
            }}
            fullWidth
          />
          <TextField
            id="delivery-address"
            label="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
            fullWidth
            style={{ marginTop: "3%" }}
          />
          //The items table comes here
          <div>
            <FormControlLabel
              style={{ color: "black" }}
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => {
                    handleCheck(checked);
                  }}
                />
              }
              label="I have these items in inventory."
            />
          </div>
        </FormGroup>
        <Button
          disabled={!checked}
          variant="contained"
          type="submit"
          onClick={() => {
            login({ email, password, storeId } as Credentials);
          }}
          color="info"
        >
          Create Shipment
        </Button>
        {isOpen && (
          <Modal open={isOpen}>
            <Box sx={style}>
              <Typography variant="h4" align="center">
                Log in to Salvagescout
              </Typography>
              <TextField
                id="email"
                label="Email Address"
                defaultValue="john.doe@example.com"
                helperText="The email address you use to log in to SalvageScout"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                fullWidth
                style={{ marginTop: "5%" }}
              />
              <TextField
                id="password"
                type="password"
                label="password"
                error={loginError}
                helperText={loginErrorMessage}
                FormHelperTextProps={{ error: loginError }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                fullWidth
                style={{ marginTop: "5%" }}
              />
              <FormGroup>
                <Button
                  type="submit"
                  onClick={() => {
                    login({ email, password, storeId } as Credentials);
                  }}
                  variant="contained"
                  color="info"
                  style={{
                    display: "flex",
                    marginTop: "5%",
                    backgroundColor: "rgb(5, 29, 75)",
                  }}
                >
                  Login
                </Button>
              </FormGroup>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
}
