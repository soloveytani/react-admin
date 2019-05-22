import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { TASKS } from '../fixtures/tasks';

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
        border: '1px solid #eaeaea',
        borderRadius: '3px',
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
    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.container }>
                {
                    TASKS.map((task, index) =>
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