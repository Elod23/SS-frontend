import React from "react";
import { useHomeEffects } from "../pages/Home.effects";
import {
  Typography,
  Modal,
  Box,
  Button
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  labels: string[];
}

export const LabelModal = (props: ModalProps) => {
  const { isOpen, close, labels } = props;

  const onDownload = (labelUrl: string) => {
    if (labelUrl) {
      const link = document.createElement("a");
      link.download = labelUrl.split("/").pop()!;
      link.href = labelUrl;
      link.target = "_blank";
      link.rel= "_noreferrer";
      link.click();
    }
  };
  console.log(isOpen);
  return (
    <Modal open={isOpen} onClose={close}>
      <Box sx={style}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h4" align="center">
          Download your label
        </Typography>
        <CloseIcon onClick={close} style={{cursor:"pointer"}}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
          {labels.map((url: string) => {
            const ext = url.split(".").pop()?.toUpperCase();
            return (
              <Button
                type="submit"
                onClick={() => onDownload(url)}
                variant="contained"
                color="info"
                style={{
                  display: "flex",
                  marginTop: "5%",
                  backgroundColor: "rgb(5, 29, 75)",
                }}
              >
                Download as {ext}
              </Button>
            );
          })}
        </div>
      </Box>
    </Modal>
  );
};
