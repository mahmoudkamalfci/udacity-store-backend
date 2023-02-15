import express, { Request, Response } from 'express'
import { product, productStore } from '../models/product'
import verifyAuthToken from '../middleware/verifyAuthToken'
import supertest from 'supertest';


const store = new productStore()

const index = async (_req: Request, res: Response) => {

    try {
        const products = await store.index()
        res.json(products)
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
         const product: product = {
             name: req.body.name,
             price: req.body.price,
             category: req.body.category
         }

         
         const newProduct = await store.create(product)
         res.json(newProduct)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }

 const destroy = async (req: Request, res: Response) => {

    try {
        const deleted = await store.delete(req.params.id)
        res.json(deleted.id)
     } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products' ,index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken,create)
    app.delete('/products/:id',verifyAuthToken ,destroy)
}


  export default productRoutes
