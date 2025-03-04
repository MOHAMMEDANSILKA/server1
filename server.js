const express=require('express');
const app=express();
const mongoose=require('mongoose');
//connecting to data base
mongoose.connect('mongodb://localhost/subscribers');
const db=mongoose.connnection;
db

app.listen(3000,()=>console.log("server is started"));

