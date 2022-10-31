const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },
    password:{
        type: String,
        required: true        
    },
    templates_created:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Template"
    }

})

module.exports = mongoose.model("user", userSchema)
