import React from 'react';
import TextField from '@material-ui/core/TextField';
import NavigationBar from '../navigation-bar/navigation.component'
import './register.style.css'

class RegisterComponent extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
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
            case "firstName":
                this.setState({firstName: value});
                break;
            case "lastName":
                this.setState({lastName: value});
                break;
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
            <div className="register-page">
                <NavigationBar/>
                <div className="register-container">
                    <h1>Create account</h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField id="firstName" name="firstName" label="First Name" type="text" variant="outlined" onChange={this.handleChange} required/>
                        <TextField className="lname" id="lastName" name="lastName" label="Last Name" type="text" variant="outlined" onChange={this.handleChange} required/> 
                        <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={this.handleChange} required/>
                        <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={this.handleChange} required/>
                        <div className="createAccount">
                            <button className="register-button">Create account</button>
                            <a href="/login" className="linkToLogin">Already Have an Account?</a>
                        </div>                 
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;