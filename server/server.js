// JUST BASIC SET UP
const express= require('express');
const app=express();
const port= process.env.PORT || 5000;

// middleware
app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

//route
const listRouter = require('./routes/list.router');
app.use('/list',listRouter);







// footerwear?
app.listen(port,()=>{
console.log('server on', port);
})
