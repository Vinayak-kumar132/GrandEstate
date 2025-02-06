import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();



export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password

    ) {
        return res.status(403).send({
            success: false,
            message: "All fields are required",
        });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({
            message: "User Created Successfully",
        })

    } catch (error) {
        // res.status(500).json(error.message);
        next(error);

    }




};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        // sign function take payload ,secret and option
        const token = jwt.sign({ id: validUser._id, email: validUser.email }, process.env.JWT_SECRET, { expiresIn: "24h" } )

        validUser.token = token;
        //Even though the password is hashed, we should never expose it in API responses to prevent any potential leaks.
        validUser.password = undefined;
        // Since validUser is a Mongoose document, setting user.password = undefined; only removes it from the response—it doesn’t delete it from the database.

        const options={
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie('access_token',token,options).status(200).json({
            success: true,
            token,
            validUser,
            message: `User Login Success`,
        });





    } catch (error) {
        next(error);
    }
}

