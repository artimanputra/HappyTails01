const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Owner',ownerSchema)