const mongoose = require('mongoose');
const challengeSchema =new  mongoose.Schema({
    
    id: {
        type: String , 
        require : true 
    }, 
    title: {
    type: String , 
    require : true 
}, 
description:{
    type: String, 
    require: true, 
}, 
createdAt:{
    type:String , 
    require: true, 
},
mode:{
    type:String , 
    require: true, 
},
duration:{
    type:Number,
    require: true, 
}

});

const challenge= mongoose.model('challenge', challengeSchema);


module.exports = challenge;