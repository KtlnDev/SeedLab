import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import NavigationBar from '../navigation-bar/navigation.component'
import './login.style.css'

export default function LoginComponent(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     
    const handleSubmit = e => {
        e.preventDefault();
        const credentials ={
            email,password
        }
        console.log(credentials);
        window.location.href = "/";
      }

    return(
        <div className="login-page">
            <NavigationBar/>
            <div className="login-container">
                <h1>Login</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)} required/>
                    <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} required/>
                    <div className="login">
                        <button className="login-button">Login</button>
                        <a href="/register" className="linkToRegister">Don't have an account yet? Sign up!</a>
                    </div>                 
                </form>
            </div>
        </div>
    )
}