"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const find_1 = require("./find");
const login_1 = require("./login");
const update_1 = require("./update");
exports.adminController = {
    find: find_1.findAdmin,
    update: update_1.updateAdmin,
    login: login_1.login
};
