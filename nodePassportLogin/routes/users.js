
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')





//User model
const User = require('../models/User')
//Login page
router.get('/login', (req, res)=> res.render('login'))

//Register page
router.get('/register', (req, res)=> res.render('register'))

//register handle
router.post('/register', (req, res)=>{
    
    const {name, email, password, password2} = (req.body)
    let errors = [];

    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: "Please fill in all the fields"})
    }

    if(password !== password2){
        errors.push({msg: "password doesn't match"})
    }

    if(password.length<6){
        errors.push({msg: "Password should be at least 6 charecter"})
    }

    if(errors.length>0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //password validation
       User.findOne({email: email})
       .then(user=>{
           if(user){
               //user exits
               errors.push({msg: "Email is already existed"})
               res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            })

           }else{
                const newUser = User({
                    name,
                    email,
                    password
                });
               //hash password
               bcrypt.genSalt(10, (err, salt)=>bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;

                //save user
                newUser.save()
                .then(user =>{
                    req.flash('success_msg' , 'You are now registered and can log in')
                    res.redirect('/users/login')
                })
                .catch(err => console.log(err))
               }))
           }
       })
    }
    
});
//login handle
router.post('/login', (req, res, next)=>{
    passport.authenticate( 'local' , {
        
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
        
        

    })(req, res, next); 

});

//logout handle
router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('success_msg', "You are logged out")
    res.redirect('/users/login')
})
module.exports = router;

