const mongoose = require('mongoose');
const StateSchema =new  mongoose.Schema({
  
    name: {
    type: String , 
    require : true 
}, 
data:{
    type:Object,
    require:true
}

});

const state= mongoose.model('state', StateSchema);


module.exports = state;