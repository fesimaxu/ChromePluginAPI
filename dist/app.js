"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(errorHandler_1.default);
app.use('/', routes_1.default);
mongoose_1.default.connect(`${process.env.MONGODB_CONN}`).then(() => {
    console.log(`Database is connected !`);
}).catch((error) => {
    console.log(`Database error at ${error}`);
});
app.listen(PORT || 3000, () => {
    console.log(`Custom Chrome API running on http://localhost${PORT}`);
});
