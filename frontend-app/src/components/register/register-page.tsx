import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import RegisterIcon from '../../images/registerIcon.png';
import Image from 'react-bootstrap/Image';
import './register-page.scss';


const RegisterPage = (props) =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function registerHandler(event){
        event.preventDefault();

        try{
            const registerData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            };
            await axios.post('http://localhost:5000/user/register',registerData);
            setErrorMessage('');
            props.history.push('/login');
            
        }catch(err){
            setErrorMessage(err.response.data.errorMessage);
        }
    }

    return(
        <div className="register-page">
            <div className="left-image"></div>
            <div className="right-side-register">
                <div className="register-container">
                    <Image src={RegisterIcon} className="icon" rounded />
                    <h1>Creare cont</h1>
                    <form className="form" onSubmit={registerHandler}>
                        <TextField id="lastName" name="lastName" label="Nume" type="text" variant="outlined" onChange={e => setLastName(e.target.value)} required/> 
                        <TextField id="firstName" name="firstName" label="Prenume" type="text" variant="outlined" onChange={e => setFirstName(e.target.value)} required/>
                        <TextField id="email" name="email" label="Adresă de email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)} required/>
                        <TextField id="password" name="password" label="Parolă" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} required/>
                        <TextField id="confirmPassword" name="confirmPassword" label="Confirmă parola" type="password" variant="outlined" onChange={e => setConfirmPassword(e.target.value)} required/>
                        <span className="errorMessage">{errorMessage}</span>
                        <div className="createAccount">
                            <button className="register-button">Înregistrare</button>
                            <a href="/login" className="linkToLogin">Ai deja un cont? Logheză-te!</a>
                        </div>                 
                    </form>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;