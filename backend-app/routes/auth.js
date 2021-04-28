const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const emailValidator = require('email-validator');

router.post('/register', async (req,res) => {

    const { firstName, lastName, email, password, confirmPassword} = req.body;
    
    if(!emailValidator.validate(email))
        return res.status(400).json({
            errorMessage: "Email address is not valid!"
        })
    
    if(password.length < 6)
        return res.status(400).json({
            errorMessage: "Please enter a password of at least 6 characters"
        })
    
    if(password !== confirmPassword)
        return res.status(400).json({
            errorMessage: "Wrong confirmation password!"
        })
    
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({
        errorMessage: "Email already exists!"
    })

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
        res.send(savedUser);
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
                errorMessage: "Email address is not valid!"
            })

        const existingUser = await User.findOne({email});

        if(!existingUser) 
            return res.status(401).json({errorMessage:"Email address is not exists!"});
        
        const verifyPassword = await bcrypt.compare(req.body.password, existingUser.password);
        if(!verifyPassword)
            return res.status(401).json({errorMessage:"Wrong password"});
        
        const token = jwt.sign({_id: existingUser._id, firstName: existingUser.firstName, lastName: existingUser.lastName}, process.env.TOKEN_SECRET);
            res.cookie('access_token',token,{
                httpOnly: true,
            }).send();

    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/logout', async (req,res) => {
    res.cookie('access_token',"",{
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get('/loggedIn', (req,res) => {
    try{
        const token = req.cookies.access_token;

        if(!token) 
            return res.status(401).json(false);
        res.send(true);

    }catch(err){
        res.json(false);
    }
});

module.exports = router;