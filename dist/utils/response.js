"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessfulResponse = void 0;
const sendSuccessfulResponse = (res, statusCode, data, message = `video uploaded successfully`) => {
    res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        success: true,
    });
};
exports.sendSuccessfulResponse = sendSuccessfulResponse;
const sendErrorResponse = (res, statusCode = 500, data, message = `error ! request failed`) => {
    console.log("data", data);
    if ((data.code = 11000)) {
        return res.status(statusCode).json({
            message: message,
            status: statusCode,
            data: data,
            error: true,
        });
    }
    return res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        error: true,
    });
};
exports.sendErrorResponse = sendErrorResponse;
