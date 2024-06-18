"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTotal = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const products_1 = require("../../models/products");
const orders_1 = require("../../models/orders");
const transactions_1 = require("../../models/transactions");
const user_1 = require("../../models/user");
const findTotal = async (req, res) => {
    try {
        const totalProduct = await products_1.ProductModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalOrder = await orders_1.OrdersModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalTransaction = await transactions_1.TransactionsModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const totalCustomer = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userRole: { [sequelize_1.Op.eq]: 'user' }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = { totalProduct, totalOrder, totalTransaction, totalCustomer };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findTotal = findTotal;
