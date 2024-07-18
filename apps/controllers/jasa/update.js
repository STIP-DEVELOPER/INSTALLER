"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJasa = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const jasa_1 = require("../../models/jasa");
const updateJasa = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['jasaId'],
        requestData: requestBody
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const result = await jasa_1.JasaModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                jasaId: { [sequelize_1.Op.eq]: requestBody.jasaId }
            }
        });
        if (result == null) {
            const message = 'not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const newData = {
            ...(requestBody.jasaName.length > 0 && {
                jasaName: requestBody.jasaName
            }),
            ...(requestBody.jasaDescription.length > 0 && {
                jasaDescription: requestBody.jasaDescription
            }),
            ...(requestBody.jasaPrice.toString().length > 0 && {
                jasaPrice: requestBody.jasaPrice
            })
        };
        await jasa_1.JasaModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                jasaId: { [sequelize_1.Op.eq]: requestBody.jasaId }
            }
        });
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
exports.updateJasa = updateJasa;
