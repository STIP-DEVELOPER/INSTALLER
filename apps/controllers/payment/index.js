"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const snap_1 = require("./snap");
const webhooks_1 = require("./webhooks");
exports.paymentController = {
    snap: snap_1.createSnap,
    webhooks: webhooks_1.webhooks
};
