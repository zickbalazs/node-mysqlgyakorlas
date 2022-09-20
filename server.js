const express = require('express'), sql = require('mysql'), path = require('path'), server = express(), fs = require('fs'),
    conn = sql.createPool({
        host:'localhost',
        user:'root',
        database:'2123szft_mobiltelefonokzb',
        queueLimit:10
    });
server.use(express.urlencoded({extended:true}));


server.get('/', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, './web/index.html'));
})
server.get('/update', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, './web/update.html'));
})
server.get('/delete', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, './web/delete.html'));
})
server.post('/api/add-phone', (req,res)=>{
    let body = {
        "manufacturer": req.body.manufacturer,
        "type": req.body.type,
        "memory": req.body.memory,
        "storage": req.body.storage,
        "os": req.body.os,
        "cpu": req.body.cpu,
        "warranty": req.body.warranty,
        "price": req.body.price,
        "color": req.body.color
    }
    let arr = [];
    console.log(body);
    conn.query(`insert into keszulekek values (null, '${body.manufacturer}', '${body.type}', ${body.memory}, ${body.storage}, '${body.os}', '${body.cpu}', ${body.warranty}, ${body.price}, '${body.color}')`, (err, data)=>{
        if (err) res.status(500).send(err.sqlMessage);
            else{
                res.status(200).send(data);
            }
    });
})
server.get('/api/list-phones', (req,res)=>{
    conn.query('select * from keszulekek', (err, data, fields)=>{
        res.status(200).send(data);
    })
})
server.post('/api/update-phone', (req,res)=>{
    let body = {
        "id": req.body.id,
        "manufacturer": req.body.manufacturer,
        "type": req.body.type,
        "memory": req.body.memory,
        "storage": req.body.storage,
        "os": req.body.os,
        "cpu": req.body.cpu,
        "warranty": req.body.warranty,
        "price": req.body.price,
        "color": req.body.color
    }
    conn.query(`update keszulekek set gyarto='${body.manufacturer}', tipus='${body.type}', memoria='${body.memory}', tarhely='${body.storage}', oprendszer='${body.os}', processzor='${body.cpu}', garancia='${body.warranty}', ar='${body.price}', szin='${body.color}' where id=${body.id}`, (err,data)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(data);
    })
})
server.post('/api/delete-phone', (req,res)=>{
    conn.query(`delete from keszulekek where id=${req.body.id}`, (err, data)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.status(200).send(data);
    });
})




server.listen(3000, console.log('listening on http://localhost:3000'));
