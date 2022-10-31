const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    
    template_name:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        maxLength: 50
    },
    body:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("template", templateSchema)
