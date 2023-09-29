import express from "express";
import logger from "morgan";
import cors from "cors";
import { HttpError } from "http-errors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import StreamRoutes from "./routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(errorHandler);
app.use('/', StreamRoutes);

mongoose.connect(`${process.env.MONGODB_CONN}`).then(()=>{
    console.log(`Database is connected !`)
}).catch((error: HttpError ) => {
    console.log(`Database error at ${error}`)
});


app.listen(PORT || 3000, () => {

    console.log(`Custom Chrome API running on http://localhost${PORT}`)
})