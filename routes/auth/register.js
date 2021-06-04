"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const register_1 = __importDefault(require("../../controllers/auth/register"));
Router.get('/', register_1.default.getRegisterPage);
Router.post('/', register_1.default.postRegisterPage);
exports.default = Router;