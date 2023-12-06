const {check, validationResult} = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const sanitizeMultipleSpaces = (value) => {
    return value.replace(/ +/g, ' ').trim();
  };
exports.validateNewTodo= [
    check('description').notEmpty().withMessage("Description is needed").bail().customSanitizer(sanitizeMultipleSpaces),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:errors.array()[0].msg})
        }
        next();
    }
]
exports.validateUpdateTodo = [
    check('id').notEmpty().withMessage("An id is required!").bail().isInt().withMessage("id should be an integer!").bail(),
    check('description').optional().notEmpty().withMessage("Description is needed").bail().customSanitizer(sanitizeMultipleSpaces),
    check('completed').optional().isInt().isIn([1,0]).withMessage("Completed accept only 1 or 0"),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:errors.array()[0].msg})
        }
        next();
    }
]
