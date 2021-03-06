import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Fab, TextField, MenuItem, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { auth }  from '../actions';

import UserEditDialog from '../components/UserEditDialog';
import { USER_SCTRUCTURE, POSITIONS } from '../fixtures/users';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: '#282c34',
        width: '1200px',
        maxWidth: '100%',
        margin: '20px auto 0'
    },
    filtration: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '20px',
        position: 'sticky',
        top: '80px',
        background: 'linear-gradient(#bbc2d1, #bfc5d4)',
        zIndex: '1'
    },
    position: {
        width: '150px',
        margin: '16px 20px 8px',
        textAlign: 'left'
    },
    filterButton: {
        margin: '16px 6px 8px',
        height: '46px',
        padding: '10px 14px',
        minWidth: 0
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '16px 26px',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,.1)',
        margin: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#ecf0f6',
        }
    },
    firstColumn: {
        textAlign: 'left',
        width: '240px',
        '& p': {
            margin: '6px 0'
        }
    },
    userName: {
        color: '#162159'
    },
    secondColumn: {
        textAlign: 'left'
    },
    rightColumn: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center'
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
        color: '#38c2cf',
        marginRight: '30px'
    },
    fab: {
        position: 'fixed',
        bottom: '60px',
        right: '60px'
    },
    orangeButton: {
        color: '#F7A033'
    }
});

const mapStateToProps = ({ auth: {token}}) => {
    return { token }
};
class UserList extends Component {

    state = {
        roomFilter: '',
        position: '-',
        userList: [],
        filteredUserList: [],
        positionOptions: POSITIONS
    };

    getUserList = () => {
        fetch(`https://tatiana-backend.herokuapp.com/users`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(result => result.json())
          .then((result) => {
            this.setState({userList: result, filteredUserList: result})
        }).catch(err => console.error(err));
    };

    createUpdateUser = (type, userInfo) => {
        let url = `https://tatiana-backend.herokuapp.com/users` + (type === 'edit' ? `/${userInfo.id}` : '');
        fetch(url,{
            method: type === 'edit' ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                user: userInfo
            })
        }).then(result => result.json())
        .then( () => {
            this.getUserList();
        }).catch(err => console.error(err));
    };

    deleteUser = (userId) => (event) => {
        event.stopPropagation();
        let url = `https://tatiana-backend.herokuapp.com/users/` + userId;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then()
        .then( () => {
            this.getUserList();
        }).catch(err => console.error(err));
    };

    handleSubmit = (type, userInfo ) => {
        this.createUpdateUser(type, userInfo);
    };

    componentDidMount = () => {
        this.getUserList();
        this.setState({positionOptions: ['-', ...this.state.positionOptions]});
    };

    handleChange = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value });
    };

    filterUsers = () => {
        let filteredUserList = this.state.userList.filter((user) => {
            let result = true;
            if ( this.state.roomFilter !== '' && this.state.roomFilter !== user.room) result = false;
            if ( this.state.position !== '-' && this.state.position !== user.position) result = false;
            return result;
        });
        this.setState({ filteredUserList: filteredUserList });
    };

    clearFilters = () => {
        this.setState({
            roomFilter: '',
            position: '-',
            filteredUserList: this.state.userList
        })
    };

    render() {
        const { classes } = this.props;
        const { roomFilter, position, filteredUserList, positionOptions } = this.state;
        return (
            <div className={ classes.container }>
                <div className={ classes.filtration }>
                    <TextField
                        id="outlined-number"
                        label="Отделение"
                        value={ roomFilter }
                        onChange={ this.handleChange('roomFilter') }
                        type="number"
                        className={classes.roomFilter}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-number"
                        select
                        label="Специалист"
                        value={ position }
                        onChange={ this.handleChange('position') }
                        className={classes.position}
                        margin="normal"
                        variant="outlined"
                    >
                        {positionOptions.map(position => (
                            <MenuItem key={position} value={position}>
                                {position}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined" color="primary" className={classes.filterButton} size="large" onClick={ this.filterUsers }> 
                        <FilterIcon />
                        Фильтровать
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.filterButton} size="large" onClick={ this.clearFilters }> 
                        <ClearIcon />
                    </Button>
                </div>
                <div className={ classes.list }>
                    {
                        filteredUserList.map((user, index) => (
                            !user.superadmin && 
                            <UserEditDialog title="Редактирование пользователя" type="edit" user={ user } key={ index } onSubmit={ this.handleSubmit }>
                                <div key={ index } className={ classes.card }>
                                    <div className={ classes.firstColumn }>
                                        <Typography variant="h6" className={ classes.userName }>{ user.name } { user.surname }</Typography>
                                        <Typography variant="body1" color="primary">{ user.email }</Typography>
                                    </div>
                                    <div className={ classes.secondColumn }>
                                        <div className={ classes.room }>
                                            <img src="https://img.icons8.com/ios/50/000000/door-opened.png" alt=""/>
                                            <Typography variant="h5" style={ {color: '#c055a6'} }>{ user.room }</Typography>
                                        </div>
                                        <div className={ classes.room }>
                                            <img src="https://img.icons8.com/ios/50/000000/contacts.png" alt=""/>
                                            <Typography variant="body2" color="primary">{ user.position }</Typography>
                                        </div>
                                    </div>
                                    <div className={ classes.rightColumn }>
                                        <Typography variant="body1" className={ classes.phone }>{ user.phone }</Typography>
                                        <IconButton className={classes.button} aria-label="Delete" color="primary" onClick={ this.deleteUser(user.id) }>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </UserEditDialog>
                        ))
                    }
                </div>
                <UserEditDialog title="Создание пользователя" type="create" user={ USER_SCTRUCTURE } onSubmit={ this.handleSubmit }>
                    <Fab color="secondary" aria-label="Add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </UserEditDialog>
            </div>
        );
    };
};

export default withStyles(styles)(connect(mapStateToProps, { auth })(UserList));
