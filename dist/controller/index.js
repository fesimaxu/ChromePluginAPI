"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleVideo = exports.deleteAllVideo = exports.searchVideo = exports.getSingleVideo = exports.getAllVideos = exports.updloadVideoController = exports.gethealthCheckController = void 0;
const streamifier_1 = __importDefault(require("streamifier"));
const model_1 = __importDefault(require("../model"));
const response_1 = require("../utils/response");
const cloudinary = require("cloudinary").v2;
const gethealthCheckController = (req, res, next) => {
    res.send(`Chrome Plugin API Running at PORT 5505`);
};
exports.gethealthCheckController = gethealthCheckController;
const updloadVideoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoLink = req.file;
        console.log('videoLink', req.file);
        if (!videoLink) {
            (0, response_1.sendErrorResponse)(res, 400, `no video uploaded`);
        }
        const stream = cloudinary.uploader.upload_stream({ resource_type: "video" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (error) {
                (0, response_1.sendErrorResponse)(res, 400, error);
            }
            const video = yield model_1.default.create({
                filename: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
                video: result.secure_url,
            });
            (0, response_1.sendSuccessfulResponse)(res, 200, video);
        }));
        streamifier_1.default.createReadStream(videoLink.buffer).pipe(stream);
    }
    catch (error) {
        (0, response_1.sendErrorResponse)(res, 500, error);
    }
});
exports.updloadVideoController = updloadVideoController;
const getAllVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allVideos = yield model_1.default.find();
        if (!allVideos) {
            (0, response_1.sendErrorResponse)(res, 400, `not found`);
        }
        (0, response_1.sendSuccessfulResponse)(res, 200, allVideos);
    }
    catch (error) {
        (0, response_1.sendErrorResponse)(res, 500, error);
    }
});
exports.getAllVideos = getAllVideos;
const getSingleVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const video = yield model_1.default.findById({ _id: id });
        if (video) {
            (0, response_1.sendErrorResponse)(res, 400, `not found`);
        }
        (0, response_1.sendSuccessfulResponse)(res, 200, video);
    }
    catch (error) {
        (0, response_1.sendErrorResponse)(res, 500, error);
    }
});
exports.getSingleVideo = getSingleVideo;
const searchVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const searchResult = yield model_1.default.find({
            name: {
                $regex: search,
                Option: `i`,
            },
        });
        if (searchResult.length !== 0) {
            (0, response_1.sendSuccessfulResponse)(res, 200, searchResult);
        }
        (0, response_1.sendSuccessfulResponse)(res, 200, []);
    }
    catch (error) {
        (0, response_1.sendErrorResponse)(res, 500, error);
    }
});
exports.searchVideo = searchVideo;
const deleteAllVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const video = yield model_1.default.find({
            _id: id,
        });
        if (!video) {
            (0, response_1.sendErrorResponse)(res, 400, "not found");
        }
        video.forEach((video) => __awaiter(void 0, void 0, void 0, function* () {
            const cloudId = `${video.video}`.split("/").slice(-1)[0].split(".")[0];
            yield cloudinary.uploader.destroy(cloudId);
            yield model_1.default.findByIdAndDelete(video._id);
        }));
        (0, response_1.sendSuccessfulResponse)(res, 200, `success`);
    }
    catch (error) {
        (0, response_1.sendErrorResponse)(res, 500, error);
    }
});
exports.deleteAllVideo = deleteAllVideo;
const deleteSingleVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.params;
        const video = yield model_1.default.findById(videoId);
        if (!video) {
            (0, response_1.sendErrorResponse)(res, 400, `not fund`);
        }
        const cloudId = `${video === null || video === void 0 ? void 0 : video.video}`.split("/").slice(-1)[0].split(".")[0];
        yield cloudinary.uploader.destroy(cloudId);
        yield model_1.default.findByIdAndDelete(videoId);
        (0, response_1.sendSuccessfulResponse)(res, 200, `success`);
    }
    catch (error) {
        (0, response_1.sendErrorResponse)(res, 500, error);
    }
});
exports.deleteSingleVideo = deleteSingleVideo;
