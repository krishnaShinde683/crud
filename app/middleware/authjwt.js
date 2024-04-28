const jwt = require("jsonwebtoken");
require('dotenv').config()
const env_config = require("../config/env_config");
const apiResponse  = require("../helper/apiResponse");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return apiResponse.unauthorizedResponse(res, "No token provide!")
    jwt.verify(token, env_config.JWTSECRET, async (err, decoded) => {
        if (err) return apiResponse.unauthorizedResponse(res, "refreshtoken")
        req.myId = decoded.id;
        req.user_type=decoded.user_type
        next()
    })
}

const create_token = async (userData)=>{
    return jwt.sign(userData,env_config.JWTSECRET,{ expiresIn: env_config.JWTEXPIRE })
}

module.exports={
    verifyToken,
    create_token,
}