const express=require('express');
const app=express();
const mongoose=require('mongoose');
//code for mongodb
mongoose.connect('mongodb://localhost/subscribers');
const db=mongoose,connect;
app.listen(3000,()=>console.log("server is started"));

