//homepage process
exports.get_homepage=async (req, res)=>{
    try {
       return res.render("user/index",{
        title: "Homepage"
       });
    } catch (err) {
        console.log(err)
    }
}