import errorHandler from './error.js'
import jwt from 'jsonwebtoken';
import  dotenv  from 'dotenv';
dotenv.config();


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Access Denied! No token provided."));

    // const decode = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    //     if (err) return next(errorHandler(403, "Token is invalid"));

    //     req.user = decode;
    //     next();
    // }

    // );



    //verify the token
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //Jo data jwt.sign() me bheja tha, wahi jwt.verify() ke decoded me milega object form me.
        // console.log(decode);
        req.user = decode;
    }
    catch (err) {
        //verification - issue
        return res.status(401).json({
            success: false,
            message: 'Token is invalid',
        });
    }
    next();

}