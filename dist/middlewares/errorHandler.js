"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    (0, response_1.sendErrorResponse)(res, 500, err);
};
exports.default = errorHandler;
