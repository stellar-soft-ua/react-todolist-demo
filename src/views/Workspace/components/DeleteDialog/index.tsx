import React, { FC, memo } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type DeleteDialogPropsType = {
  open: boolean;
  handleClose: () => void;
  handleAccept: () => void;
  count: number;
};

const DeleteDialog: FC<DeleteDialogPropsType> = memo((props) => {
  const { open, handleClose, handleAccept, count } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to delete these (${count}) items?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAccept} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export { DeleteDialog };
