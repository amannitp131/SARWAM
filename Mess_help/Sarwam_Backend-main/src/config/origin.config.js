"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedCors = allowedCors;
const cors_1 = __importDefault(require("cors"));
const dotenv_config_1 = require("./dotenv.config");
const express_1 = __importDefault(require("express"));
(0, dotenv_config_1.loadEnv)();
const app = (0, express_1.default)();
function allowedCors() {
    try {
        const frontend = process.env.FRONTEND_URL;
        if (!frontend) {
            console.error('FRONTEND_URL is not defined in .env file');
            return;
        }
        app.use((0, cors_1.default)({ origin: frontend }));
    }
    catch (e) {
        console.log("An error occured while dealing with cors : ", e);
    }
}
