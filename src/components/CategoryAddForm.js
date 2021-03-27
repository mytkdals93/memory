import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from "@material-ui/core";


function CategoryAddForm({ open, handleClose, submitHandler,category,setCategory }) {
  return (
    <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">카테고리</DialogTitle>
        <DialogContent>
          <DialogContentText>
            카테고리 이름을 입력해주세요.
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="title"
            label="Category Title"
            type="text"
            fullWidth
            value={category}
            onChange={(e) => {
            setCategory(e.target.value);
          }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={submitHandler} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryAddForm;
