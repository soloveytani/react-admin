import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, IconButton, TextField, MenuItem, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowUpwardIcon from '@material-ui/icons/Report';
import { connect } from 'react-redux';
import { auth }  from '../actions';

import { ISSUE_TOPICS, ISSUE_STATUS_OPTIONS, ISSUE_TOPICS_NAME, ISSUE_STATUS } from '../fixtures/tasks';
import IssueEditDialog from '../components/IssueEditDialog';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    status: {
        borderRadius: '10px',
        color: '#fff',
        fontSize: '13px',
        padding: '2px 13px 4px',
    },
    needToDo: {
        background: '#ffce00'
    },
    inProgress: {
        background: '#7044ff'
    },
    done: {
        background: '#10dc60'
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
    low: {
        marginRight: '10px',
        '& path':{
            color: '#99cc33'
        }
    },
    normal: {
        marginRight: '10px',
        '& path':{
            color: '#ffd31a'
        }
    },
    high: {
        marginRight: '10px',
        '& path':{
            color: '#d33939'
        }
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
class IssuesList extends Component {

    state = {
        statusFilter: '-',
        userFilter: '-',
        relatedToFilter: '-',
        issuesList: [],
        filteredIssuesList: [],
        userOptions: []
    };

    getUserOptions = () => {
        fetch(`https://tatiana-backend.herokuapp.com/users`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(result => result.json())
          .then((result) => {
            let userOptions = result.map((user) => ({value: user.id, label: user.name + ' ' + user.surname}) );
            userOptions.unshift({value: '-', label: '-'})
            this.setState({userOptions: userOptions});
        }).catch(err => console.error(err));
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
            this.setState({issuesList: result}, () => this.filterIssues())
        }).catch(err => console.error(err));
    };

    updateIssue = ( issue ) => {
        console.log(issue);
        let url = `https://tatiana-backend.herokuapp.com/issues/` + issue.id;
        fetch(url,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                issue: issue
            })
        }).then(result => result.json())
        .then( () => {
            this.getIssues();
        }).catch(err => console.error(err));
    };

    deleteIssue = (issueId) => (event) => {
        event.stopPropagation();
        let url = `https://tatiana-backend.herokuapp.com/issues/` + issueId;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then()
        .then( () => {
            this.getIssues();
        }).catch(err => console.error(err));
    };

    componentDidMount = () => {
        this.getUserOptions();
        this.getIssues();
    };

    handleChange = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value });
    };

    filterIssues = () => {
        const { statusFilter, userFilter, relatedToFilter, issuesList } = this.state;
        let filteredIssuesList = issuesList.filter((issue) => {
            let result = true;
            if ( statusFilter !== '-' && statusFilter !== issue.status) result = false;
            if ( userFilter !== '-' && userFilter !== issue.user_id) result = false;
            if ( relatedToFilter !== '-' && relatedToFilter !== issue.related_to) result = false;
            return result;
        });
        this.setState({ filteredIssuesList: filteredIssuesList });
    };

    clearFilters = () => {
        this.setState({
            statusFilter: '-',
            userFilter: '-',
            relatedToFilter: '-',
            filteredIssuesList: this.state.issuesList
        })
    };

    render() {

        const { classes } = this.props;
        const { statusFilter, userFilter, relatedToFilter, userOptions, filteredIssuesList } = this.state;

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
                        { [{value: '-', label: '-'}, ...ISSUE_STATUS_OPTIONS].map(option => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
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
                        { [{value: '-', label: '-'}, ...ISSUE_TOPICS].map(option => (
                            <MenuItem key={option.label} value={option.value}>
                                { option.label }
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined" color="primary" className={classes.filterButton} size="large" onClick={ this.filterIssues }> 
                        <FilterIcon />
                        Фильтровать
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.filterButton} size="large" onClick={ this.clearFilters }> 
                        <ClearIcon />
                    </Button>
                </div>
                {
                    filteredIssuesList.map((issue, index) =>
                        <IssueEditDialog issue={ issue } key={ index } onSubmit={ this.updateIssue }>
                            <div key={ index } className={ classes.card }>
                                <div className={ classes.firstColumn }>
                                    <Typography variant="h6">{ ISSUE_TOPICS_NAME[issue.related_to] }</Typography>
                                    <Typography variant="body1" color="primary">{ issue.commentary }</Typography>
                                </div>
                                <div className={ classes.secondColumn }>
                                    <div className={ classNames( classes.status, classes[issue.status]) }>{ ISSUE_STATUS[issue.status] }</div>
                                </div>
                                <div className={ classes.rightColumn }>
                                    <ArrowUpwardIcon className={ classes[issue.priority] } />
                                    <Typography variant="body1" className={ classes.date }>{ issue.created_at.slice(0,10) }</Typography>
                                    <IconButton className={classes.button} aria-label="Delete" color="primary" onClick={ this.deleteIssue(issue.id) }>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </IssueEditDialog >
                    )
                }
            </div>
        );
    };
};


export default withStyles(styles)(connect(mapStateToProps, { auth })(IssuesList));