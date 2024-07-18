"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhooksTransaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const transactions_1 = require("../../models/transactions");
const webhooksTransaction = async (req, res) => {
    const requestBody = req.body;
    try {
        const result = await transactions_1.TransactionsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                transactionId: { [sequelize_1.Op.eq]: requestBody.transaction_id }
            }
        });
        const transactionPayload = {
            ...(requestBody.va_numbers.length > 0 && {
                transactionVirtualAccount: requestBody.va_numbers[0].va_number + ':' + requestBody.va_numbers[0].bank
            }),
            ...(requestBody.gross_amount.length > 0 && {
                transactionPrice: requestBody.gross_amount
            }),
            ...(requestBody.payment_type.length > 0 && {
                transactionPymenType: requestBody.payment_type
            }),
            ...(requestBody.expiry_time.length > 0 && {
                transactionExpiryTime: requestBody.expiry_time
            })
        };
        if (result == null) {
            await transactions_1.TransactionsModel.create(transactionPayload);
        }
        else {
            await transactions_1.TransactionsModel.update(transactionPayload, {
                where: {
                    deleted: { [sequelize_1.Op.eq]: 0 },
                    transactionId: { [sequelize_1.Op.eq]: requestBody.transaction_id }
                }
            });
        }
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.webhooksTransaction = webhooksTransaction;
