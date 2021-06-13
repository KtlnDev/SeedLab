import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import LoginIcon from '../../images/loginIcon.png';
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
            props.history.push('/main-page');
        }catch(err){
            setErrorMessage(err.response.data.errorMessage);
        }
    }

    return(
        <div className="login-page">
            <div className="left-image"></div>
            <div className="right-side-login">
                <div className="login-container">
                    <Image src={LoginIcon} className="icon" rounded />
                    <h1 className="loginLabel">Logare</h1>
                    <form className="form" onSubmit={loginHandler}>
                        <TextField id="email" name="email" label="Adresa de email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)}  required/>
                        <TextField id="password" name="password" label="Parolă" type="password" variant="outlined" onChange={e => setPassword(e.target.value)}  required/>
                        <span className="errorMessage">{errorMessage}</span>
                        <div className="login">
                            <button className="login-button">Logare</button>
                            <a href="/register" className="linkToRegister">Nu ai încă un cont? Hai să creăm unul!</a>
                        </div>                 
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;