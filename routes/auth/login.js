"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const login_1 = __importDefault(require("../../controllers/auth/login"));
Router.get('/', login_1.default.getLoginPage);
Router.post('/', login_1.default.postLoginPage);
exports.default = Router;
