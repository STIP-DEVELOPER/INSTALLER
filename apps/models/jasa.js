"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JasaModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.JasaModel = _1.sequelize.define('jasa', {
    ...zygote_1.ZygoteModel,
    jasaId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)()
    },
    jasaName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    jasaDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    jasaPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: 'jasa',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
