"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_config_1 = require("./config/dotenv.config");
const origin_config_1 = require("./config/origin.config");
const db_config_1 = require("./config/db.config");
const cloudinary_config_1 = __importDefault(require("./config/cloudinary.config"));
const socket_1 = require("./sockets/socket");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
(0, dotenv_config_1.loadEnv)();
(0, origin_config_1.allowedCors)();
(0, db_config_1.connectDatabase)();
(0, socket_1.socketConnection)();
cloudinary_config_1.default.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.get("/", (req, res) => {
    res.send(`Server is listening on the Port${port}`);
});
app.listen(port, () => {
    console.log(`server is listening to the port ${port}`);
});
