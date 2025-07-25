"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const participantSchema = new mongoose_1.default.Schema({
    userId: String,
    role: { type: String, enum: ['admin', 'staff', 'petOwner'] },
    chatRoomId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ChatRoom' },
});
exports.default = mongoose_1.default.model('Participant', participantSchema);
//# sourceMappingURL=participants.js.map