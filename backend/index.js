var express = require('express');
var app = express();
require('dotenv').config();
var routes = require ('./routes/routes');
const cors = require ('cors');
var mongoose = require('mongoose');


// index.js
import http from 'http';
 
// Create a server object
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // Write some text to the response
    res.end('Welcome to my Explory app!');
});
 
const PORT = 8080;

mongoose.connect(process.env.MongoDbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}
    )
.then( () => {
    console.log("MongoDb Connected Successfully");
})
.catch((err) => console.log("Connection Error",err));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, ()=>{
    console.log("App is Running on Port",PORT);
})