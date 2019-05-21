import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Paper  } from '@material-ui/core';
import { connect } from 'react-redux';
import { login }  from '../actions';
import '../App.scss';

const styles = theme => ({
    form: {
        width: '420px',
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
    },
    loginForm: {
        padding: '26px',
    },
    input: {
        width: '100%'
    },
    submitButton: {
        marginTop: 20
    }
});

const mapStateToProps = ({ auth: {token}}) => {
    return { token }
};

class LoginForm extends Component {

    state = {
        login: '',
        password: ''
    };

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    submitButton = () => {
        fetch(`https://tatiana-backend.herokuapp.com/sessions`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({"auth":{"login":"superadmin","password":"password"}})
        }).then(result => result.json())
          .then((result) => {
            // set login from form if you need
            this.props.login('superadmin');
            // save response.jwt where you need
            this.props.history.push('/users');
          })
          .catch(err => console.error(err));
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.form }>
                <Paper className={classes.loginForm}>
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
                </Paper>
            </div>

        );
    };
};

export default withStyles(styles)(connect(mapStateToProps, { login })(LoginForm));