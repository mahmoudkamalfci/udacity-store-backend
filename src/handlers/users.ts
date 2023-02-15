import express, { Request, Response } from 'express'
import { user, userStore } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new userStore()
const {TOKEN_SECRET} = process.env
const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
   } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const studentClass = await store.show(req.params.id)
        res.json(studentClass)
     } catch(err) {
        res.status(400)
        res.json(err)
    }
 }

 const create = async (req: Request, res: Response) => {
     try {
         const user: user = {
             firstname: req.body.firstname,
             lastname: req.body.lastname,
             password: req.body.password
         }
         
         
         const newuser = await store.create(user)
         var token = jwt.sign({ user: newuser }, TOKEN_SECRET as string);
         newuser.password = token
         res.json(newuser)
        //  res.json(token)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }

 const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.params.id)
        if(deleted) {
            res.json(deleted.id)
        } else {
            res.status(401).send("the user not exists")
        }
     } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.firstname, user.lastname, user.password)
        if(u != undefined) {
            var token = jwt.sign({ user: u }, TOKEN_SECRET as string);
            res.json(token)
        } else {
            res.status(401).send("invalid credentials" )
        }
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

const userRoutes = (app: express.Application) => {
    app.get('/users/authenticate', authenticate)
    app.get('/users', verifyAuthToken ,index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users' ,create)
    app.delete('/users/:id',verifyAuthToken ,destroy)
}


  export default userRoutes
