"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedChatRooms = void 0;
const chat_room_1 = __importDefault(require("../models/chat-room"));
const assignedChatRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffId } = req.body;
        const chatRooms = yield chat_room_1.default.find({ status: 'active', assigned: staffId }).populate('assigned');
        return res.status(200).json({
            message: ' chat rooms fetched successfully',
            data: chatRooms,
        });
    }
    catch (error) {
        console.error('Error fetching  chat rooms:', error);
        return res.status(500).json({
            message: 'Failed to fetch  chat rooms',
        });
    }
});
exports.assignedChatRooms = assignedChatRooms;
//# sourceMappingURL=staff-controller.js.map