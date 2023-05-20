const mongoose = require('mongoose');
const userProSchema = mongoose.Schema({
 
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
},
job: { type: String,
     required: true },

adress : {
        type: String,
        required: true
    },

file: {
     data: Buffer,
     contentType: String } , 

     statut:{
        type: String,
        required: true
     }

});

const UserPro = mongoose.model('UserPro', userProSchema);

module.exports = UserPro;