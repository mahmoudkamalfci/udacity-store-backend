"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_SECRET } = process.env;
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
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
exports.default = verifyAuthToken;
