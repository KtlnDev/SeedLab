import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AccountIcon from '../../images/accountIcon.png';
import Image from 'react-bootstrap/Image';
import './register-page.scss';


export default function RegisterPage(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        try{
            const registerData ={
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            await axios.post('http://localhost:5000/user/register',registerData);
        }catch(err){
            console.log(err);
        }
       /* window.location.href = "/login";   */
    }

    return(
        <div className="register-page">
            <div className="left-image"></div>
            <div className="right-side-register">
                <div className="register-container">
                    <Image src={AccountIcon} className="icon" rounded />
                    <h1>Create account</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <TextField id="firstName" name="firstName" label="First Name" type="text" variant="outlined" onChange={e => setFirstName(e.target.value)} required/>
                        <TextField className="lname" id="lastName" name="lastName" label="Last Name" type="text" variant="outlined" onChange={e => setLastName(e.target.value)} required/> 
                        <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)} required/>
                        <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} required/>
                        <TextField id="confirmPassword" name="confirmPassword" label="Confirm password" type="password" variant="outlined" onChange={e => setConfirmPassword(e.target.value)} required/>
                        <div className="createAccount">
                            <button className="register-button">Create account</button>
                            <a href="/login" className="linkToLogin">Already Have an Account?</a>
                        </div>                 
                    </form>
                </div>
            </div>
        </div>
    )
}