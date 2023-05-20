const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const UserPro = mongoose.model("UserPro")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

//
require('dotenv').config();
//
const bcrypt = require ('bcrypt');
//Nodemailer
async function mailer(receiveremail , code ) {
   let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
        user: "appfeelbetter@hotmail.com", 
        pass: '000000feel', // generated ethereal password
      },
    });
    const mailOptions = {
        from: "appfeelbetter@hotmail.com", 
        to: `${receiveremail}`, // list of receivers
        subject: "verification code", // Subject line
        html: `<b> Your verification code is ${code} </b>`
    }
  transporter.sendMail(mailOptions, function (err) {
        if(err)
          console.log(err)
        else
          console.log("email has sand ");
     });

}


  
router.post('/Signup',(req,res)=>{
    console.log(req.body);
    const {name, email,age,password} = req.body;
    if (!name || !email || !age || !password ) {
        return res.status(422).send({error: "please fill all the fields"});
    }
    User.findOne({email : email}).then(
        async(savedUser)=>{
            if (savedUser){
                return res.status(422).send({error:"Invalid email"});
            }
            const user = new User({
              name, 
              email,
              age, 
              password  
            })
    
            try {
                await user.save();
               const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
               res.send({token , user});

            }
            catch (err){
                console.log(err);
            }
        }
    )
})

router.post('/Verify', (req,res)=>{
    console.log(req.body);
    const {name, email,age,password} = req.body;
    if (!name || !email || !age || !password ) {
        return res.status(422).send({error: "please fill all the fields"});
    }
    User.findOne({email : email}).then(
        async(savedUser)=>{
            if (savedUser){
                return res.status(422).send({error:"Invalid email"});
            }
            try{
                let VerificationCode = Math.floor ( 1000000 + Math.random() * 9000000) ;
                let user =[
                 {
                    name, 
                    email, 
                    age,
                    password, 
                    VerificationCode
                 }
                ]
               await mailer(email,VerificationCode );
                res.send({message:"verfication code sent to your Email", udata: user});
              }
              catch(err){
                console.log(err);
                res.status(500).send({error: "an error occurred while sending the verification email"});

              }
        })
})

router.post('/Login', async (req,res)=>{
    const { email, password }= req.body; 
    if(!email || !password){
        return res.status(422).json({error: "Please add email or pasword "}); 
    }
    const savedUser = await User.findOne({email : email})
    if(!savedUser){
        return res.status(422).json({error : "Invalid "});
    }
    try{
        bcrypt.compare(password, savedUser.password,(err, result)=>{
            if(result){
                console.log("pasword match")
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                 res.send({token});
            }else{
                console.log('password does not match ')
                return res.status(422).json({error : "Invalid "}); 
            }

         })
    }
    catch(err){
       console.log(err);  
    }

})


module.exports = router ; 