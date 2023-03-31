
console.log('hellow');
const express= require('express');
// const PORT=8000;
const app=express();
const mongoose=require('mongoose')
const dotenv=require("dotenv");
const cors= require('cors')
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors())
app.use(express.json());

app.use('/', require('./routes/'));
// app.get('/api/test',()=> console.log('sucse'))






app.listen(process.env.PORT || 8000 ,()=>{
    console.log('serverlistning');
})