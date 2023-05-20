const mongoose = require('mongoose');
const challengeSchema =new  mongoose.Schema({
 
mode: {
    type: String , 
    require : true 
}, 
text:{
    type: String, 
    require: true, 
}, 


word1:{
    type:String , 
    require: true, 
},
word2:{
    type:String , 
    require: true, 
},
word3:{
    type:String , 
    require: true, 
},

});

const challenge= mongoose.model('challenge', challengeSchema);


module.exports = challenge;