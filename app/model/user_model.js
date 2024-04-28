const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    sortingKey: { type: Number, default: 1 },
    Name: { type: String, default: ""},
    email: { type: String, index:true,require: true, lowercase: true, trim: true },
    password: { type: String,trim: true },
    social_key: { type: String, default: "" },
    social_login: { type: String, default: "" },
    social_logs:{type:Array,default:[]},
    device_token: { type: String, default: "" },
    token: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', userSchema)