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
  ListItemText,
  Divider,
  List,
  Avatar,
} from "@mui/material";
import { useHomeEffects } from "./Home.effects";
import { LoginModal } from "../components/LoginModal";
import { LabelModal } from "../components/LabelModal";
import { ErrorModal } from "../components/ErrorModal";

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
    addressCorrect,
    setAddressCorrect,
    itemListCorrect,
    setItemListCorrect,
    createShipment,
    updateTrackingUrl,
    labels,
    isOpenDownload,
    setOpenDownload,
    apiError,
    setApiError,
    loginError,
    loginErrorMessage,
  } = useHomeEffects();

  return (
    <div
      className="container"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
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
            width: "65%",
            border: "2px solid #072c60",
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
                        checked={addressCorrect}
                        onChange={(e) => {
                          setAddressCorrect(!addressCorrect);
                        }}
                      />
                    }
                    label="I consent that the origin and target addresses are valid."
                  />
                </div>
              </FormGroup>
              <Button
            disabled={!addressCorrect || !itemListCorrect || items.length === 0}
            variant="contained"
            type="submit"
            onClick={() => {
              createShipment();
            }}
            color='info'
            fullWidth
          >
            Create Shipment
          </Button>
            </div>
          </div>
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
          {isOpenDownload && labels && (<LabelModal isOpen={isOpenDownload} close={() => setOpenDownload(false)} labels={labels}/>)}
          {apiError && (<ErrorModal isOpen={apiError !== undefined} close={() => setApiError(undefined)}/>)}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10%",
            border: "2px solid #072c60",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <Typography variant="h4" align="center" color="black">
            Item list
          </Typography>
          <List
            sx={{
              bgcolor: "background.paper",
              width: "100%",
              maxWidth: 360,
              color: "black",
            }}
          >
            {items &&
              items.length > 0 &&
              items.map((item: any) => (
                <>
                  <ListItem
                    key={item.product.productId || "1"}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      {item.product.listMedia && (
                        <Avatar
                          alt="item visualization"
                          src={
                            item.product.listMedia[0].basePath +
                            item.product.listMedia[0].filename
                          }
                        />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.productName}
                      secondary={item.product.productShortDescription}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" color="black" />
                </>
              ))}
          </List>
          <FormControlLabel
            style={{ color: "black", alignSelf: 'flex-end !important'  }}
            control={
              <Checkbox
                checked={itemListCorrect}
                onChange={() => {
                  setItemListCorrect(!itemListCorrect);
                }}
              />
            }
            label="I consent that all items are available and will be shipped."
          />
        </div>
      </div>
    </div>
  );
}
