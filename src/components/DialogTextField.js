import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import { TextField, MenuItem, Checkbox, FormControlLabel, Divider } from '@material-ui/core';
import { PhoneMask } from './MaskComponents'; 

const styles = theme => ({
    textField: {
        width: '100%',
        margin: '14px 0 4px'
    },
    checkbox: {
        marginTop: '4px'
    }
});

const DialogTextField = ({handleChange, handleChangeCheckbox, classes, name, label, value, type, options }) => {
    if (type === 'checkbox') return (
    <>
        <FormControlLabel className={ classes.checkbox }
            control={<Checkbox onChange={ handleChangeCheckbox(name) } value={ name } checked={ value || false }/>} label={ label } />
        <Divider style={ {marginBottom: '20px'} } />
    </>
    );
    return (
        <TextField
            select={ type === 'select'}
            multiline={ type === 'textArea'}
            rowsMax="3"
            id={ name }
            label={ label }
            className={ classes.textField }
            margin="dense"
            variant="outlined"
            value={ value || '' }
            onChange={ handleChange(name) }
            InputProps={ type === 'phone' ? { inputComponent: PhoneMask } : {} }
        >
            { type === 'select' && options.map( option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            )) }
        </TextField>
    );
};

export default withStyles(styles)(DialogTextField);