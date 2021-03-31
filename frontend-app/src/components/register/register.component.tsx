import React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import './register.style.scss'


class RegisterComponent extends React.Component{
    render(){
        return(
            <div className="base-container">
                <div className="header">
                    <LockOutlinedIcon />
                    <Typography component="h1" variant="h4">Sign up</Typography>
                </div>
                <div className="form">
                    <div className="name">
                        <TextField id="firstName" label="First Name"  variant="outlined" required/>
                        <TextField id="lastName" label="Last Name"  variant="outlined" required/>
                    </div>
                    <TextField id="username" label="Username"  variant="outlined" required/>
                    <TextField id="email" label="Email Address"  variant="outlined" required/>
                    <TextField id="password" label="Password" type="password" variant="outlined" required/>
                </div>
                <div className="footer">
                    <Button type="submit" variant="contained" color="primary" >Sign Up</Button>
                    <Link href="/login" variant="body2">Already have an account? Sign in</Link>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;