import React from "react";
import { Typography, Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  error: any;
}

export const ErrorModal = (props: ModalProps) => {
  const { isOpen, close, error } = props;

  return (
    <Modal open={isOpen} onClose={close}>
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center">
            Something went wrong
          </Typography>
          <CloseIcon onClick={close} style={{ cursor: "pointer" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ErrorIcon
            style={{
              color: "red",
              width: "50px",
              height: "50px",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          />
          <p style={{ justifyContent: "center" }}>
            <Typography variant="h6" align="center" marginBottom={"5%"} color="red">
              {Array.isArray(error)
                ? error.map((e) => e.message).join("\n")
                : error.message}
            </Typography>
            A call to an external provider has failed. Please don't repeat your
            action and wait a few minutes before trying again. In case of
            failure contact someone from team SalvageScout{" "}
            <a
              href="mailto:info@salvagescout.com"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              here
            </a>
            .
          </p>
        </div>
      </Box>
    </Modal>
  );
};
