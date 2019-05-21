import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, Divider, Typography } from '@material-ui/core';

const styles = theme => ({
    drawer: {
        width: '260px',
        marginTop: '80px'
    },
    menuItem: {
        textDecoration: 'none'
    }
});

const linksStructure = [
    {
        title: 'Доска',
        link: '/'
    },
    {
        title: 'Пользователи',
        link: '/users'
    },
    {
        title: 'Заявки',
        link: '/requests'
    },
    {
        title: 'Выйти',
        link: '/login'
    }
];

class LeftDrawer extends Component {

    state = {
        isOpen: false,
    };
    
    render() {
        const { classes } = this.props;
        const { isOpen } = this.state;
        return (
            <div className={ classes.container }>
                <Drawer variant="permanent" open={ isOpen } classes={{paper: classes.drawer }}>
                    <div>
                        <List>
                            { linksStructure.map((link) => 
                            <div key={ link.link }>
                                <Link to={ link.link } className={ classes.menuItem }>
                                    <ListItem button>
                                        <Typography variant="h6" gutterBottom>
                                            { link.title }
                                        </Typography>
                                    </ListItem>
                                </Link>
                                { link.link === '/requests' && <Divider /> }
                            </div>
                            )}
                        </List>
                    </div>
                </Drawer>
                {/* <Link to="/users">Users</Link>
                <Link to="/requests">Requests</Link>
                <Link to="/login">Log out</Link> */}
            </div>
        );
    }
}

export default withStyles(styles)(LeftDrawer);