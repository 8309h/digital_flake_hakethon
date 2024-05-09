const express =  require('express');
const connection  = require('./config/db');
const cors =  require('cors')
require('dotenv').config();

const app  = express();
app.use(express.json())
app.use(cors())


// Basic Home route
app.get('/',(req,res)=>{
    res.status(201).json({"message":"Welcome to Homepage"})
})
app.listen(process.env.PORT, async()=> {

    try{
        await connection;
        console.log("Connected to the DataBase")
    }catch(err){
        console.log("Not connected to Database")
        console.log(err)
    }
    console.log(`Server run on the port ${process.env.PORT} `)
})