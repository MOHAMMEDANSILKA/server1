const express=require('express');
const app=express();
//mongoose..
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/subscribers');
const db=mongoose.connnection;

app.listen(3000,()=>console.log("server is started"));





