import React from 'react';
import TextField from '@material-ui/core/TextField';
import './login.style.css'

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit(event){
        console.log(this.state)
        event.preventDefault();
    }

    handleChange(event){
        const {name, value} = event.target;

        switch(name){
            case "email":
                this.setState({email: value});
                break;
            case "password":
                this.setState({password: value});
                break;
            default:break;
        }
    }
    render(){
        return(
            <div className="login-wrapper">
                <div className="login-container">
                    <h1>Login</h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={this.handleChange} required/>
                        <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={this.handleChange} required/>
                        <div className="login">
                            <button className="login-button">Login</button>
                            <a href="/register" className="linkToRegister">Don't have an account yet? Sign up!</a>
                        </div>                 
                    </form>
                </div>
            </div>
        )
    }

}

export default LoginComponent;