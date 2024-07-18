"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jasaController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.jasaController = {
    create: create_1.createJasa,
    findAll: find_1.findAllJasa,
    findOne: find_1.findDetailJasa,
    remove: remove_1.removeJasa,
    update: update_1.updateJasa
};
