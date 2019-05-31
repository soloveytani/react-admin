import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Paper  } from '@material-ui/core';
import { connect } from 'react-redux';
import { login }  from '../actions';
import backImage from '../images/ilustracion-clinicas-1.png';

const styles = theme => ({
    form: {
        width: '100%',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    image: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        height: '700px',
        transform: 'translate(calc(50% + 330px), calc(-50% - 160px))'
    },
    loginForm: {
        padding: '26px',
        width: '420px',
        maxWidth: 'calc(100% - 20px)',
        boxShadow: '0 4px 16px rgba(0,0,0,.3)',
        boxSizing: 'border-box',
        borderRadius: '8px'
    },
    title: {
        fontWeight: '500',
        color: '#314175'
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
            body: JSON.stringify({"auth":{"login": this.state.login ,"password": this.state.password}})
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
                <img src={ backImage } alt="" className={ classes.image } />
                <Paper className={classes.loginForm}>
                    <form>
                        <Typography variant="h5" gutterBottom className={ classes.title }>Пожалуйста, войдите в систему</Typography>
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
                        type="password"
                        className={ classes.input }
                        id="outlined-password"
                        label="Пароль"
                        value={this.state.name}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        variant="outlined"
                        />
                        <Button onClick={ this.submitButton } variant="contained" color="secondary" className={ classes.submitButton }>
                            Войти
                        </Button>
                    </form>
                </Paper>
            </div>

        );
    };
};

export default withStyles(styles)(connect(mapStateToProps, { login })(LoginForm));