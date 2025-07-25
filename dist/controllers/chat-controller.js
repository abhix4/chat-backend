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
exports.chatHistory = exports.archiveChat = exports.createChatRoom = void 0;
const chat_room_1 = __importDefault(require("../models/chat-room"));
const message_1 = __importDefault(require("../models/message"));
const createChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId, petOwnerId, hospitalId } = req.body;
    const room = yield chat_room_1.default.create({ appointmentId, petOwnerId, hospitalId });
    res.status(201).json(room);
});
exports.createChatRoom = createChatRoom;
const archiveChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield chat_room_1.default.findByIdAndUpdate(req.params.roomId, { status: 'archived' }, { new: true });
    res.json(room);
});
exports.archiveChat = archiveChat;
const chatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.body;
    const messages = yield message_1.default.find({ chatRoomId: roomId });
    res.status(200).json(messages);
});
exports.chatHistory = chatHistory;
//# sourceMappingURL=chat-controller.js.map