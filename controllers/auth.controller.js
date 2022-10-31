/**
 *   This file will contain the logic for the registration of
 * the user and login of the user.
 */


const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");


/**
 *   Logic to accept the registration and login
 * 
 *      
 */

exports.signup = async(req, res)=>{
    
    // to read the data from the request body

    const userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    // Insert the data into the db and return the response

    try{
        const userCreated = await User.create(userObj);

        // returning the newly created user as the response

        const response = {
            first_name: userCreated.first_name,
            last_name: userCreated.last_name,
            email: userCreated.email
        }

        res.status(201).send(response);
    }catch(err){
        console.log("error during signup: ", err.message);
        res.status(500).send({
            message: "some internal error"
        })
    }
}


/**
 *     Logic to sign-in
 */

exports.signin = async (req, res)=>{

    try{
        const user = await User.findOne({email: req.body.email});

        if(user == null){
            return res.status(400).send({
                message: "Failed ! userId passed doesn't exist"
            });
        }

        // checking the password

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid){
            return res.status(401).send({
                message: "wrong password"
            });
        }

        // create the jwt token

        const token = jwt.sign({
            email: user.email
        }, authConfig.secret, {
            expiresIn: 600 // 10mins
        })

        // sending the sucessfull loging response

        res.status(200).send({
            name: user.first_name,
            email: user.email,
            accessToken: token
        });
    }catch(err){
        console.log("Internal error ", err.message);
        res.status(500).send({
            message: "Some internal error while singin"
        })
    }
}