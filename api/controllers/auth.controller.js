import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import  errorHandler from '../utils/error.js';
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

    const differentusername = await User.findOne({ username });
    if (differentusername) {
        return res.status(400).json({
            success: false,
            message: "Username already registered try different one!!",
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
        });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({
            message: "User Created Successfully",
            newUser,
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
        const token = jwt.sign({ id: validUser._id, email: validUser.email }, process.env.JWT_SECRET, { expiresIn: "24h" })

        validUser.token = token;
        //Even though the password is hashed, we should never expose it in API responses to prevent any potential leaks.
        validUser.password = undefined;
        // Since validUser is a Mongoose document, setting user.password = undefined; only removes it from the response—it doesn’t delete it from the database.

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.cookie('access_token', token, options).status(200).json({
            success: true,
            token,
            validUser,
            message: `User Login Success`,
        });





    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // console.log(user);

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password: pass, ...rest } = user._doc; //user._doc → Contains all user details from MongoDB.
            //This line extracts the password field from user._doc and renames it as pass, while keeping the rest of the user data separately.

            res.cookie('access_token', token, {
                httpOnly: true
            }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
                , email: req.body.email, password: hashedPassword,avatar:req.body.photo
            });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            res.cookie('access_token', token, {
                httpOnly: true
            }).status(200).json(rest);
        }

    } catch (error) {

    }
}

