const express = require('express');
const { updateTodo, deleteTodo, createNewTodo, indexTodos, deleteAll } = require('../controllers/todo.controller');
const { validateNewTodo, validateUpdateTodo } = require('../middlewares/todo.validate');

const todoRouter = express.Router();

todoRouter.route('/').post( validateNewTodo, createNewTodo).get(indexTodos).delete(deleteAll);
todoRouter.route('/:id').all(validateUpdateTodo).put(updateTodo).delete(deleteTodo);

module.exports = todoRouter;