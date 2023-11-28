const express=require("express");
const userController = require("../controllers/userController");

const router=express.Router();


router.get("/", userController.get_homepage);

module.exports=router;