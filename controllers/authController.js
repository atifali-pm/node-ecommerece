import userModel from "../models/userModel.js"

// Login callback
export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(req.body);
        const user = await userModel.findOne({email, password})
        if (!user) {
            return res.status(404).send('User not found!')
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

// Register callback
export const register = async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        console.log(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            newUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}