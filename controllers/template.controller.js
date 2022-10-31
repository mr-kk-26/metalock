const Template = require("../models/template.model");
const User = require("../models/user.model");

/**
 * 
 *  Method to create the logic of creating templates
 * 
 */


exports.insertTemplate = async (req, res)=>{

    try{

        const templateObj = {
            template_name: req.body.template_name,
            subject: req.body.subject,
            body: req.body.body
        }

        const templateCreated = await Template.create(templateObj);

        if(templateCreated){

            const user = await User.findOne({
                email: req.email
            });

            user.templates_created.push(templateCreated._id);
            await user.save();
        }
        return res.status(200).send(templateCreated)
    }catch(err){
        console.log("Error while inserting the template :", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}


exports.getAllTemplates = async (req, res)=>{
    try{
    const user = await User.findOne({email: req.email});
    const queryObj = {};
    const templates_created = user.templates_created;
    
    if(!templates_created){
        return res.status(200).send({
            message: "No templates created by the user yet"
        })
    }
    queryObj["_id"] = {$in: templates_created}

    const templates = await Template.find(queryObj);

    return res.status(200).send(templates);
    }catch(err){
        res.status(400).send({
            message: "some internal error"
        })
    }
}

exports.getSingleTemplate = async (req, res)=>{

    try{

    
    const template = await Template.findOne({_id: req.params.template_id})
 
    console.log(req.params.template_id);
    if(!template){
        return res.status(400).send({
            message: "Ticket not found"
        })
    }

    return res.status(200).send(template)
}catch(err){
    console.log("some error :", err.message);
    return res.status(400).send({
        message: "some internal error"
    })
}
}


exports.upateSingleTemplate = async (req, res)=>{

    try{
        const user = await User.findOne({email: req.email});
        const template = await Template.findOne({_id: req.params.template_id});

        

        if(!template){
            return res.status(400).send({
                message: "Template not found"
            })
        }

        template.template_name = req.body.template_name ? req.body.template_name : template.template_name;
        template.subject = req.body.subject ? req.body.subject : template.subject;
        template.body = req.body.body ? req.body.body : template.body;

        await template.save()

        return res.status(200).send(template)

    }catch(err){
        console.log("error updateSingleTemplate :", err.message);
        return res.status(400).send({
            message: "Some internal error"
        })
    }


}


exports.deleteSingleTemplate = async (req, res)=>{

    try{let template = await Template.findOne({_id: req.params.template_id})

        if(!template){
            return res.status(400).send({
                message: "Not template found"
            })}
        
            await template.delete();
        
            
            return res.status(200).send({
                message: "deleted sucessfully"
            })
}catch(err){
    console.log("error deletingSingleTemplate :", err.message);
}

}