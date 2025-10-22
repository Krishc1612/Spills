const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerUser(req, res){
    try {
        const {fullName, email, DOB, password} = req.body

        const isUserExists = await userModel.findOne({
            email : email
        })

        if (isUserExists) {
            return res.status(400).json({
                message : "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await userModel.create({
            fullName : fullName,
            email : email,
            password : hashedPassword,
            DOB : DOB
        })

        const token = jwt.sign({
            id : user._id
        },
            process.env.JWT_SECRET
        )

        res.cookie('token', token)

        return res.status(200).json({
            message : "User Registered Successfully.",
            user : {
                id : user._id,
                fullName : user.fullName,
                email : user.email,
                DOB : user.DOB
            }
        })
    } catch (err) {
        console.error('registerUser error:', err)
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }

    // did this inorder to detect any errors happening in the try block.
    // elsewise we only had only used try and catch in jwt.verify which if correctly verifies the token allows the next statement to execute else it throws an error
} 

async function loginUser(req, res){
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                message : "email or password incorrect."
            })
        }

        const validatePassword = await bcrypt.compare(password, user.password)

        if (!validatePassword){
            return res.status(400).json({
                message : "email or password incorrect."
            })
        }

        const token = jwt.sign({
            id : user._id
        }, 
            process.env.JWT_SECRET
        )

        res.cookie('token', token);

        return res.status(200).json({
            message: "User Logged In Successfully.",
            user : {
                email : email
            }
        })

    } catch (err) {
        console.log("Can't login user.")
        return res.status(500).json({
            message : "Error logging in user"
        })
    }
} 

module.exports = {
    registerUser,
    loginUser
}