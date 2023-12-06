const { createTodo, getAllTodos, updateTodo, deleteTodoById, deleteAllTodos } = require("../services/todo.service");
const {StatusCodes} = require('http-status-codes');

exports.createNewTodo = async(req, res)=>{
    try {
        const {description} = req.body;
        const todo = await createTodo(description);
        return res.status(StatusCodes.CREATED).json({todo});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}
exports.indexTodos = async(req, res)=>{
    try {
        const {todos} = await getAllTodos();
        if(!todos.length) return res.status(StatusCodes.NOT_FOUND).json({msg:'List empty!'});
        return res.status(StatusCodes.OK).json({todos});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

exports.updateTodo = async(req, res)=>{
    try {
        const id = req.params.id;
        const {completed, description} = req.body;
        const {todo} = await updateTodo(id, {description, completed});
        if(!todo) return res.status(StatusCodes.NOT_FOUND).json({msg:"To do not found!"});
        return res.status(StatusCodes.OK).json({todo});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

exports.deleteTodo = async (req, res)=>{
    try {
        const id = req.params.id;
        const {changes} = await deleteTodoById(id);
        if(!changes) return res.status(StatusCodes.NOT_FOUND).json({msg:'Todo not found!'});
        return res.status(StatusCodes.OK).json({todo:{id}});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}
exports.deleteAll = async(req, res)=>{
    try {
        const {changes} = await deleteAllTodos();
        if(!changes) return res.status(StatusCodes.NOT_FOUND).json({msg:"List empty!"});
        return res.status(StatusCodes.OK).json({deleted:true});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}