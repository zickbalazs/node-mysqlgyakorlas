const express = require('express'), sql = require('mysql'), path = require('path'), server = express(),
    conn = sql.createPool({
        host:'localhost',
        user:'root',
        database:'2123szft_mobiltelefonok',
        queueLimit:10
    });
server.use(express.urlencoded({extended:true}));


server.get('/', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, './web/index.html'));
})






server.listen(3000, console.log('listening on http://localhost:3000'));
