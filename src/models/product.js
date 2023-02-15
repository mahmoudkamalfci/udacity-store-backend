"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const db_1 = __importDefault(require("../db"));
// const {
//     BCRYPT_PASSWORD,
//     SALT_ROUNDS
// } = process.env 
class productStore {
    async index() {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw Error(`error in getting products from database - ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
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
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn
                .query(sql, [s.name, s.price, s.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const product = result.rows[0];
            return product.id;
        }
        catch (err) {
            throw new Error(`Could not delete student ${id}. Error: ${err}`);
        }
    }
}
exports.productStore = productStore;
