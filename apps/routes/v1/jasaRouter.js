"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jasaRouters = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const jasa_1 = require("../../controllers/jasa");
const jasaRouters = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/jasa', middlewares_1.middleware.useAuthorization, router);
    router.get('/', async (req, res) => await jasa_1.jasaController.findAll(req, res));
    router.get('/detail/:jasaId', async (req, res) => await jasa_1.jasaController.findOne(req, res));
    router.post('/', async (req, res) => await jasa_1.jasaController.create(req, res));
    router.patch('/', async (req, res) => await jasa_1.jasaController.update(req, res));
    router.delete('/', async (req, res) => await jasa_1.jasaController.remove(req, res));
};
exports.jasaRouters = jasaRouters;
