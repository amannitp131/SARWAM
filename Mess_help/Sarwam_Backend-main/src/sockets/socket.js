"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = socketConnection;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_config_1 = require("../config/dotenv.config");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
(0, dotenv_config_1.loadEnv)();
function socketConnection() {
    try {
        const server = http_1.default.createServer(app);
        if (!process.env.FRONTEND_URL) {
            console.error("FRONTEND_URL is not defined in .env file");
            process.exit(1);
        }
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.FRONTEND_URL,
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        io.on("connection", (socket) => {
            console.log("A user connected:", socket.id);
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
    catch (e) {
        console.log("an error occured during socket connection ", e);
    }
}
