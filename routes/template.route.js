/**
 *   This file is dedicated to routing logic for template
 */

const templateController = require("../controllers/template.controller");

const autJwt = require("../middlewears/auth.jwt");

module.exports = (app)=>{
    app.post("/template", [autJwt.verifyToken], templateController.insertTemplate);
    app.get("/template", [autJwt.verifyToken], templateController.getAllTemplates);
    app.get("/template/:template_id", [autJwt.verifyToken], templateController.getSingleTemplate);
    app.put("/template/:template_id", [autJwt.verifyToken], templateController.upateSingleTemplate);
    app.delete("/template/:template_id", [autJwt.verifyToken], templateController.deleteSingleTemplate);
}