const express = require("express");
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require("../config/passport")
const JWT = require('jsonwebtoken');
const User = require('../models/UserModel');

userRouter.route('/').get((req,res) => {
    User.find()
    .then( users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

userRouter.route('/register').post( async (req,res) => {
    const {firstName,lastName,email,password} = req.body;

    User.findOne({email},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message: {msgBody: "Email is already taken", msgError: true}});
        else{
            const newUser = new User({firstName,lastName,email,password});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                
                else
                    res.status(201).json({message: {msgBody: "Account created", msgError: false}});
            })
        }
    })
});

userRouter.post('/login', passport.authenticate('local', {session: false}), (req,res) => {
    if(req.isAuthenticated()){
        const {_id,firstName, lastName, email} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly:true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {firstName, lastName, email}});
    }
})

module.exports = userRouter;