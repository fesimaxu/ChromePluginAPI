"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.VideoSchema = new mongoose_1.Schema({
    filename: {
        type: String,
        required: true,
    },
    video: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)(`Video`, exports.VideoSchema);
