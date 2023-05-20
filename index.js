const express = require ('express');
const port = 5000; 
const cors= require('cors')

const app = express(); 
const bodyParser =require('body-parser');
//
require('./db');
require('./models/User');
require('./models/UserPro');
require('./models/challenge');

//
const authRouters = require('./routes/authRoutes');
const requireToken = require('./middlewares/AuthTokenRequired');
const UsersPro = require('./models/UserPro');
const  challenge = require('./models/challenge');
//
app.use(bodyParser.json()); 
app.use(authRouters);
//
const User = require('./models/User');


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

app.put('/challenge',async(req, res) => {
 
  //let mode=req.body.mode;
  try {
    const ch = await challenge.find();
    res.json(ch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


});

app.use(cors())
app.listen(port,()=>{
    console.log('server is runing ');
})

