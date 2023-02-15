"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const db_1 = __importDefault(require("../db"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class orderStore {
    async index() {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw Error(`error in getting orders from database - ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find class ${id}. Error: ${err}`);
        }
    }
    async create(s) {
        try {
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [s.user_id, s.order_status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const order = result.rows[0];
            return order.id;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
    async getCurrentOrderByUser(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find class ${id}. Error: ${err}`);
        }
    }
    async addToCart(p) {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [p.order_id, p.product_id, p.quantity]);
            const order_product = result.rows[0];
            conn.release();
            return order_product;
        }
        catch (err) {
            throw new Error(`Could not add new product to order. Error: ${err}`);
        }
    }
}
exports.orderStore = orderStore;
