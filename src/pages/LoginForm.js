import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { TextField, Button, Typography  } from '@material-ui/core';
import '../App.scss';

const styles = theme => ({
    form: {
        width: '400px',
        margin: '40px auto 0',
        maxWidth: '100%',
        textAlign: 'center',
    },
    input: {
        width: '100%'
    },
    submitButton: {
        marginTop: 20
    }
  });
  
class LoginForm extends Component {

    state = {
        login: '',
        password: '',
    };

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    submitButton = () => {
        this.props.history.push(`/`);
        // this.props.authentification();
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.form }>
                <Typography variant="h5" gutterBottom color="textSecondary">Пожалуйста, войдите в систему</Typography>
                <TextField
                className={ classes.input }
                id="outlined-name"
                label="Логин"
                value={this.state.login}
                onChange={this.handleChange('login')}
                margin="normal"
                variant="outlined"
                />
                <TextField
                className={ classes.input }
                id="outlined-name"
                label="Пароль"
                value={this.state.name}
                onChange={this.handleChange('password')}
                margin="normal"
                variant="outlined"
                />
                <Button onClick={ this.submitButton } variant="contained" color="primary" className={ classes.submitButton }>
                    Войти
                </Button>
            </div>

        );
    };
};

export default withStyles(styles)(LoginForm);