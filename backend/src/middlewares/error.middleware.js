
const errorMiddleware = (err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something Went Wrong"

    return res
    .status(statusCode)
    .json({success : err.success , message});
}

export default errorMiddleware;