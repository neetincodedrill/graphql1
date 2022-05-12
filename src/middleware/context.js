const jwt = require('jsonwebtoken');
const User = require("../models/user");

const context = async(req,res,next) => {
    const token =  req.headers["authorization"];
  
    //check json web token exits and its verified
    if(!token) return res.status(403).send('A token is required for authentication')
    try{
        const decode =await jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({ _id : decode.id})
        req.user = user
        console.log(user)
        return true
    }catch(error){
        res.status(401).send('Invalid token')
        return false
    }
}

module.exports = context 