//manual error,status code are also manual

export const errorHandler=(statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message= message;
    return error;
}
