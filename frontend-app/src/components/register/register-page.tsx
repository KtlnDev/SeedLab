import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AccountIcon from '../../images/accountIcon.png';
import './register-page.scss'
import axios from 'axios'

export default function RegisterPage(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event){
        event.preventDefault();

        const user ={
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        console.log(user);
        axios.post('http://localhost:5000/users/add',user)
        .then(res => console.log(res.data));

       /* window.location.href = "/login";   */
    }

    return(
        <div className="register-page">
            <div className="left-image"></div>
            <div className="right-side-register">
                <div className="register-container">
                    <img src={AccountIcon} alt="Logo" className="icon"></img>
                    <h1>Create account</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <TextField id="firstName" name="firstName" label="First Name" type="text" variant="outlined" onChange={e => setFirstName(e.target.value)} required/>
                        <TextField className="lname" id="lastName" name="lastName" label="Last Name" type="text" variant="outlined" onChange={e => setLastName(e.target.value)} required/> 
                        <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)} required/>
                        <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} required/>
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