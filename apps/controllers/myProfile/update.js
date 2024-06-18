"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const requestCheker_1 = require("../../utilities/requestCheker");
const configs_1 = require("../../configs");
const user_1 = require("../../models/user");
const updateMyProfile = async (req, res) => {
    const requestBody = req.body;
    const emptyField = (0, requestCheker_1.requestChecker)({
        requireList: ['x-user-id'],
        requestData: req.headers
    });
    if (emptyField.length > 0) {
        const message = `invalid request parameter! require (${emptyField})`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        if ('userPassword' in requestBody) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            requestBody.userPassword = require('crypto')
                .createHash('sha1')
                .update(requestBody.userPassword + configs_1.CONFIG.secret.passwordEncryption)
                .digest('hex');
        }
        const newData = {
            ...(requestBody.userName.length > 0 && {
                userName: requestBody.userName
            }),
            ...(requestBody.userEmail.length > 0 && {
                userEmail: requestBody.userEmail
            }),
            ...(requestBody.userPassword.length > 0 && {
                userPassword: requestBody.userPassword
            }),
            ...(requestBody.userRole.length > 0 && {
                userRole: requestBody.userRole
            })
        };
        await user_1.UserModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.header('x-user-id') }
            }
        });
        const response = response_1.ResponseData.default;
        response.data = { message: 'success' };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error.message);
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.updateMyProfile = updateMyProfile;
