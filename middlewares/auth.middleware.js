const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.json({
            status: 401,
            message: HTTPSTATUSCODE[401],
            data: null
        })
    }

    const splits = authorization.split(" ")
    if(splits.length!=2 || splits[0]!="Bearer"){
        return res.json({
            status: 400,
            message: HTTPSTATUSCODE[400],
            data: null
        })
    }

    const jwtString = splits[1];
    try{
        var token = jwt.verify(jwtString, req.app.get("SecretKey"));
    } catch(err){
        return next(err)
    }

    const authority = {
        id: token.id,
        userName: token.userName
    }

    req.authority = authority
    next()
}

module.exports = {
    isAuth
}
