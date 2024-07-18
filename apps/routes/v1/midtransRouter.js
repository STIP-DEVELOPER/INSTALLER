"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const paymentRoutes = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/payment', middlewares_1.middleware.useAuthorization, router);
    router.get('/', async (req, res) => await transactionController.findAll(req, res));
    router.get('/detail/:transactionId', async (req, res) => await transactionController.findOne(req, res));
    router.post('/', async (req, res) => await transactionController.create(req, res));
    router.patch('/', async (req, res) => await transactionController.update(req, res));
    router.delete('/', async (req, res) => await transactionController.remove(req, res));
};
exports.paymentRoutes = paymentRoutes;
