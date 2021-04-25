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
                    <Image src={AccountIcon} className="icon" rounded />
                    <h1>Create account</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <TextField id="firstName" name="firstName" label="First Name" type="text" variant="outlined" onChange={e => setFirstName(e.target.value)} />
                        <TextField className="lname" id="lastName" name="lastName" label="Last Name" type="text" variant="outlined" onChange={e => setLastName(e.target.value)} /> 
                        <TextField id="email" name="email" label="Email" type="text" variant="outlined" onChange={e => setEmail(e.target.value)} />
                        <TextField id="password" name="password" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} />
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