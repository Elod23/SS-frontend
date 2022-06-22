import React from "react";
import {
  FormGroup,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import { SSLogo } from "../components";
import { useHomeEffects, Credentials } from "./Home.effects";
import { LoginModal } from "../components/LoginModal";

export default function Home() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    orderId,
    storeId,
    isOpen,
    items,
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
        <SSLogo />
      </div>
      <div
        style={{
          width: "65%",
          border: "2px solid #7c7c90",
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormGroup style={{ marginBottom: "6%" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  id="order-id"
                  label="Order ID"
                  helperText="This is prefilled"
                  value={orderId}
                  disabled
                  style={{ marginTop: "5%" }}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <TextField
                id="pickup-address"
                label="Pickup Address"
                value={pickupAddress}
                onChange={(e) => {
                  setPickupAddress(e.target.value);
                }}
              />
              <TextField
                id="delivery-address"
                label="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                }}
                style={{ marginTop: "3%" }}
              />
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
                  label="I consent that the origin and target addresses are valid."
                />
              </div>
            </FormGroup>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            asdasdas
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Order Items
            </Typography>
            <List dense>
              {items.map((item: any) => (
                <ListItem key={item.orderItemId}>
                  <ListItemAvatar>
                    <ListItemIcon />
                  </ListItemAvatar>
                  <ListItemText primary={item?.product?.productName || "as"} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <Button
          disabled={!checked || items.length === 0}
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
          <LoginModal 
            isOpen={isOpen}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            storeId={storeId}
            login={login}
            loginError={loginError}
            loginErrorMessage={loginErrorMessage}
          />
        )}
      </div>
    </div>
  );
}
