const Email=require("../models/emails");
const Platform=require("../models/platforms");
const Category=require("../models/categories");
const Role = require("../models/roles");
const downloadExcel=require("../public/js/downloadExcel");
const excelJSU=require("exceljs");

const fs=require("fs");
const { Op } = require("sequelize");
const exportExcel = require("../public/js/downloadExcel");
const uploadExcel=require("../public/js/uploadExcel")
const randomCodeGenerator=require("../public/js/randomCodeGenerator");
const { platform } = require("os");
const User = require("../models/user");
const { email } = require("../config");




//email process
exports.get_email_create=async (req,res)=>{
    try {
        res.render("admin/email-create",{
            title: "Create E-mail",
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_email_create=async (req,res)=>{
    const mail= req.body.mail;
    const userId=req.session.userid;
    try {
        const newEmail=await Email.create({email: mail, userId:userId});
        const newEmailId=newEmail.id;
        const emailCode=await randomCodeGenerator("EM", newEmailId);//for emailCode
        newEmail.emailCode=emailCode;
        await newEmail.save();
        req.session.message={text:"New e-mail is added", class:"success"}
        return res.redirect("/admin/emails?action=create")
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }

        return res.render("admin/email-create",{
            title: "Create E-mail",
            message:{text: errorMessage, class:"danger"}
        })
    }
}
exports.get_email_edit=async (req,res)=>{
    const mailId=req.params.emailId;
    try {
        const email=await Email.findByPk(mailId);
        res.render("admin/email-edit",{
            title: "Edit Email",
            email: email
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_email_edit=async (req,res)=>{
    const mailId=req.body.mailId;
    const updatedMail=req.body.mail;
    try {
        await Email.update({email:updatedMail},{where:{id:mailId}});
        req.session.message={text:"E-mail is edited", class:"primary"}
        return res.redirect("/admin/emails?action=edit");
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }
        return res.render("admin/email-edit",{
            title: "Edit Email",
            message: {text: errorMessage, class:"danger"},
            email: updatedMail
        })
    }
}
exports.get_email_delete=async (req,res)=>{
    const mailId=req.params.emailId;
    try {
        const email=await Email.findByPk(mailId);
        res.render("admin/email-delete",{
            title:"Delete Email",
            email: email
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_email_delete=async (req,res)=>{
    const mailId= req.body.mailId;
    try {
        await Email.destroy({where:{id:mailId}});
        req.session.message={text:"E-mail is deleted", class:"danger"}
        return res.redirect("/admin/emails?action=delete");
    } catch (err) {
        console.log(err);
    }
}
exports.get_emails=async (req,res)=>{
    const userId=req.session.userid;
    const emails=await Email.findAll({where: {userId:userId}});
    const msg=req.session.message;
    delete req.session.message;
    try {
        res.render("admin/emails",{
            title: "Emails",
            emails: emails,
            action: req.query.action,
            message: msg
        })
    } catch (err) {
        console.log(err);
    }
}

//platform process
exports.get_platform_create=async (req,res)=>{

    try {
        res.render("admin/platform-create",{
            title: "Create Platform"
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_platform_create=async (req,res)=>{
    const platformName=req.body.platformName;
    let logo= req.file ? req.file.filename : "";
    const url=req.body.url;
    const userId=req.session.userid;
    try {
        const newPlatform=await Platform.create({
            platformName:platformName,
            logo: logo,
            link: url,
            userId: userId
        })
        const newPlatformId=newPlatform.id;
        const platformCode=await randomCodeGenerator("PLT",newPlatformId);
        newPlatform.platformCode=platformCode;
        newPlatform.save();
        req.session.message={text:"New category is added, you can edit now", class:"success"}
        return res.redirect(`/admin/platform/edit/${newPlatformId}?action=create`);
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }
        return res.render("admin/platform-create",{
                title: "Create Platform",
                message: {text: errorMessage, class:"danger"},
            })

    }
}
exports.get_platform_edit=async (req,res)=>{
    const userId=req.session.userid;
    const platformId=req.params.platformId;
    const msg=req.session.message;
    delete req.session.message;
    try {
        const platform=await Platform.findOne({where:{id: platformId},include:[{model:Category},{model: Email}]});
        const emails=await Email.findAll({where: {userId:userId}});
        const categories=await Category.findAll({where: {userId:userId}});
        res.render("admin/platform-edit",{
            title: "Edit Platform",
            platform: platform,
            emails: emails,
            categories: categories,
            message: msg,
            action:req.params.action,
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_platform_edit=async (req,res)=>{
    const userId=req.session.userid;
    const platformId=req.body.platformId;
    const platformName=req.body.platformName;
    let logo=req.body.logo;
    const url=req.body.url;
    const emailId=req.body.emailId;
    const userName=req.body.userName;
    const password=req.body.password;
    const recoveryEmail=req.body.recoveryEmail;
    const phone=req.body.phone;
    const recoveryCode=req.body.recoveryCode;
    const categoryIds=req.body.categories;
    const isFavorite=req.body.isFavorite=="on" ? 1:0;


    if(req.file){
        logo=req.file.filename;
        
        fs.unlink("./public/img/"+req.body.logo,err=>{
            console.log("**Logo couldn't cahnge",err)
        })
    }
    try {
        const platform=await Platform.findOne({
            where:{
                id: platformId
            },
            include:{model: Category}
        });

        if(platform){
            platform.platformName=platformName;
            platform.logo=logo;
            platform.link=url;
            platform.userName=userName;
            platform.emailId=emailId;
            platform.recoveryEmail=recoveryEmail;
            platform.password=password;
            platform.recoveryCode=recoveryCode;
            platform.phone=phone;
            platform.isFavorite=isFavorite;

            if(categoryIds==undefined){
                await platform.removeCategories(platform.categories);
            }else{
                await platform.removeCategories(platform.categories);
                const selectedCategories=await Category.findAll({
                    where:{id:{[Op.in]:categoryIds}}
                });

                await platform.addCategories(selectedCategories);
            }
        }
        await platform.save();
        req.session.message={text:"Category is edited", class:"primary"}
        return res.redirect("/admin/platforms?action=update");
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }
        return res.render("admin/platform-edit",{
            title: "Edit Platform",
            platform: await Platform.findOne({where:{id: platformId},include:[{model:Category},{model: Email}]}),
            emails: await Email.findAll({where: {userId:userId}}),
            categories: await Category.findAll({where: {userId:userId}}),
            message: {text: errorMessage, class:"warning"},
        })
    }
}
exports.get_platform_delete=async (req,res)=>{
    const platrformId=req.params.platformId;
    try {
        const platform=await Platform.findByPk(platrformId);
        return res.render("admin/platform-delete",{
            title: "Delete Platform",
            platform: platform
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_platform_delete=async (req,res)=>{
    const platformId=req.body.platformId;
    const logo=req.body.logo;
    console.log("Logo:------------------->",logo)
    try {
        await Platform.destroy({where:{id: platformId}});
        await fs.unlink("./public/img/"+logo,err=>{
            console.log("**Logo couldn't delete",err);
        })
        req.session.message={text:"Category is deleted", class:"danger"}
        return res.redirect("/admin/platforms?action=delete");
    } catch (err) {
        console.log(err);
    }
}
exports.get_platforms=async (req,res)=>{
    try {
        const userId=req.session.userid;
        const platforms=await Platform.findAll({where:{userId:userId},include:[{model: Email},{model: Category}]});
        const categories=await Category.findAll({where: {userId:userId}});
        const msg=req.session.message;
        delete req.session.message;
        res.render("admin/platforms",{
            title: "Platforms",
            platforms: platforms,
            categories: categories,
            action: req.query.action,
            message: msg
        })
    } catch (err) {
        console.log(err);
    }
}

//category process
exports.get_category_create=async (req,res)=>{
    try {
        res.render("admin/category-create",{
            title: "Create Category"
        });
    } catch (err) {
        console.log(err);
    }
}
exports.post_category_create=async (req,res)=>{
    const userId=req.session.userid;
    const categoryName=req.body.categoryName;
    try {
        const newCategory=await Category.create({categoryName: categoryName, userId: userId});
        const newCategoryId=newCategory.id
        const categoryCode=await randomCodeGenerator("CAT",newCategoryId);//for category code
        newCategory.categoryCode=categoryCode;
        await newCategory.save();
        req.session.message={text:"New category is added", class:"success"}
        return res.redirect("/admin/categories?action=create");
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }
        return res.render("admin/category-create",{
            title: "Create Category",
            message: {text: errorMessage, class:"danger"},
            values:{
                categoryName: categoryName
            }
        });
    }
}
exports.get_category_edit=async (req,res)=>{
    const categoryId=req.params.categoryId;
    try {
        const category=await Category.findByPk(categoryId);
        return res.render("admin/category-edit",{
            title: "Edit Category",
            category: category
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_category_edit=async (req,res)=>{
    const categoryId=req.body.categoryId;
    const categoryName=req.body.categoryName;
    const categoryColor=req.body.categoryColor;

    try {
        await Category.update({categoryName: categoryName, categoryColor:categoryColor},{where:{id: categoryId}});
        req.session.message={text:"Category is edited", class:"primary"}
        return res.redirect("/admin/categories?action=edit");
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }

        return res.render("admin/category-edit",{
            title: "Edit Category",
            message: {text: errorMessage, class:"danger"},
            category: await Category.findByPk(categoryId)
        })
    }
}
exports.get_category_delete=async (req,res)=>{
    const categoryId=req.params.categoryId;
    try {
        const category=await Category.findByPk(categoryId);
        res.render("admin/category-delete",{
            title: "Delete Category",
            category: category
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_category_delete=async (req,res)=>{
    const categoryId= req.body.categoryId;
    try {
        await Category.destroy({where:{id:categoryId}});
        req.session.message={text:"Category is deleted", class:"danger"}
        return res.redirect("/admin/categories?action=delete");
    } catch (err) {
        console.log(err);
    }
}
exports.get_categories=async (req,res)=>{
    try {
        const userId=req.session.userid;
        const categories=await Category.findAll({where: {userId:userId},raw:true});
        const msg=req.session.message;
        delete req.session.message;
        res.render("admin/categories",{
            title: "Categories",
            categories: categories,
            action: req.query.action,
            message: msg

        })
    } catch (err) {
        console.log(err);
    }
}

//download process
exports.get_download=async(req,res)=>{
    const msg=req.session.message;
    delete req.session.message;
    try {
        res.render("admin/download",{
            title: "Download With Excel",
            message: msg
        })
    } catch (err) {
        console.log(err)
    }
}
exports.post_download=async(req,res)=>{
    //take the name for checking the value
    const fileToDownload=req.body.fileToDownload;
    const userId=req.session.userid;
    try {
        //check the value 
        if(fileToDownload=="categoriesForData" || fileToDownload=="categoriesForUpdate"){
            //and later take the information from database
            const categories=await Category.findAll({where:{userId: userId}, attributes:[ "categoryCode","categoryName"]});
            //after all run the excel function for download
            const downloadType=(fileToDownload=="categoriesForData") ? "forData":"forUpdate";
            exportExcel(downloadType,"categories",categories);
            req.session.message={text:"Excel file about categories is downloaded", class:"success"}

        }
        else if(fileToDownload=="categoriesForAdd"){
            const categories=await Category.findAll({attributes:["categoryName"]});
            exportExcel("forAddData","categories",categories);
            req.session.message={text:"Excel file about categories is downloaded", class:"success"};
        }
        else if(fileToDownload=="platformsForData" || fileToDownload=="platformsForUpdate"){

            const platforms=await Platform.findAll({where:{userId:userId}, attributes:["platformCode","platformName", "logo", "link", "userName", "password", "phone","recoveryMail", "recoveryCode"]});

            const downloadType=(fileToDownload=="platformsForData") ? "forData":"forUpdate"

            exportExcel(downloadType,"platforms",platforms);
            req.session.message={text:"Excel file about platforms is downloaded", class:"success"}

        }
        else if(fileToDownload=="platformsForAdd"){
            const platforms=await Platform.findAll({where:{userId:userId}, attributes:["platformName", "logo", "link", "userName", "password", "phone", "recoveryMail", "recoveryCode"]});
            exportExcel("forAddData","platforms",platforms);
            req.session.message={text:"Excel file about platforms is downloaded", class:"success"};
        }
        else if(fileToDownload=="emailsForData" || fileToDownload=="emailsForUpdate"){
            const emails=await Email.findAll({where:{userId: userId}, attributes:["emailCode","email"]});
            const downloadType=(fileToDownload=="emailsForData") ? "forData":"forUpdate";
            exportExcel(downloadType,"emails",emails);
            req.session.message={text:"Excel file about e-mails is downloaded", class:"success"}
        }
        else if(fileToDownload=="emailsForAdd"){
            const emails=await Email.findAll({where:{userId: userId}, attributes:["email"]});
            exportExcel("forAddData","emails",emails);
            req.session.message={text:"Excel file about e-mails is downloaded", class:"success"}
        }
        return res.redirect(`/admin/excel/download/`);
    } 
    catch (err) {
        console.log(err)
    }
}

//upload process
exports.get_upload=async(req,res)=>{
    const msg=req.session.message;
    try {
        delete req.session.message;
        res.render("admin/upload",{
            title: "upload With Excel",
            message: msg
        })
         
    } catch (err) {
        console.log(err)
    }
}
exports.post_upload=async(req,res)=>{
    const userId=req.session.userid;
    const processType=req.body.processType;
    const uploadForWhat=req.body.uploadForWhat;
    const excelFileName=req.body.excelFile;
    try {
        console.log("excelFileName--------------->",excelFileName)
        if(excelFileName==""){
            req.session.message={text:"Please choose your excel file.", class:"warning"}
        }
        else{
            if(processType=="updateDatas"){
                if(uploadForWhat=="1"/*platform*/){
                    const excelDatas= await uploadExcel("platforms",excelFileName);
    
                    for (const excelData of excelDatas) {
                        const platformCode=excelData[0];//platformCode value form excel
                         const platform=await Platform.findOne({where:{platformCode: platformCode}});
                         if(!platform){
                             continue
                         }
                         //values from excel
                         const platformName=excelData[1];
                         const logo=excelData[2];
                         const link=excelData[3];
                         const userName=excelData[4];
                         const password=excelData[5];
                         const phone=excelData[6];
                         const recoveryMail=excelData[7];
                         const recoveryCode=excelData[8];
    
                         //update data
                         platform.platformName=platformName;
                         platform.logo=logo;
                         platform.platformName=platformName;
                         platform.link=link;
                         platform.userName=userName;
                         platform.password=password;
                         platform.phone=phone;
                         platform.recoveryMail=recoveryMail;
                         platform.recoveryCode=recoveryCode;
    
                         await platform.save();
                    }
                    req.session.message={text:"Platforms are updated", class:"success"}
                    return res.redirect("/admin/platforms");
    
                }
                else if(uploadForWhat=="2"/*category*/){
                    const excelDatas= await uploadExcel("categories",excelFileName);
                    
                    for (const excelData of excelDatas) {
                        const categoryCode=excelData[0];//categoryCode value from excel
                        const category=await Category.findOne({where:{categoryCode: categoryCode}});
                        if(!category){
                            continue
                        }
                        //data from excel
                        const categoryNameFromExcel=excelData[1];
                        //update data
                        category.categoryName=categoryNameFromExcel;
                        await category.save();
                    }
                    req.session.message={text:"Categories are updated", class:"success"};
                    return res.redirect("/admin/categories");
    
                }
                else if(uploadForWhat=="3"/*email*/){
                    const excelDatas= await uploadExcel("emails",excelFileName);
    
                    for (const excelData of excelDatas) {
                        const emailCode=excelData[0];//emailCode value from excel
                        
                        //data of added with excel can be "object" Type so check it and then if data Type is "object" convert to "string" type
                        const emailValue = (typeof excelData[1] === 'string') ? excelData[1] : String(excelData[1].text);
    
                        const email=await Email.findOne({where:{emailCode: emailCode}});
                        if(!email){
                            continue
                        }
                        email.email=emailValue;
                        await email.save();
                    }
                    req.session.message={text:"Emails are updated", class:"success"};
                    return res.redirect("/admin/emails");
                }
                else{
                    req.session.message={text:"Please select which category you would like to change the file.", class:"warning"}
                }
            }
            else if(processType=="createData"){
                if(uploadForWhat=="1"/*platform*/){
                    const excelDatas=await uploadExcel("platforms",excelFileName);
    
                    for (const excelData of excelDatas) {
                        
                        //values from excel
                        const platformName=excelData[0];
                        const logo=excelData[1];
                        const link=excelData[2];
                        const userName=excelData[3];
                        const password=excelData[4];
                        const phone=excelData[5];
                        const recoveryMail=excelData[6];
                        const recoveryCode=excelData[7];
    
                        const platform= await Platform.create({platformName: platformName, logo: logo, link: link, userName: userName, password: password, phone:phone,recoveryMail: recoveryMail, recoveryCode: recoveryCode, userId: userId});
    
                        const platformCode= await randomCodeGenerator("PLT", platform.id);
    
                        platform.platformCode=platformCode;
                        await platform.save()
    
                    }
                    req.session.message={text:"New platforms are added", class:"success"};
                    return res.redirect("/admin/platforms")
                    
                }
                else if(uploadForWhat=="2"/*category*/){
                    const excelDatas=await uploadExcel("categories",excelFileName);
    
                    for (const excelData of excelDatas) {
                        const categoryName=excelData[0];
                        const category=await Category.create({categoryName: categoryName, userId: userId});
    
                        const categoryCode= await randomCodeGenerator("CAT", category.id);
    
                        category.categoryCode=categoryCode;
                        await category.save();
                    }
                    req.session.message={text:"New categories are added", class:"success"};
                    return res.redirect("/admin/categories");
                }
                else if(uploadForWhat=="3"/*email*/){
                    const excelDatas=await uploadExcel("emails",excelFileName);
    
                    for (const excelData of excelDatas) {
    
                        //data of added with excel can be "object" type so check it and if data type is "object" then convert to "string" type
                        const emailValue = (typeof excelData[0] === 'string') ? excelData[1] : String(excelData[0].text);
    
                        const email=await Email.create({email: emailValue, userId: userId});
    
                        const emailCode= await randomCodeGenerator("EM", email.id);
    
                        email.emailCode=emailCode;
                        await email.save();
                    }
                    req.session.message={text:"New emails are added", class:"success"};
                    return res.redirect("/admin/emails");
                }
                else{
                    req.session.message={text:"Please select which category you would like to change the file.", class:"warning"}
                }
            }
            else{
                req.session.message={text:"Please choose would you like  process type", class:"warning"}
            }
        }

        return res.redirect("/admin/excel/upload");
    } 
    catch (err) {
        console.log(err)
    }
}

//role process
exports.get_role_create=async (req,res)=>{
    try {
        res.render("admin/role-create",{
            title: "Create Role"
        });
    } catch (err) {
        console.log(err);
    }
}
exports.post_role_create=async (req,res)=>{
    const newroleName=req.body.roleName;
    try {
        await Role.create({rolename: newroleName});
        req.session.message={text:"New role is added", class:"success"}
        return res.redirect("/admin/roles?action=create");
    } catch (err) {
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }
        return res.render("admin/role-create",{
                    title: "Create Role",
                    message: {text: errorMessage, class: "danger"},
                    values:{
                        rolename: newroleName
                    }
                }); 
    }
}
exports.get_role_edit=async (req,res)=>{
    const roleId=req.params.roleId;
    try {
        const role=await Role.findOne({where:{id: roleId}, include:{model: User}});
        const count=await role.countUsers();
        if(role.id==1 || role.id==2){
            req.session.message={text:"This role con not be be edit", class:"warning"};
            return res.redirect("/admin/roles");
        }
        return res.render("admin/role-edit",{
            title: "Edit Role",
            role: role,
            count: count
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_role_edit=async (req,res)=>{
    const roleId=req.body.roleId;
    const updatedroleName=req.body.roleName;
    try {
        await Role.update({rolename: updatedroleName},{where:{id: roleId}});
        req.session.message={text:"Role is edited", class:"primary"}
        return res.redirect("/admin/roles?action=edit");
    } catch (err) {
        const role=await Role.findByPk(roleId);
        let errorMessage="";

        if(err.name=="SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
            for (const e of err.errors) {
                errorMessage += e.message + " ";
            }
        }
        else{
            errorMessage="Unknow error, please try again";
        }

        return res.render("admin/role-edit",{
            title: "Edit Role",
            role: role,
            count: await role.countUsers()
        })
    }
}
exports.get_role_delete=async (req,res)=>{
    const roleId=req.params.roleId;
    try {
        const role=await Role.findByPk(roleId);
        if(role.id==1 || role.id==2){
            req.session.message={text:"This role con not be be delete", class:"warning"};
            return res.redirect("/admin/roles");
        }
        res.render("admin/role-delete",{
            title: "Delete Role",
            role: role
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_role_delete=async (req,res)=>{
    const roleId= req.body.roleId;
    try {
        await Role.destroy({where:{id:roleId}});
        req.session.message={text:"Role is deleted", class:"danger"}
        return res.redirect("/admin/roles?action=delete");
    } catch (err) {
        console.log(err);
    }
}
exports.get_roles=async (req,res)=>{
    try {
        const roles=await Role.findAll();
        const msg=req.session.message;
        const isPriv=req.session.isPriv;
        console.log(isPriv);
        delete req.session.message;
        res.render("admin/Roles",{
            title: "Roles",
            roles: roles,
            action: req.query.action,
            message: msg

        })
    } catch (err) {
        console.log(err);
    }
}

//user process
exports.get_user_edit=async (req,res)=>{
    const userId=req.params.userId;
    const msg=req.session.message;
    delete req.session.message;
    try {
        const user=await User.findOne({where:{id: userId}, include:{model: Role}});
        const roles=await Role.findAll();
        if(user.id==1){
            req.session.message={text:"This user can not be be edit", class:"warning"};
            return res.redirect("/admin/users");
        }
        res.render("admin/user-edit",{
            title: "Edit User",
            user: user,
            roles: roles,
            message: msg,
            action:req.params.action,
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_user_edit=async (req,res)=>{
    const userId=req.body.userId;
    const roleIds=req.body.roles;
    
    try {
        const user=await User.findOne({where:{id: userId},include:{model: Role}});
        if(user){

            if(roleIds==undefined){
                await user.removeRoles(user.roles);
            }else{
                await user.removeRoles(user.roles);
                const selectedRoles=await Role.findAll({
                    where:{id:{[Op.in]:roleIds}}
                });

                await user.addRoles(selectedRoles);
            }
        }
        await user.save();
        req.session.message={text:"User is edited", class:"primary"}
        return res.redirect("/admin/users?action=update");
    } catch (err) {
        console.log(err);
    }
}
exports.get_user_delete=async (req,res)=>{
    const userId=req.params.userId;
    try {
        const user=await User.findByPk(userId);
        if(user.id==1){
            req.session.message={text:"This user can not be be delete", class:"warning"};
            return res.redirect("/admin/users");
        }
        return res.render("admin/user-delete",{
            title: "Delete user",
            user: user
        })
    } catch (err) {
        console.log(err);
    }
}
exports.post_user_delete=async (req,res)=>{
    const userId=req.body.userId;
    try {
        await User.destroy({where:{id: userId}});
        req.session.message={text:"User is deleted", class:"danger"}
        return res.redirect("/admin/users?action=delete");
    } catch (err) {
        console.log(err);
    }
}
exports.get_users=async (req,res)=>{
    try {
        const users=await User.findAll({include:{model: Role}});
        const msg=req.session.message;
        delete req.session.message;
        res.render("admin/users",{
            title: "Users",
            users: users,
            action: req.query.action,
            message: msg
        })
    } catch (err) {
        console.log(err);
    }
}