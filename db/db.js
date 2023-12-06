const sqlite = require('sqlite3').verbose();
const {join} = require('path');

const db = new sqlite.Database(join(__dirname, 'todo.db'), err=>{
    if(err){
        console.log({msg:"error creating or connecting to db", err});
    }else{
        console.log("db connected successfully!...")
    }
});

module.exports = db;

