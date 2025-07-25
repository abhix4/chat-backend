"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat-controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.authenticate, chat_controller_1.createChatRoom);
router.post('/history', auth_1.authenticate, chat_controller_1.chatHistory);
router.post('/:roomId/archive', auth_1.authenticate, chat_controller_1.archiveChat);
exports.default = router;
//# sourceMappingURL=chat-routes.js.map