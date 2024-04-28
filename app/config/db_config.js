const mongoose =require("mongoose")
const env_config = require ('./env_config')

exports.DBCONNECT = async ()=>{
    try {
        const options={
            autoIndex: true,
        }
        let con =await mongoose.connect(env_config.MONGOURI,options)
        console.log("DB connection established on",con.connection.host)
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
