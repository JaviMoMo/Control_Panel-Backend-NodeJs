const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const register = async (req, res, next) => {
    try {
        const newUser = new User();
        newUser.userName = req.body.userName;
        newUser.email = req.body.email;
        newUser.pass = req.body.pass;
        newUser.fullName = req.body.fullName;
        newUser.categories = [];

        const userDb = await newUser.save();

        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: null
        });
    } catch (err) {
        return next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const userInfo = await User.findOne({email: req.body.email})
        if (bcrypt.compareSync(req.body.pass, userInfo.pass)) {
            userInfo.pass = null
            const token = jwt.sign(
                {
                    id: userInfo._id,
                    userName: userInfo.userName
                },
                req.app.get("secretKey"),
                { expiresIn: "1h" }
            );
            return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { user: userInfo, token: token},
            });
        } else {
            return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
        }
    } catch (err) {
        return next(err);
    }
}

const logout = (req, res, next) => {
    try {
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            token: null
        });
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    register,
    login,
    logout
}
/* 
"email": "kavi@gmailc.om",
    "pass": "123456sasa", */