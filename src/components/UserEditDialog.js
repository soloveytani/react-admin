import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import DialogTextField from './DialogTextField';
import { USER_FIELDS, USER_SCTRUCTURE } from '../fixtures/users';

const styles = {
    container: {
        width: '450px',
        maxWidth: '100%'
    },
    dialogActions: {
        margin: '0 24px 24px'
    }
};

class UserEditDialog extends Component {
    state = {
        open: false,
        user: USER_SCTRUCTURE
    };

    handleClickOpen = () => {
        this.setState({ open: true });
        if (this.props.type === 'edit') this.setState({ user: this.props.user });
        else this.setState({user: USER_SCTRUCTURE});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.props.type, this.state.user);
        this.setState({ open: false });
    };

    handleChange = (fieldName) => event => {
        this.setState({ user: { ...this.state.user, [fieldName]: event.target.value }});
    };

    handleChangeCheckbox = (fieldName) => event => {
        this.setState({ user: { ...this.state.user, [fieldName]: event.target.checked }});
    };

    render() {
        const { title, type, children, classes } = this.props;
        const { open, user } = this.state;
        return (
        <div>
            { React.cloneElement(children, {onClick: this.handleClickOpen })}
            <Dialog
                open={ open }
                onClose={ this.handleClose }
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
            <DialogContent className={ classes.container }>
                {
                    USER_FIELDS.map((field, index) =>
                        <DialogTextField 
                            key={ field.name + index }
                            name={ field.name }
                            value={ user[field.name] }
                            label={ field.label }
                            type={ field.type }
                            options={ field.options }
                            handleChange={ this.handleChange }
                            handleChangeCheckbox={ this.handleChangeCheckbox }
                        />
                    )
                }
                
            </DialogContent>
            <DialogActions className={ classes.dialogActions }>
                <Button onClick={this.handleSubmit} color="primary" variant="contained">
                    {type === 'edit' ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={this.handleClose} color="primary" variant="contained">
                    Отмена
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    };
};

export default withStyles(styles)(UserEditDialog);
