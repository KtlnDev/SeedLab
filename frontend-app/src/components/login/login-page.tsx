import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AccountIcon from '../../images/accountIcon.png';
import './login-page.scss'

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     
    const handleSubmit = e => {
        e.preventDefault();
        const credentials ={
            email,password
        }
        console.log(credentials);
        window.location.href = "/dashboard";
      }

    return(
        <div className="login-page">
            <div className="left-image"></div>
            <div className="right-side-login">
                <div className="login-container">
                    <img src={AccountIcon} alt="Logo" className="icon"></img>
                    <h1 className="loginLabel">Login</h1>
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
        </div>
    )
}