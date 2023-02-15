"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var token = authorizationHeader.split(' ')[1];
            var decoded = jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
            if (decoded) {
                next();
            }
            else {
                res.status(401).send("Invalid Token");
            }
        }
        else {
            res.status(401).send("Token Is Required");
        }
    }
    catch (error) {
        res.status(401).send("Invalid Token");
    }
};
exports["default"] = verifyAuthToken;
