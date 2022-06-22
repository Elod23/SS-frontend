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
  Typography
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
    loginErrorMessage
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
        <SSLogo />
      </div>
      <div
        style={{ width: "65%", border: "2px solid #7c7c90", padding: "1rem" }}
      >
        <FormGroup>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="order-id">Order ID</InputLabel>
              <Input
                id="order-id"
                aria-describedby="Your order ID"
                value={orderId}
                disabled
                fullWidth
              />
              <FormHelperText id="my-helper-text">
                This is prefilled.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth style={{ marginLeft: "2%" }}>
              <InputLabel htmlFor="store-id">Store ID</InputLabel>
              <Input
                id="store-id"
                aria-describedby="Your store ID"
                value={storeId}
                disabled
                fullWidth
              />
              <FormHelperText id="my-helper-text">
                This is prefilled.
              </FormHelperText>
            </FormControl>
          </div>
        </FormGroup>
        <Divider style={{ marginTop: "3%", marginBottom: "3%" }} />
        <FormGroup>
          <FormControl fullWidth>
            <InputLabel htmlFor="pickup-address">Pickup Address</InputLabel>
            <Input
              id="pickup-address"
              aria-describedby="pickup-address"
              value={pickupAddress}
              onChange={(e) => {
                setPickupAddress(e.target.value);
              }}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "3%" }}>
            <InputLabel htmlFor="delivery-address">Delivery Address</InputLabel>
            <Input
              id="delivery-address"
              aria-describedby="delivery-address"
              value={deliveryAddress}
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
              }}
              fullWidth
            />
          </FormControl>
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
          <Modal open={isOpen} onClose={handleClose}>
            <Box sx={style}>
              <Typography variant="h4" align="center">Log in to Salvagescout</Typography>
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
                  style={{ display: "flex", marginTop: "5%" }}
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
