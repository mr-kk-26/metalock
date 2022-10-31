
const User = require("../models/user.model");

exports.validateSignupRequestBody = async (req, res, next)=>{
    // validating if the first_name is present

    if(!req.body.first_name){
        return res.status(400).send({
            message: "Failed ! User first_name is not provided"
        })
    }

    // validating if the last_name is present

    if(!req.body.last_name){
        return res.status(400).send({
            message: "Failed ! User last_name is not provided"
        })
    }

    // validating if the email is present

    if(!req.body.email){
        return res.status(400).send({
            message: "Failed ! User email is not provided"
        })
    }

    // validating user password is present

    if(!req.body.password){
        return res.status(400).send({
            message: "Failed ! User password is not provided"
        })
    }

    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message: "Not a valid email"
        })
    }


    try{
        const user = await User.findOne({email: req.body.email});

        if(user != null){
            return res.status(400).send({
                message: "Failed ! email already exists"
            })
        }
    } catch(err){
        console.log("error while validating signup :", err.message);
        return res.status(500).send({
            message: "some internal erro"
        })
    }

    next()

  

}

const isValidEmail = (email) =>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

exports.validateSignInRequestBody = (req, res, next)=>{
    if(!req.body.email){
        return res.status(400).send({
            message: "Failed ! email is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message: "Failed ! password is not provided"
        })
    }

    next()
}

