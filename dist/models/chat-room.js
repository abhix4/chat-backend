"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomSchema = new mongoose_1.default.Schema({
    appointmentId: String,
    petOwnerId: String,
    hospitalId: String,
    assigned: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Participant' },
    status: { type: String, enum: ['active', 'archived', 'closed'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('ChatRoom', chatRoomSchema);
//# sourceMappingURL=chat-room.js.map