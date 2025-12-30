
const errorMiddleware = (err , req , res , next) => {
    statusCode = err.statusCode || 500;
    message = err.message || "Something Went Wrong"

    return res
    .status(statusCode)
    .json({success : err.success , message});
}

export default errorMiddleware;