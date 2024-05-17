require('dotenv').config({path:'.env'});

const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');
const server = express();

const routes = require('./routes');

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api', routes)


server.listen(process.env.PORT, () => {
    
    console.log(`Server listening http://localhost:${process.env.PORT}`)

})


