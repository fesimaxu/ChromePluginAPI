import { Router } from "express";
import { upload } from "../middlewares/upload";
import { updloadVideoController, getAllVideos, getSingleVideo, deleteSingleVideo, deleteAllVideo, gethealthCheckController } from "../controller";


const router = Router();


router.get('/', gethealthCheckController);
router.post('/api/v1/uploadvideo', upload.single("video"), updloadVideoController);
router.get('/api/v1/getvideos/:id', getSingleVideo);
router.get('/api/v1/getvideos', getAllVideos);
router.delete('/api/v1/deletevideos/:id', deleteSingleVideo);
router.delete('/api/v1/deletevideos', deleteAllVideo);


export default router;