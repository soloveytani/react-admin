import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Typography } from '@material-ui/core';

import { ISSUE_STATUS_OPTIONS, PRIORITY_OPTIONS, ISSUE_TOPICS_NAME } from '../fixtures/tasks';

const styles = {
    container: {
        width: '450px',
        maxWidth: '100%'
    },
    dialogActions: {
        margin: '0 24px 24px'
    },
    textField: {
        width: '100%',
        margin: '18px 0 4px'
    },
    item: {
        margin: '4px 0 18px',
        display: 'flex',
        '& span': {
            display: 'block',
            minWidth: '100px',
            fontWeight: '500',
            textAlign: 'right',
            paddingRight: '10px',
            color: '#5e6169'
        }
    }
};

class IssueEditDialog extends Component {
    state = {
        open: false,
        issue: {}
    };

    handleClickOpen = () => {
        this.setState({ open: true });
        this.setState({ issue: this.props.issue });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.issue);
        this.setState({ open: false });
    };

    handleChange = (fieldName) => event => {
        this.setState({ issue: { ...this.state.issue, [fieldName]: event.target.value }});
    };

    render() {
        const { children, classes } = this.props;
        const { open, issue } = this.state;
        return (
        <div>
            { React.cloneElement(children, {onClick: this.handleClickOpen })}
            <Dialog
                open={ open }
                onClose={ this.handleClose }
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Редактирование заявки</DialogTitle>
            <DialogContent className={ classes.container }>
                <Typography variant="body1" className={ classes.item } color="primary"><span>Тема:</span> { ISSUE_TOPICS_NAME[issue.related_to] }</Typography>
                <Typography variant="body1" className={ classes.item } color="primary"><span>Описание:</span> { issue.commentary }</Typography>
                <Typography variant="body1" className={ classes.item } color="primary"><span>Создана:</span> { issue.created_at }</Typography>
                <Typography variant="body1" className={ classes.item } color="primary"><span>Обновлена:</span> { issue.updated_at }</Typography>
                <TextField
                    select
                    id="status"
                    label="Статус заявки"
                    className={ classes.textField }
                    margin="dense"
                    variant="outlined"
                    value={ issue.status || '' }
                    onChange={ this.handleChange('status') } >
                    { ISSUE_STATUS_OPTIONS.map( option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    )) }
                </TextField>
                <TextField
                    select
                    id="priority"
                    label="Приоритет заявки"
                    className={ classes.textField }
                    margin="dense"
                    variant="outlined"
                    value={ issue.priority || '' }
                    onChange={ this.handleChange('priority') } >
                    { PRIORITY_OPTIONS.map( option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    )) }
                </TextField>
            </DialogContent>
            <DialogActions className={ classes.dialogActions }>
                <Button onClick={this.handleSubmit} color="primary" variant="contained">
                    Сохранить
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

export default withStyles(styles)(IssueEditDialog);
