"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staff_controller_1 = require("../controllers/staff-controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/assigned', auth_1.authenticate, staff_controller_1.assignedChatRooms);
exports.default = router;
//# sourceMappingURL=staff-routes.js.map