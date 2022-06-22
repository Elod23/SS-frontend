import React from "react";
import {  Credentials } from "../pages/Home.effects";
import {
    TextField,
    Typography,
    FormGroup,
    Modal,
    Box,
    Button,
  } from "@mui/material";

interface LoginModalProps {
    isOpen: boolean;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    storeId: string;
    login: (creds: Credentials) => void;
    loginError: boolean;
    loginErrorMessage: string;
};

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

export const LoginModal = (props: LoginModalProps) => {
    const {isOpen, email, setEmail, password, setPassword, storeId, login, loginError, loginErrorMessage} = props;
    return(
        <Modal open={isOpen}>
        <Box sx={style}>
          <Typography variant="h4" align="center">
            Log in to Salvagescout
          </Typography>
          <TextField
            id="email"
            label="Email Address"
            placeholder="john.doe@example.com"
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
            label="Password"
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
    )
}