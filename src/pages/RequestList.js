import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, TextField, MenuItem, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';

import { TASKS, RELATED_TO } from '../fixtures/tasks';
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
    phone: {
        marginTop: '20px'
    },
    fab: {
        position: 'fixed',
        bottom: '60px',
        right: '60px'
    }
});
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
                            <Typography variant="h6">{ task.user_name } { task.user_surname }</Typography>
                            <Typography variant="body1" color="primary">{ task.related_to }</Typography>
                            <Typography variant="body1">{ task.date }</Typography>
                        </div>
                        <div className={ classes.secondColumn }>
                            <Typography variant="h5">{ task.text }</Typography>
                            <Typography variant="body2" color="primary">{ task.priority }</Typography>
                        </div>
                        <div className={ classes.rightColumn }>
                            <IconButton className={classes.button} aria-label="Delete" color="primary">
                                <EditIcon />
                            </IconButton>
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

export default withStyles(styles)(RequestList);