const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authUserMiddlware(req, res, next){

    const token = req.cookies.token

    if (!token){
        return res.status(401).json({
            message : "Please Login/Register first."
        })
    }

    try {
        const clientToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id : clientToken.id
        })

        req.user = user

        next()

    } catch (err){
        return res.status(401).json({
            message : "Invalid token."
        })
    }

} 

module.exports = {
    authUserMiddlware
}