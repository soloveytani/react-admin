import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LeftDrawer from './LeftDrawer';

const styles = theme => ({
    app: {
        textAlign: 'center'
    },
    appHeader: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: '#273EAE',
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        color: 'white'
    },
    container: {
        display: 'block',
        color: '#282c34',
        position: 'absolute',
        top: '80px',
        left: '260px',
        width: 'calc(100% - 260px)',
        minHeight: 'calc(100% - 80px)',
        background: 'linear-gradient(#B7BECE ,#f0f3f9)'
    }
});

function Layout({ children, classes }) {
    return (
        <div className={ classes.app }>
            <header className={ classes.appHeader }>
                <p>Управление запросами пользователей</p>
            </header>
            <LeftDrawer />
            <div className={ classes.container }>
                { children }
            </div>
        </div>
    );
}

export default withStyles(styles)(Layout);
