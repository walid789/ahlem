const mongoose = require('mongoose');
const sentenceSchema =new  mongoose.Schema({
 
    sentence_suggestionBefore: {
    type: String , 
    require : true 
}, 
sentence_suggestionAfter:{
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

const sentence_seggestions= mongoose.model('sentence_seggestions', sentenceSchema);


module.exports = sentence_seggestions;