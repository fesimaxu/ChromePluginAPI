"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../middlewares/upload");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get('/', controller_1.gethealthCheckController);
router.post('/api/v1/uploadvideo', upload_1.upload.single("video"), controller_1.updloadVideoController);
router.get('/api/v1/getvideos/:id', controller_1.getSingleVideo);
router.get('/api/v1/getvideos', controller_1.getAllVideos);
router.delete('/api/v1/deletevideos/:id', controller_1.deleteSingleVideo);
router.delete('/api/v1/deletevideos', controller_1.deleteAllVideo);
exports.default = router;
