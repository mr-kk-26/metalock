
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");



exports.verifyToken = async (req, res, next) =>{
    const bearerHeader = await req.headers['authorization'];
  
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
      
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, authConfig.secret, (err, decoded)=>{
            if(err){
                return res.status(401).send({
                    message: "Unauthorized !"
                })
            }
    
            req.email = decoded.email // i am taking the email from token and setting it in the request object
            next();
        })
        
    }else{
        return res.status(403).send({
            message: "No token provided ! Access prohibited"
        })
    }

    // validating the token

    
}