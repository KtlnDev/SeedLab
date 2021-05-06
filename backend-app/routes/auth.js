const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const emailValidator = require('email-validator');
const jwt_decode = require('jwt-decode');

router.post('/register', async (req,res) => {

    const { firstName, lastName, email, password, confirmPassword} = req.body;
    
    if(!emailValidator.validate(email))
        return res.status(400).json({
            errorMessage:"Email address is not valid!"
        });
    
    if(password.length < 6)
        return res.status(400).json({
            errorMessage:"Please enter a password of at least 6 characters!"
        });
    
    if(password !== confirmPassword)
        return res.status(400).json({
            errorMessage:"Your password and confirmation password do not match!"
        });
    
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({
        errorMessage:"Email already exists!"
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.status(201).send({
            message: "Account created!"
        });
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    try{
        const{ email, password} = req.body;

        if(!emailValidator.validate(email))
            return res.status(400).json({
                errorMessage:"Email address is not valid!"
            });

        const existingUser = await User.findOne({email});

        if(!existingUser) 
            return res.status(404).json({
                errorMessage:"Email address is not exists!"
            });
        
        const verifyPassword = await bcrypt.compare(req.body.password, existingUser.password);
        if(!verifyPassword)
            return res.status(400).json({
                errorMessage:"Your password is incorrect!"
            });
        
        const token = jwt.sign({_id: existingUser._id, firstName: existingUser.firstName, lastName: existingUser.lastName}, process.env.TOKEN_SECRET);
            res.cookie('access_token',token,{
                httpOnly: true,
            }).send({
                isAuthenticated: true,
                username: existingUser.firstName + ' ' + existingUser.lastName
            });

    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/logout', async (req,res) => {
    res.cookie('access_token',"",{
        httpOnly: true,
        expires: new Date(0)
    }).send("Logout");
});

router.get('/loggedIn', (req,res) => {
    try{
        const token = req.cookies.access_token;

        if(token){
            const user = jwt_decode(token);
            const username = user.firstName + ' ' + user.lastName;

            res.send({
                isAuthenticated: true,
                username: username
            });
        } else {
            return res.status(401).send({
                isAuthenticated: false,
                username: null
            });
        }
    }catch(err){
        res.send(err);
    }
});

module.exports = router;