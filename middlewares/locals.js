function locals(req,res,next){
    res.locals.isAuth=req.session.isAuth;
    res.locals.fullname=req.session.fullname;
    res.locals.isAdmin=req.session.roles ? req.session.roles.includes("Admin") : false;
    next();
}

module.exports=locals;