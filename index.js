const express = require ('express');
const port = 5000; 
const cors= require('cors')

const app = express(); 
const bodyParser =require('body-parser');
//
require('./db');
require('./models/User');
require('./models/UserPro');
require('./models/sentence');
require('./models/challenge');
require('./models/State');

//
const authRouters = require('./routes/authRoutes');
const requireToken = require('./middlewares/AuthTokenRequired');
const UsersPro = require('./models/UserPro');
const  sentence = require('./models/sentence');
const  challenge = require('./models/challenge');
const User = require('./models/User');
const State = require('./models/State');
//
app.use(bodyParser.json()); 
app.use(authRouters);
//



app.get('/users',  async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    try {
      // retrieve all users from the database
      const users = await UsersPro.find();
  
      // return the list of users as a JSON response
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
app.put('/users/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    console.log(req.body)
    try {
        const {id} = req.params;

        const product = await UsersPro.findByIdAndUpdate(id, req.body.user);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        console.log('succes')
        const updatedProduct = await UsersPro.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/challenge/add',async(req, res) => {
 
  let mode=req.body;
  try {
    //const ch = await challenge.find();
    const s=await challenge.create(mode)
    res.json(s);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});
app.post('/sentence',async(req, res) => {
 
  let mode1=req.body.mode;
  try {
    const data = await sentence.find({mode:mode1});
    const randomIndex = Math.floor(Math.random() * data.length);
    res.json(data[randomIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});

app.get('/sentenceAll',async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  try {
    const data = await sentence.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});
app.post('/sentenceAdd',async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  let data1=req.body.data
  try {
    const data = await sentence.create(data1);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});


app.get('/challengeAll',async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  try {
    const data = await challenge.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/challangeUpdate/:id', async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  console.log(req.body)
  try {
      const {id} = req.params;

      const cha = await challenge.findByIdAndUpdate(id, req.body.data);
      
      if(!cha){
          return res.status(404).json({message: `cannot find any challange with ID ${id}`})
      }
      console.log('succes')
      const updatedchallange = await challenge.findById(id);
      res.status(200).json(updatedchallange);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})



app.post('/ChallangeAdd',async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  let data1=req.body.data
  try {
    const data = await challenge.create(data1);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});
app.delete('/ChallangeDelete/:id',async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const {id} = req.params;
  try {
    const data = await challenge.findOneAndDelete({ _id: id });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/getSate',async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  let name=req.body.data.name;
  try {
    const data = await State.find({name:name});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});


app.use(cors())
app.listen(port,()=>{
    console.log('server is runing ');
})

