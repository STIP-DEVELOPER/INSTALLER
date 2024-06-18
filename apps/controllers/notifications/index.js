"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const create_1 = require("./create");
const find_1 = require("./find");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.notificationController = {
    create: create_1.createNotification,
    findAll: find_1.findAllNotification,
    findOne: find_1.findDetailNotification,
    remove: remove_1.removeNofication,
    update: update_1.updateNotification
};
