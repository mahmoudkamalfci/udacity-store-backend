import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const {TOKEN_SECRET} = process.env 

 const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, TOKEN_SECRET as string)

            if(decoded) {
                next()
            } else {
                res.status(401).send("Invalid Token")
            }
        } else {
            res.status(401).send("Token Is Required")
        }
    } catch (error) {
        res.status(401).send("Invalid Token")
    }
}

export default verifyAuthToken