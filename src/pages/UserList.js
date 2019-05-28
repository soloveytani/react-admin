import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import UserEditDialog from '../components/UserEditDialog';
import { USERS, USER_SCTRUCTURE } from '../fixtures/users';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: '#282c34',
        width: '1200px',
        maxWidth: '100%',
        margin: '20px auto 0'
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '16px 26px',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,.1)',
        margin: '10px 20px',
        display: 'flex',
        alignItems: 'center'
    },
    firstColumn: {
        textAlign: 'left',
        width: '240px',
        '& p': {
            margin: '6px 0'
        }
    },
    secondColumn: {
        textAlign: 'left'
    },
    rightColumn: {
        marginLeft: 'auto',
        display: 'flex'
    },
    room: {
        display: 'flex',
        alignItems: 'flex-end',
        margin: '10px 0',
        '& img': {
            height: '24px',
            width: '24px',
            marginRight: '8px',
            marginBottom: '4px',
            opacity: '0.7'
        }
    },
    phone: {
        marginTop: '20px'
    },
    fab: {
        position: 'fixed',
        bottom: '60px',
        right: '60px'
    }
});
class UserList extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.container }>
                {
                    USERS.map((user, index) =>
                    <div key={ index } className={ classes.card }>
                        <div className={ classes.firstColumn }>
                            <Typography variant="h6">{ user.name } { user.surname }</Typography>
                            <Typography variant="body1" color="primary">{ user.email }</Typography>
                            <Typography variant="body1">{ user.phone }</Typography>
                        </div>
                        <div className={ classes.secondColumn }>
                            <div className={ classes.room }>
                                <img src="https://img.icons8.com/ios/50/000000/door-opened.png" alt=""/>
                                <Typography variant="h5">{ user.room }</Typography>
                            </div>
                            <div className={ classes.room }>
                                <img src="https://img.icons8.com/ios/50/000000/contacts.png" alt=""/>
                                <Typography variant="body2" color="primary">{ user.position }</Typography>
                            </div>
                        </div>
                        <div className={ classes.rightColumn }>
                            <UserEditDialog title="Редактирование пользователя" type="edit" user={ user }>
                                <IconButton className={classes.button} aria-label="Delete" color="primary">
                                    <EditIcon />
                                </IconButton>
                            </UserEditDialog>
                            <IconButton className={classes.button} aria-label="Delete" color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    )
                }
                <UserEditDialog title="Создание пользователя" type="create" user={ USER_SCTRUCTURE }>
                    <Fab color="secondary" aria-label="Add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </UserEditDialog>
            </div>
        );
    };
};

export default withStyles(styles)(UserList);