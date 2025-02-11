//manual error,status code are also manual

const errorHandler=(statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message= message;
    return error;
}
export default errorHandler;