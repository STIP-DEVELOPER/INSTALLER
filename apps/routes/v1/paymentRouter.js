"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
// import { middleware } from '../../middlewares'
const payment_1 = require("../../controllers/payment");
const paymentRoutes = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1/payment', router);
    router.post('/', async (req, res) => await payment_1.paymentController.snap(req, res));
    router.post('/webhooks', async (req, res) => await payment_1.paymentController.webhooks(req, res));
};
exports.paymentRoutes = paymentRoutes;
