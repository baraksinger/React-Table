import {TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    textField: {
        margin: "22px 0"
    }
}))

const Input = ({changed, value}) => {

    const classes = useStyles();

    return (
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={value}
            className={classes.textField}
            onChange={changed}
        />
    );
}

export default Input;