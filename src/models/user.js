"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class userStore {
    async index() {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw Error(`error in getting users from database - ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
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
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await db_1.default.connect();
            const hash = bcrypt_1.default.hashSync(s.password + BCRYPT_PASSWORD?.trim(), Number(SALT_ROUNDS));
            const result = await conn.query(sql, [s.firstname, s.lastname, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const user = result.rows[0];
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(firstname, lastname, password) {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM users where firstname=($1) AND lastname=($2)';
            const result = await conn.query(sql, [firstname, lastname]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                const validPassword = bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password);
                if (validPassword) {
                    return user;
                }
                return undefined;
            }
        }
        catch (error) {
            throw Error(`error in getting user from database - ${error}`);
        }
    }
}
exports.userStore = userStore;
