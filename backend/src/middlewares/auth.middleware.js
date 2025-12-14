const jwt = require('jsonwebtoken')

async function authUserMiddleware(req, res, next){

    const token = req.cookies.token

    if (!token){
        return res.status(401).json({
            message : "Please Login/Register first."
        })
    }

    try {
        const clientToken = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = clientToken.id;

        next()

    } catch (err){
        return res.status(401).json({
            message : "Invalid token."
        })
    }
} 

module.exports = {
    authUserMiddleware
}