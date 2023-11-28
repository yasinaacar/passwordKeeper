const express=require("express");
const router=express.Router();

const imageUpload=require("../helpers/imageUpload");
const isAuth=require("../middlewares/isAuth"); //for direction control
const isAdmin=require("../middlewares/isAdmin"); //for access control


const adminController=require("../controllers/adminController");

//email pages
router.get("/email/create", isAuth,adminController.get_email_create);
router.post("/email/create", isAuth,adminController.post_email_create);
router.get("/email/edit/:emailId", isAuth,adminController.get_email_edit);
router.post("/email/edit/:emailId", isAuth,adminController.post_email_edit);
router.get("/email/delete/:emailId", isAuth,adminController.get_email_delete);
router.post("/email/delete/:emailId", isAuth,adminController.post_email_delete);
router.get("/emails", isAuth,adminController.get_emails);

//platform pages
router.get("/platform/create/", isAuth,adminController.get_platform_create);
router.post("/platform/create/",imageUpload.upload.single("logo"), isAuth,adminController.post_platform_create);
router.get("/platform/edit/:platformId", isAuth,adminController.get_platform_edit);
router.post("/platform/edit/:platformId",imageUpload.upload.single("logo"), isAuth,adminController.post_platform_edit);
router.get("/platform/delete/:platformId", isAuth,adminController.get_platform_delete);
router.post("/platform/delete/:platformId", isAuth,adminController.post_platform_delete);
router.get("/platforms", isAuth,adminController.get_platforms);

//category pages
router.get("/category/create", isAuth,adminController.get_category_create);
router.post("/category/create", isAuth,adminController.post_category_create);
router.get("/category/edit/:categoryId", isAuth,adminController.get_category_edit);
router.post("/category/edit/:categoryId", isAuth,adminController.post_category_edit);
router.get("/category/delete/:categoryId", isAuth,adminController.get_category_delete);
router.post("/category/delete/:categoryId", isAuth,adminController.post_category_delete);
router.get("/categories", isAuth,adminController.get_categories);

//download pages
router.get("/excel/download/", isAuth,adminController.get_download);
router.post("/excel/download/", isAuth,adminController.post_download);

//upload pages
router.get("/excel/upload/", isAuth,adminController.get_upload);
router.post("/excel/upload/", isAuth,adminController.post_upload);

//role pages-(Admin)
router.get("/role/create", isAuth, isAdmin,adminController.get_role_create);
router.post("/role/create", isAuth, isAdmin,adminController.post_role_create);
router.get("/role/edit/:roleId", isAuth, isAdmin,adminController.get_role_edit);
router.post("/role/edit/:roleId", isAuth, isAdmin,adminController.post_role_edit);
router.get("/role/delete/:roleId", isAuth, isAdmin,adminController.get_role_delete);
router.post("/role/delete/:roleId", isAuth, isAdmin,adminController.post_role_delete);
router.get("/roles", isAuth, isAdmin,adminController.get_roles);

//user pages-(Admin)
router.get("/user/edit/:userId", isAuth, isAdmin,adminController.get_user_edit);
router.post("/user/edit/:userId", isAuth, isAdmin,adminController.post_user_edit);
router.get("/user/delete/:userId", isAuth, isAdmin,adminController.get_user_delete);
router.post("/user/delete/:userId", isAuth, isAdmin,adminController.post_user_delete);
router.get("/users", isAuth, isAdmin,adminController.get_users);



//export router to for the other pages
module.exports=router;