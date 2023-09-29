import { Schema, model } from "mongoose";
import { IVideoDetails } from "../interface";

export const VideoSchema: Schema = new Schema<IVideoDetails>(
  {
    filename: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
  },

  { timestamps: true }
);

export default model<IVideoDetails>(`Video`, VideoSchema);
