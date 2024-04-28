require('dotenv').config()
module.exports = {
    NODEENV:process.env.NODE_ENV??"development",
    LIVEMODE:process.env.LIVE_MODE,
    PORT:process.env.PORT??3500,
    MONGOURI:process.env.LIVE_MODE=="true" ? process.env.LIVE_MONGO_URI : process.env.LOCAL_MONGO_URI??"mongodb://localhost:27017/loReady",
    JWTSECRET:process.env.ACCESS_SECRET_KEY,
    JWTEXPIRE:process.env.ACCESS_EXPIRE_IN,
    SALT: process.env.SALT || 10,
}