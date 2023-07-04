import dotenv from "dotenv"
import userModel from "../models/userModel.js"
import transporter from "../config/emailTransporter.js"
import nodemailer from "nodemailer";
import  JWT  from "jsonwebtoken";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
dotenv.config()

// Register callback
export const register = async (req, res) => {
    try {

        const { name, email, password, phone, address, answer } = req.body;

        // validations
        if (!name) {
            return res.send({error: "Name is required"});
        }

        if (!email){
            return res.send({message: "Email is required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email address'
            });
        }

        if (!password){
            return res.send({message: "Password is required"});
        }

        if (!phone){
            return res.send({message: "Phone is required"});
        }

        if (!address){
            return res.send({message: "Address is required"});
        }

        if (!answer){
            return res.send({message: "Answer is required"});
        }

        // Check existing user

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: "Already registered please login"
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name, 
            email, 
            phone, 
            address, 
            password: hashedPassword, 
            answer,
        }).save();

        // Generate a random verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Create the email content
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is: ${verificationCode}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Failed to send verification email.');
            } else {
                console.log('Verification email sent: ' + info.response);
                res.status(200).send('Verification email sent.');
            }
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

// Login callback
export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid emaiil or password"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        const match = await comparePassword(password, user.password);

        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid password"
            })
        }

        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES, //"7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

