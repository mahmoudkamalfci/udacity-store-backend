"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
let token;
const { BCRYPT_PASSWORD, SALT_ROUNDS, ENV } = process.env;
const store = new user_1.userStore();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add an user ' + ENV, async () => {
        const newuser = {
            firstname: "mahmoud",
            lastname: 'mahmoud',
            password: "mahmoud"
        };
        const result = await store.create(newuser);
        const validPassword = bcrypt_1.default.compareSync(newuser.password + BCRYPT_PASSWORD, result.password);
        expect(validPassword).toBe(true);
    });
    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        jasmine.objectContaining({
            firstname: "mahmoud",
            lastname: 'mahmoud',
        });
    });
});
describe("make sure all user endpoints working correct", () => {
    // test /api endpoint response status
    const request = (0, supertest_1.default)(server_1.default);
    it('make sure user is authenticate', async () => {
        const response = await request.get('/users/authenticate').send({
            firstname: "mahmoud",
            lastname: "mahmoud",
            password: "mahmoud"
        });
        expect(response.status).toBe(200);
        token = response.body;
    });
    it('return all users from api', async () => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('create user endpoint', async () => {
        const response = await request.post('/users/').set('Authorization', 'Bearer ' + token).send({
            "firstname": "mahmoud",
            "lastname": "mahmoud",
            "password": "mahmoud"
        });
        expect(response.status).toBe(200);
    });
    it('return user by id from api', async () => {
        const response = await request.get('/users/1').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
