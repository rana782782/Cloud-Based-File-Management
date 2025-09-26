const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');




router.get('/test',(req,res)=>{
    res.send("this is user test route");
})

router.get('/register',(req,res)=>{
    res.render("register");
})
router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/register',async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).send("All fields are required");
    }
    const hashedPassword = await bcrypt.hash(password,5);
   const user = await UserModel.create({
       username,
       email,
       password : hashedPassword
    })
    res.redirect('/user/login');
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).send("All feilds are required")
    }
    const user = await UserModel.findOne({ username })
   

    if(!user){
        return res.status(400).send("username or password is incorrect");
    }


    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(400).send("username or password is incorrect")
    }

    const token = jwt.sign({
        id : user._id,
        username : user.username
    },process.env.JWT_SECRET
       
    )

  res.cookie('token',token);

//   res.json({
//     message: "Login successful",
//     user: {
//         id: user._id,
//         username: user.username,
//         email: user.email
//     }
//   })

  res.redirect('/home');

})

module.exports = router;