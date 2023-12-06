const db = require("../../db/db");

const todo = {
    /** creating the table in the database if not exist */
  createTable: () => {
    const createTableQuery = `
            CREATE TABLE  IF NOT EXISTS todos ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                completed INTEGER DEFAULT 0,
                description TEXT NOT NULL
            )
        `;
    db.run(createTableQuery, function(err){
      if (err) {
        console.log(err.message);
      } 
    });
  },
  /** creating a todo */
  createTodo: async (description) => {
    const queryTodo = `
        INSERT INTO todos(description) VALUES(?)
    `;
    const selectTodo = `SELECT * FROM todos WHERE id=?`;

    const {lastId} = await new Promise((resolve, reject) => {
      db.run(queryTodo, [description], function(err){
        if (err) {
          reject(err);
        } else {
          resolve({ lastId:this.lastID});
        }
      });
    });
    return await new Promise((resolve, reject) => {
      db.get(selectTodo, [lastId], (err, newTodo) => {
        if (err) {
          reject(err);
        } else {
          resolve(newTodo);
        }
      });
    });
  },
  /** reading all todos */
  allTodos: async ()=>{
    const queryString =   'SELECT * FROM todos';
    return await new Promise((resolve, reject)=>{
        db.all(queryString, function(err, rows){
            if(err){
                reject(err);
            }else{
                resolve({todos:rows});
            }
        })
    });
  },
  /** updating todo */
  updateTodo: async (id, todo) => {
    const { completed, description } = todo;
    const updateParams = [];
    let queryString = 'UPDATE todos SET';
    const selectString = 'SELECT * FROM todos WHERE id=?';
  
    if (completed !== undefined) {
      queryString += ' completed=?,';
      updateParams.push(completed);
    }
    if (description !== undefined) {
      queryString += ' description=?,';
      updateParams.push(description);
    }
  
    queryString = queryString.slice(0, -1) + ' WHERE id=?';
    updateParams.push(id);
  
  
    return new Promise((resolve, reject) => {
      db.run(queryString, updateParams, function (err) {
        if (err) {
          reject(err);
        } else {
          const changes = this.changes;
  
          if (changes === 1) {
            db.get(selectString, [id], (err, todo) => {
              if (err) {
                reject(err);
              } else {
                resolve({ todo });
              }
            });
          } else {
            resolve({ todo: null });
          }
        }
      });
    });
  },
  /** delete todo */
  deleteTodo: async(id)=>{
    const deleteQuery = 'DELETE FROM todos WHERE id=?';
    
    return await new Promise((resolve, reject)=>{
        db.run(deleteQuery, [id], function(err){
            if(err){
                reject(err);
            }else{
                resolve({changes:this.changes});
            }
        })
    })
  },
  deleteAllTodos: async()=>{
    const queryString = 'DELETE FROM todos';
    return await new Promise((resolve, reject)=>{
        db.run(queryString, function(err){
            if(err){
                reject(err)
            }else{
                resolve({changes:this.changes})
            }
        });
    })
  }
};

module.exports = todo;
