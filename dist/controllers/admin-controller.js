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
exports.assignChat = exports.activeChatRooms = void 0;
const chat_room_1 = __importDefault(require("../models/chat-room"));
const participants_1 = __importDefault(require("../models/participants"));
const activeChatRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatRooms = yield chat_room_1.default.find({ status: 'active' }).populate('assigned');
        return res.status(200).json({
            message: 'Active chat rooms fetched successfully',
            data: chatRooms,
        });
    }
    catch (error) {
        console.error('Error fetching active chat rooms:', error);
        return res.status(500).json({
            message: 'Failed to fetch active chat rooms',
        });
    }
});
exports.activeChatRooms = activeChatRooms;
const assignChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffId, chatRoomId } = req.body;
        // Step 1: Find the chat room
        const room = (yield chat_room_1.default.findById(chatRoomId));
        if (!room) {
            return res.status(404).json({ message: 'Chat room not found' });
        }
        const existingParticipant = yield participants_1.default.findOne({
            chatRoomId,
            userId: staffId,
        });
        // Step 4: If not, add them
        if (!existingParticipant) {
            const staff = yield participants_1.default.create({
                userId: staffId,
                chatRoomId,
                role: 'staff', // or 'vet'
            });
            room.assigned = staff._id;
            yield room.save();
        }
        const updatedRoom = yield chat_room_1.default.findById(chatRoomId).populate('assigned');
        return res.status(200).json({
            message: 'Chat successfully assigned to staff',
            chatRoom: updatedRoom,
        });
    }
    catch (error) {
        console.error('Assign Chat Error:', error);
        return res.status(500).json({
            message: 'Failed to assign chat',
        });
    }
});
exports.assignChat = assignChat;
//# sourceMappingURL=admin-controller.js.map