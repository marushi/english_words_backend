import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  deleteEnglishWords: () => void;
  editEnglishWordsFlag: boolean;
}

export const EnglishWordsDelete: React.FC<Props> = ({ deleteEnglishWords, editEnglishWordsFlag }) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    deleteEnglishWords()
    setOpen(false)
  }

  return (
    <IconButton disabled={!editEnglishWordsFlag}>
      <DeleteIcon onClick={() => setOpen(true)} sx={{ color: "red" }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"選択した英語を削除します"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            この操作は取り消しができません。削除しますか?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleDelete} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </IconButton>
  )
}