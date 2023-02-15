"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new user_1.userStore();
const { TOKEN_SECRET } = process.env;
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const studentClass = await store.show(req.params.id);
        res.json(studentClass);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const newuser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newuser }, TOKEN_SECRET);
        newuser.password = token;
        res.json(newuser);
        //  res.json(token)
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.params.id);
        if (deleted) {
            res.json(deleted.id);
        }
        else {
            res.status(401).send("the user not exists");
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.firstname, user.lastname, user.password);
        if (u != undefined) {
            var token = jsonwebtoken_1.default.sign({ user: u }, TOKEN_SECRET);
            res.json(token);
        }
        else {
            res.status(401).send("invalid credentials");
        }
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const userRoutes = (app) => {
    app.get('/users/authenticate', authenticate);
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', verifyAuthToken_1.default, show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken_1.default, destroy);
};
exports.default = userRoutes;
