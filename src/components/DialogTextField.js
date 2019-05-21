import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import { TextField } from '@material-ui/core';
import { PhoneMask } from './MaskComponents'; 

const styles = theme => ({
    textField: {
        width: '100%',
        margin: '14px 0 4px'
    },
    autoComplete: {
        height: 50,
        margin: '0 3px 14px 3px',
        paddingTop: 16,
    },
});

const DialogTextField = ({handleChange, classes, name, label, value, type }) => {
    return (
        <TextField
        id={ name }
        label={ label }
        className={ classes.textField }
        margin="dense"
        variant="outlined"
        value={ value }
        onChange={ handleChange(name) }
        InputProps={ type === 'phone' ? { inputComponent: PhoneMask } : {} }
        />
    );
};

export default withStyles(styles)(DialogTextField);