import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AccountIcon from '../../images/accountIcon.png';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import './login-page.scss';

const LoginPage = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function loginHandler(event){
        event.preventDefault();
        
        try{
            const loginData = {
                email: email,
                password: password
            };

            await axios.post('http://localhost:5000/user/login',loginData);
            setErrorMessage('');
            props.history.push('/dashboard');
        }catch(err){
            setErrorMessage(err.response.data.errorMessage);
        }
    }

    return(
        <div className="login-page">
            <div className="left-image"></div>
            <div className="right-side-login">
                <div className="login-container">
                    <Image src={AccountIcon} className="icon" rounded />
                    <h1 className="loginLabel">Login</h1>
                    <form className="form" onSubmit={loginHandler}>
                        <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)}  required/>
                        <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)}  required/>
                        <span className="errorMessage">{errorMessage}</span>
                        <div className="login">
                            <button className="login-button">Login</button>
                            <a href="/register" className="linkToRegister">Don't have an account yet? Sign up!</a>
                        </div>                 
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;