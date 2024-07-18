"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeJasa = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const jasa_1 = require("../../models/jasa");
const removeJasa = async (req, res) => {
    const requestQuery = req.query;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['jasaId'],
        requestData: requestQuery
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
                jasaId: { [sequelize_1.Op.eq]: requestQuery.jasaId }
            }
        });
        if (result == null) {
            const message = 'jasa not found!';
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        result.deleted = 1;
        void result.save();
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
exports.removeJasa = removeJasa;
