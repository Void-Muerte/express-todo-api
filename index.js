const express = require('express');

/** Local imports */
const db = require('./db/db');
const Todo = require('./src/router/todo.router');
const { createTable } = require('./src/models/todo.model');


const PORT = 3000;
const app = express();



// let's create new table

createTable();


// middlewares
app.use(express.json());
// Router middleware
app.use('/api/eta/v1', Todo);




const server = app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
process.on('SIGINT', ()=>{
    db.close((err)=>{
        if(err){
           return console.err(err.message);
        }
        
        console.log(`db connection closed`)
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    });
});


