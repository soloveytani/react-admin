import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ListItem, Typography} from '@material-ui/core';
import logo from '../images/logo_pills.svg';

const styles = theme => ({
    app: {
        position: 'absolute',
        top: '0',
        left: '0',
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(#B7BECE ,#f0f3f9)'
    },
    appHeader: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        maxWidth: '100vw',
        backgroundColor: '#273EAE',
        height: '80px'
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1100px',
        margin: '0 auto',
        height: '100%',
        maxWidth: 'calc(100vw - 20px)'
    },
    menu:  {
        display: 'flex',
        marginLeft: 'auto',
        alignItems: 'center'
    },
    logo: {
        height: '60px'
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 20px 6px 30px',
        position: 'relative',
        '&:hover': {
            '& $menuText': {
                color: '#f7a033'
            },
            '& $active': {
                background: '#f7a033'
            }
        }
    },
    active: {
        width: '8px',
        height: '8px',
        position: 'absolute',
        left: '16px',
        top: '18px',
        marginRight: '10px',
        borderRadius: '50%',
        background: '#ffffff'
    },
    menuText: {
        color: '#ffffff',
        marginBottom: '0px'
    },
    container: {
        display: 'flex',
        width: '1200px',
        justifyContent: 'center',
        margin: '80px auto 0',
        color: '#282c34',
        top: '80px',
        maxWidth: '100vw',
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

function Layout({ children, classes, location }) {
    return (
        <div className={ classes.app }>
            <header className={ classes.appHeader }>
                <div className={ classes.headerContent}>
                    <img src={ logo } className={ classes.logo } alt="" />
                    <div className={ classes.menu }>
                        {
                            linksStructure.map((link, index) =>
                                <Link to={ link.link } key={index} style={ {textDecoration: 'none'} }>
                                    <ListItem className={ classes.menuItem }>
                                        { location.pathname === link.link && <div className={ classes.active } /> }
                                        <Typography variant="h6" gutterBottom className={classes.menuText}>
                                            { link.title }
                                        </Typography>
                                    </ListItem>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </header>
            {/* <LeftDrawer /> */}
            <div className={ classes.container }>
                { children }
            </div>
        </div>
    );
}

export default withRouter(withStyles(styles)(Layout));
