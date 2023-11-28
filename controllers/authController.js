const User=require("../models/user");
const bcrypt=require("bcrypt");
const sendMail=require("../helpers/mailSend");
const config = require("../config");
const Role = require("../models/roles");
const crypto=require("crypto");
const {Op}=require("sequelize");

//register-sign up process
exports.get_register=async (req,res)=>{
    const msg= req.session.message;
    delete req.session.message;
    try {
        return res.render("auth/register",{
            title:"Register",
            message: msg
        });
    } catch (err) {
        console.log(err)
    }
}
exports.post_register=async (req,res)=>{
    const fullName=req.body.fullName;
    const email=req.body.email;
    const password=req.body.password;
    const passwordAgain=req.body.passwordAgain;
    try {
        
        if(passwordAgain != password){
            return res.redirect("/auth/register");
        }
        const hashPassword=await bcrypt.hash(password, 10);//encrypt passsword
        const user=await User.create({fullName:fullName, email:email, password: hashPassword});
        const userRole=await Role.findOne({where: {rolename: "User"}});
        await user.setRoles(userRole);
        await sendMail.sendMail({
            from: config.email.from,
            to: user.email,
            subject: "Welcome to passwordKeeper",
            html: "<h4>Hi, welcome to passwordKepper, your all passwords is together now ;)</h4>",
        })
        req.session.isAuth=true; //for login automaticly
        req.session.fullname=user.fullName;
        req.session.userid=user.id;
        return res.redirect("/");
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
        return res.render("auth/register",{
            title:"Register",
            message: {text: errorMessage, class:"warning"},
            values:{
                fullName: fullName,
                email: email
            }
        });
    }
}

//login process
exports.get_login=async (req,res)=>{
    try {
        const msg=req.session.message;
        delete req.session.message;
        res.render("auth/login",{
            title:"Login",
            message: msg
        });
    } catch (err) {
        console.log(err)
    }
}
exports.post_login=async (req,res)=>{
    const url=req.query.returnUrl || "/";//if any user try to access any page without login, take the url for automatic direct
    const inputErrorUrl=`/auth/login`;//when user input is false directed to login page 
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({where:{email: email}});

    try {
        if(email=="" || email==undefined){
            req.session.message={text:"E-mail can not be empty", class:"warning"}
            return res.redirect(inputErrorUrl);
        
        }
        if(password=="" || password==undefined){
            req.session.message={text:"Password can not be empty", class:"warning"}
            return res.redirect(inputErrorUrl);
        
        }
        if(!user){
            req.session.message={text:"This email is not exist on the system, u can go register page", class:"danger"}
            return res.redirect(inputErrorUrl);
        }

        const match= await bcrypt.compare(password, user.password);//

        if(match){
            const userRoles=await user.getRoles({
                attributes: ["rolename"],
                raw:true
            })
            req.session.isAuth=true;
            req.session.fullname=user.fullName;
            req.session.userid=user.id;
            req.session.roles=userRoles.map((role)=> role["rolename"]);
            req.session.isAdmin="admin";
        }
        else{
            req.session.message={text:"check the informations", class:"danger"}
            return res.redirect(inputErrorUrl);
        }
        
        return res.redirect(url);
    } catch (err) {
        console.log(err)
    }
}

//logout process
exports.get_logout=async (req,res)=>{
    try {
        await req.session.destroy()
        return res.redirect("/auth/login")
        
    } catch (err) {
        console.log(err)
    }
}

//reset password process
exports.get_resetPassword=async (req,res)=>{
    const msg= req.session.message;
    delete req.session.message;
    try {
        return res.render("auth/reset-password",{
            title: "Reset Password",
            message: msg
        });
    } catch (err) {
        console.log(err)
    }
}

exports.post_resetPassword=async (req,res)=>{
    const email=req.body.email;
    try {
        const user=await User.findOne({where: {email:email}});

        if(!user){
            req.session.message={text:"E-mail is not exist", class:"danger"};
            return res.redirect("/auth/login")
        }

        let token= await crypto.randomBytes(32).toString("hex");//create special code for user
        user.token=token;
        user.tokenExpirations= Date.now() + (1000*60*60);
        user.save();   
        await sendMail.sendMail({
            from: config.email.from,
            to: user.email,
            subject: "Reset Password",
            html: `<h4>You can update your password by clicking the link</h4><br><a href="http://127.0.0.1:3000/auth/new-password/${token}">Reset Password</a>`,
        });

        req.session.message={text:"We are sended you mail, check your mail", class:"warning"};
        return res.redirect("/auth/reset-password")
        
        
    } catch (err) {
        console.log(err)
    }
}


//new password process
exports.get_newPassword=async (req,res)=>{
    const token=req.params.token;
    try {
        const user=await User.findOne({where:{token: token}});
        return res.render("auth/new-password",{
            title: "New Password",
            user: user,
            token: token
        });
    } catch (err) {
        console.log(err)
    }
}

exports.post_newPassword=async (req,res)=>{
    const userId=req.body.userId;
    const token=req.body.token;
    const password=req.body.password;
    try {
        const user=await User.findOne({where:{token: token, tokenExpirations:{[Op.gt]: Date.now()}, id:userId}});
        const hashedPassword=await bcrypt.hash(password,10);
        user.password=hashedPassword;
        user.token=null;
        user.tokenExpirations=null;
        await user.save();
        req.session.message={text:"Password is updated you can login your account now", class:"success"};
        return res.redirect("/auth/login");
        
    } catch (err) {
        console.log(err)
    }
}

