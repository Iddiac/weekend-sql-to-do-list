// bring in express
const express = require('express');

// link your pool.js
const pool = require('../modules/pool.js');
const router = express.Router();


// routes

// ROUTER. GET
router.get('/', (req, res) => {
    console.log('in /items GET');
    // set query = to all items in TABLE
    const query = `SELECT * FROM "list"`;
    // put query into pool.query
    pool.query(query).then((response) => {
        // send the rows of the table which is inside of response
        res.send(response.rows);
    }).catch((err) => {
        console.log('error in GET', err)
        res.sendStatus(500);
    })
})

// ROUTER.POST
router.post('/', (req, res) => {
    //set a variable equal to req.body for easyness
    let insidebody = req.body;
    console.log('in /item POST')
    // set up a query for security and make an object with the items from bodyitems
    const query = `INSERT INTO "list"("task","task_date")
 VALUES($1,$2)`;
 
 //Now set values= to the items inside of insidebody
 const values =[insidebody.task,insidebody.task_date]

    pool.query(query, values).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('go back and fix router.post', err)
        res.sendStatus(500);
    })
})

// ROUTER.DELETE

router.delete('/:id', (req,res)=>{
    // req.params.id is a means to the get id of the thing you deleted-ish
    console.log('/items DELETE hit:', req.params.id)
    //again set query equal to a delete statement like in sql
    const query=` DELETE FROM "list" WHERE id=$1`;// $1 means where id of the thing is equal to task, meaning its going to delete the task which the id of the button equals
    // set values = to the params
    const values = [req.params.id];
    pool.query(query, values).then((response)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error in router.delete',err)
        res.sendStatus(500);
    })
})

//ROUTER.PUT
//almost the exact same as delete
router.put('/:id/status', (req,res)=>{
    console.log('/items in PUT', req.params.id);
    const query= `UPDATE "list" SET "status"= NOT "status" WHERE id=$1;`
    const values=[req.params.id];
    pool.query(query, values).then((response)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log("error in put", err)
        res.sendStatus(500);
    })


})


module.exports = router;