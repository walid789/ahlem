const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const userSchema = mongoose.Schema({
 
name: {
    type: String , 
    require : true 
}, 
email:{
    type: String, 
    require: true, 
    unique: true , 
}, 

age : {
    type: Number,  
    require: true, 
},

password:{
    type:String , 
    require: true, 
}

});

userSchema.pre('save', async function (next){
    const user = this ; 
    console.log("Just Before saving  before hashing ", user.password ); 
   if(!user.isModified('password')){
    return next(); 
   }
   user.password = await bcrypt.hash(user.password, 8);
    console.log("Just Before saving after hashing ", user.password ); 
    next();

})

const User = mongoose.model('User', userSchema);

module.exports = User;