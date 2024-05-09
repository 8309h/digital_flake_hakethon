const express =  require('express');
const connection  = require('./config/db');
const UserRouter =  require('./routes/userRoutes');
const bodyParser = require('body-parser');
const authentication =  require('./middlewares/authentication');
const cors =  require('cors')
require('dotenv').config();

const app =  express();


// Middleware
app.use(cors()); 

// Routes
app.get("/", (req, res) => {
  res.send('Wel-come to the HomePage');
});

app.use('/user', UserRouter);
app.use('/products', authentication,(req,res)=> {
    res.send('Protected routers')
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