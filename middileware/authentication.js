const jwt = require("jsonwebtoken")
require("dotenv").config();


const authentication = (req,res,next) => {
    if(!req.headers.authorization){
        return res.send("Please login again")
    }
    else{
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,process.env.secret_key, function(err,decoded){
        if(err){
            res.send('please login')
        }
        else{
            req.body.userId = decoded.userId;
            next();
        }
    })
    }
}

module.exports = {authentication}