import { Request, Response, NextFunction } from "express";
import streamifier from "streamifier";
import Video from "../model";
import { sendErrorResponse, sendSuccessfulResponse } from "../utils/response";
const cloudinary = require("cloudinary").v2;


export const gethealthCheckController = (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
 
  res.send(`Chrome Plugin API Running at PORT 5505`)
}

export const updloadVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoLink: any = req.file;
    console.log('videoLink', req.file)

    if (!videoLink) {
      sendErrorResponse(res, 400, `no video uploaded`);
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },

      async (error: any, result: any) => {

        if (error) {
          sendErrorResponse(res, 400, error);
        }

        const video = await Video.create({
          filename: req.file?.originalname,
          video: result.secure_url,
        });

        sendSuccessfulResponse(res, 200, video);
      }
    );

    streamifier.createReadStream(videoLink.buffer).pipe(stream);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

export const getAllVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allVideos = await Video.find();

    if (!allVideos) {
      sendErrorResponse(res, 400, `not found`);
    }

    sendSuccessfulResponse(res, 200, allVideos);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

export const getSingleVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const video = await Video.findById({ _id: id });

    if (video) {
      sendErrorResponse(res, 400, `not found`);
    }
    sendSuccessfulResponse(res, 200, video);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

export const searchVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;

    const searchResult = await Video.find({
      name: {
        $regex: search,
        Option: `i`,
      },
    });

    if (searchResult.length !== 0) {
      sendSuccessfulResponse(res, 200, searchResult);
    }
    sendSuccessfulResponse(res, 200, []);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

export const deleteAllVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const video = await Video.find({
      _id: id,
    });

    if (!video) {
      sendErrorResponse(res, 400, "not found");
    }

    video.forEach(async (video) => {
      const cloudId = `${video.video}`.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(cloudId);
      await Video.findByIdAndDelete(video._id);
    });

    sendSuccessfulResponse(res, 200, `success`);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

export const deleteSingleVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) {
      sendErrorResponse(res, 400, `not fund`);
    }
    const cloudId = `${video?.video}`.split("/").slice(-1)[0].split(".")[0];
    await cloudinary.uploader.destroy(cloudId);
    await Video.findByIdAndDelete(videoId);

    sendSuccessfulResponse(res, 200, `success`);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};
