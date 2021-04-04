import React from 'react';
import TextField from '@material-ui/core/TextField';
import './register.style.css'


class RegisterComponent extends React.Component{
    render(){
        return(
            <div className="register-wrapper">
                <div className="register-container">
                    <h1>Create account</h1>
                    <form className="form">
                        <TextField id="firstName" label="First Name" type="text" variant="outlined" required/>
                        <TextField className="lname" id="lastName" label="Last Name" type="text" variant="outlined" required/> 
                        <TextField id="email" label="Email" type="text" variant="outlined" required/>
                        <TextField id="password" label="Password" type="password" variant="outlined" required/>
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