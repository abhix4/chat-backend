"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    senderId: String,
    chatRoomId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ChatRoom' },
    content: String,
    type: { type: String, enum: ['text', 'video', 'doc'], default: 'text' },
    timestamp: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Message', messageSchema);
//# sourceMappingURL=message.js.map