const express=require("express");
const router=express.Router();

const authController=require("../controllers/authController");

//register-sign up pages
router.get("/register",authController.get_register);
router.post("/register",authController.post_register);

//login pages
router.get("/login",authController.get_login);
router.post("/login",authController.post_login);
router.get("/logout",authController.get_logout);

//reset password pages
router.get("/reset-password", authController.get_resetPassword);
router.post("/reset-password", authController.post_resetPassword);

//new pasword pages
router.get("/new-password/:token", authController.get_newPassword);
router.post("/new-password", authController.post_newPassword);


//exports router to for the other pages 
module.exports=router;
