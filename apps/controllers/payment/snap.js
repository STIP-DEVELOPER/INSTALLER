"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnap = void 0;
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const requestCheker_1 = require("../../utilities/requestCheker");
const response_1 = require("../../utilities/response");
const createSnap = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['orderProductId', 'orderProductPrice', 'orderUserName'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `Invalid request parameter! Require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        requestBody.orderId = (0, uuid_1.v4)();
        const serverKey = 'SB-Mid-server-2scopkThN40PPnVqpWnjmDDf';
        const authToken = Buffer.from(`${serverKey}:`).toString('base64');
        const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
        const data = {
            transaction_details: {
                order_id: requestBody.orderProductId,
                gross_amount: requestBody.orderProductPrice
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: requestBody.orderUserName
            }
        };
        const response = await axios_1.default.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${authToken}`
            }
        });
        console.log(response);
        const result = response.data;
        const responseData = response_1.ResponseData.default;
        responseData.data = result;
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(responseData);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.createSnap = createSnap;
