const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerUser(req, res){

    const {fullName, email, DOB, password} = req.body

    const isUserExists = await userModel.findOne({
        email : email
    })

    if (isUserExists) {
        res.status(400).json({
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

    const cookie = res.cookie('token', token)

    res.status(200).json({
        message : "User Registered Successfully.",
        user : {
            id : user._id,
            fullName : user.fullName,
            email : user.email,
            DOB : user.DOB
        }
    })
} 

module.exports = {
    registerUser
}