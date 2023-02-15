import express, { Request, Response } from 'express'
import { order,order_product, orderStore } from '../models/order'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new orderStore()
const {TOKEN_SECRET} = process.env
const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
   } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.id)
        res.json(order)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
 }

 const create = async (req: Request, res: Response) => {
     try {
         const order: order = {
             user_id: req.body.user_id,
             order_status: req.body.order_status
         }

         const newOrder = await store.create(order)

         res.json(newOrder)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }

 const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    if(deleted) {
        res.json("deleted")
    } else {
        res.status(401).send("the order not exists")
    }
}

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const order = await store.getCurrentOrderByUser(Number(req.params.id))
        res.json(order)
     } catch(err) {
        res.status(400)
        res.json(err)
    }
 }

 const addProductToCart = async (req: Request, res: Response) => {
    try {
        const order_product: order_product = {
            order_id: Number(req.body.order_id),
            product_id: Number(req.body.product_id),
            quantity: Number(req.body.quantity)
        }

        const newOrderProduct = await store.addToCart(order_product)

        res.json(newOrderProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
 }

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken ,index)
    app.get('/orders/:id', verifyAuthToken, show)
    app.post('/orders', verifyAuthToken,create)
    app.delete('/orders/:id',verifyAuthToken ,destroy)
    app.get('/userOrders/:id', verifyAuthToken, getCurrentOrderByUser)
    app.post('/addtocart', verifyAuthToken, addProductToCart)
}


  export default orderRoutes
