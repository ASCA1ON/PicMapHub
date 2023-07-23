var jwt = require('jsonwebtoken');
const HttpError = require("../model/http-error")


module.exports = (req,res,next)=>{
    if(req.method=='OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(" ")[1]   //! header are case in sensitive and auth has 2 values = "Bearer token"
        if(!token){
            throw new Error('Authentication failed!')
        }
        const decodedToken = jwt.verify(token,'this_is_a_sceret')
        req.userData = {userId:decodedToken.userId}
        next()
    }catch(err){
        return next(new HttpError(err+' Authentication failed!',401))
    }
}