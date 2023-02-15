"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new order_1.orderStore();
const { TOKEN_SECRET } = process.env;
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            order_status: req.body.order_status
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.params.id);
    if (deleted) {
        res.json("deleted");
    }
    else {
        res.status(401).send("the order not exists");
    }
};
const getCurrentOrderByUser = async (req, res) => {
    try {
        const order = await store.getCurrentOrderByUser(Number(req.params.id));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProductToCart = async (req, res) => {
    try {
        const order_product = {
            order_id: Number(req.body.order_id),
            product_id: Number(req.body.product_id),
            quantity: Number(req.body.quantity)
        };
        const newOrderProduct = await store.addToCart(order_product);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', verifyAuthToken_1.default, index);
    app.get('/orders/:id', verifyAuthToken_1.default, show);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.delete('/orders/:id', verifyAuthToken_1.default, destroy);
    app.get('/userOrders/:id', verifyAuthToken_1.default, getCurrentOrderByUser);
    app.post('/addtocart', verifyAuthToken_1.default, addProductToCart);
};
exports.default = orderRoutes;
