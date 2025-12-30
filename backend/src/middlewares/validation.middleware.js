import ApiError from "../utility/ApiError.js";

const validateSchemaMiddleware = (schema) => (req , res , next) => {
    const {error} = schema.validate(req.body , {aboartEarly : false});

    if(error) {
        const errMsg = error.details.map( (err) => err.message ).join(",");

        return next(new ApiError(400 , errMsg));
    }

    next();
}


export default validateSchemaMiddleware;