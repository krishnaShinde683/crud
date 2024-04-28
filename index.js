const express = require('express')
const app = express()
const bodyParser= require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(bodyParser.json({limit:'50mb'}))
const cors = require("cors")

app.use(function (req, res, next) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
  });
var corsOptions = {
    origin: ["http://localhost:3500"]
  }
  app.use(cors(corsOptions));
   
  const {DBCONNECT} = require( "./app/config/db_config")
  DBCONNECT()
  
app.use('/api',require('./app/route'));

const env_config = require('./app/config/env_config');

let port=env_config.PORT

app.get('/',(req,res)=>{
    console.log(`WELCOME TO loReady!!! ON ${port}`)
    res.send(`WELCOME TO loReady!!! ON ${port}`)
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))