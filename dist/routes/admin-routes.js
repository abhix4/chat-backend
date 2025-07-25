"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin-controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/active-chats', auth_1.authenticate, admin_controller_1.activeChatRooms);
router.post('/assign', auth_1.authenticate, admin_controller_1.assignChat);
exports.default = router;
//# sourceMappingURL=admin-routes.js.map