require('dotenv').config(); 
const express=require('express');
const app=express();
const mongoose=require('mongoose');
var bodyParser=require('body-parser');
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true},console.log('DB connected Successfully'));
const db=mongoose.connection;

db.on('error',(error)=>console.error(error));     // this will show us error if any
// db.once('open',()=>console.log('Another way to show DB is connected'));  

app.get('/',(req,res)=>{
    res.send('<h1>This REST API is for Student Information</h1>');
});

app.use(express.json());  // helps to get JSON file
const subsRouter=require('./Router/student'); 
app.use('/student',subsRouter);

const PORT=process.env.PORT || 2060;
app.listen(PORT,()=>console.log('Server is running')); 