// JUST BASIC SET UP
const { urlencoded } = require('express');
const express= require('express');
const app=express();
const port= process.env.PORT || 5000;

//route
const listRouter = require('./routes/list.router');
app.use('/list',listRouter);




// middleware
app.use(express.static('server/public'));
app.use(urlencoded({extended:true}));



// footerwear?
app.listen(port,()=>{
console.log('server on', port);
})
