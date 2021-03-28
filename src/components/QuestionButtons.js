import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function QuestionButtons(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">선택해주세요</DialogTitle>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ADD" />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="MODIFY" />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="DELETE" />
        </ListItem>
      </List>
    </Dialog>
  );
}

QuestionButtons.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Avatar
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      >
        <AddIcon />
      </Avatar>
      <QuestionButtons
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
