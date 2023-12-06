const Todo = require('../models/todo.model');

/** create table */
exports.initDb = ()=> Todo.createTable();

/**
 * create a new Todo
 * @param {Text} description 
 * @returns {Promise<{id:Number, description:Text, completed:1|0}>}
 */
exports.createTodo = async (description) => await Todo.createTodo(description);

/**
 * find all Todos
 * @returns {Promise<[]>}
 */
exports.getAllTodos = async ()=> await Todo.allTodos();

/**
 * update a todo by id
 * @param {Number} id 
 * @param {{description:Text, completed:1|0}} todo 
 * @returns {Promise<{id:Number, description:Text, completed:1|0}>}
 */
exports.updateTodo = async( id, todo)=> await Todo.updateTodo(id, todo);

/**
 * Delete todo by Id
 * @param {Number} id 
 * @returns {Promise<{changes:Number}>}
 */
exports.deleteTodoById = async (id)=> await Todo.deleteTodo(id);

/**
 * delete all tasks
 * @returns {Promise<{changes:Number}>}
 */
exports.deleteAllTodos = async ()=> await Todo.deleteAllTodos();
