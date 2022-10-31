/**
 *   This file is dedicated to routing logic for signup and signin
 */

const authController = require("../controllers/auth.controller");
const {validateSignupRequestBody} = require("../middlewears/verifySingup");
const {validateSignInRequestBody} = require('../middlewears/verifySingup')


module.exports = (app) =>{
    app.post("/register", [validateSignupRequestBody], authController.signup);
    app.post("/login", [validateSignInRequestBody], authController.signin);
}