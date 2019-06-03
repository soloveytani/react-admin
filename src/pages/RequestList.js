import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, TextField, MenuItem, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { auth }  from '../actions';

import { TASKS, RELATED_TO, ISSUE_TOPICS_NAME } from '../fixtures/tasks';
import { USERS } from '../fixtures/users';

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
    select: {
        width: '200px',
        margin: '16px 20px 8px 0px',
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
        width: '340px',
        '& p': {
            margin: '6px 0'
        }
    },
    secondColumn: {
        textAlign: 'left'
    },
    needToDo: {
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: '#F7A033'
    },
    rightColumn: {
        marginLeft: 'auto',
        alignItems: 'center',
        display: 'flex'
    },
    date: {
        color: '#38c2cf',
        marginRight: '30px'
    },
    fab: {
        position: 'fixed',
        bottom: '60px',
        right: '60px'
    }
});

const mapStateToProps = ({ auth: {token}}) => {
    return { token }
};
class RequestList extends Component {

    state = {
        statusFilter: '-',
        userFilter: '-',
        relatedToFilter: '-',
        requestList: TASKS,
        filteredRequestList: TASKS,
        userOptions: []
    };

    componentDidMount = () => {
        let userOptions = USERS.map((user) => ({value: user.id, label: user.name + ' ' + user.surname}) );
        userOptions.unshift({value: '-', label: '-'})
        this.setState({userOptions: userOptions});
        this.getIssues();
    }; 

    getIssues = () => {
        fetch(`https://tatiana-backend.herokuapp.com/issues`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(result => result.json())
          .then((result) => {
            this.setState({requestList: result, filteredRequestList: result})
        }).catch(err => console.error(err));
    };

    handleChange = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value });
    };

    filterRequests = () => {
        const { statusFilter, userFilter, relatedToFilter, requestList } = this.state;
        let filteredRequestList = requestList.filter((request) => {
            let result = true;
            if ( statusFilter !== '-' && statusFilter !== request.status) result = false;
            if ( userFilter !== '-' && userFilter !== request.user_id) result = false;
            if ( relatedToFilter !== '-' && relatedToFilter !== request.related_to) result = false;
            return result;
        });
        this.setState({ filteredRequestList: filteredRequestList });
    };

    clearFilters = () => {
        this.setState({
            statusFilter: '-',
            userFilter: '-',
            relatedToFilter: '-',
            filteredRequestList: this.state.requestList
        })
    };

    render() {

        const { classes } = this.props;
        const { statusFilter, userFilter, relatedToFilter, userOptions, filteredRequestList } = this.state;

        return (
            <div className={ classes.container }>
                <div className={ classes.filtration }>
                    <TextField
                        id="outlined-number"
                        select
                        label="Статус"
                        value={ statusFilter }
                        onChange={ this.handleChange('statusFilter') }
                        className={classes.select}
                        margin="normal"
                        variant="outlined"
                    >
                        {['-', 'Необходимо сделать', 'В работе', 'Готово' ].map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-number"
                        select
                        label="Пользователь"
                        value={ userFilter }
                        onChange={ this.handleChange('userFilter') }
                        className={classes.select}
                        margin="normal"
                        variant="outlined"
                    >
                        {userOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-number"
                        select
                        label="Тема"
                        value={ relatedToFilter }
                        onChange={ this.handleChange('relatedToFilter') }
                        className={classes.select}
                        margin="normal"
                        variant="outlined"
                    >
                        {RELATED_TO.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined" color="primary" className={classes.filterButton} size="large" onClick={ this.filterRequests }> 
                        <FilterIcon />
                        Фильтровать
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.filterButton} size="large" onClick={ this.clearFilters }> 
                        <ClearIcon />
                    </Button>
                </div>
                {
                    filteredRequestList.map((task, index) =>
                    <div key={ index } className={ classes.card }>
                        <div className={ classes.firstColumn }>
                            <Typography variant="h6">{ ISSUE_TOPICS_NAME[task.related_to] }</Typography>
                            <Typography variant="body1" color="primary">{ task.commentary }</Typography>
                        </div>
                        <div className={ classes.secondColumn }>
                            {/* <Typography variant="h5">{ task.text }</Typography> */}
                            <div className={ classes[task.status] } />
                            {/* <Typography variant="body2" color="primary">{ task.status }</Typography> */}
                        </div>
                        <div className={ classes.rightColumn }>
                            <Typography variant="body1" className={ classes.date }>{ task.created_at }</Typography>
                            <IconButton className={classes.button} aria-label="Delete" color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    )
                }
            </div>
        );
    };
};


export default withStyles(styles)(connect(mapStateToProps, { auth })(RequestList));