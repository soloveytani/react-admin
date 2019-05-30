import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import DragAndDropBoard from '../components/DragAndDropBoard';

const styles = theme => ({
    container: {
        margin: '30px',
        display: 'block',
        color: '#282c34',
        width: '100%'
    }
});

class Home extends Component {
    render() {

        const { classes } = this.props;

        return (
            <div className={ classes.container }>
                <DragAndDropBoard />
            </div>
        );
    };
};

export default withStyles(styles)(Home);