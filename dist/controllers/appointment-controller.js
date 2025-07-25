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
exports.bookAppointment = void 0;
// src/controllers/appointmentController.ts
const appointment_1 = __importDefault(require("../models/appointment"));
const chat_room_1 = __importDefault(require("../models/chat-room"));
const participants_1 = __importDefault(require("../models/participants"));
const bookAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petOwnerId, hospitalId, time } = req.body;
        const appointment = yield appointment_1.default.create({ petOwnerId, hospitalId, time, status: 'confirmed' });
        // Create ChatRoom
        const chatRoom = yield chat_room_1.default.create({
            appointmentId: appointment._id,
            petOwnerId,
            hospitalId,
        });
        // Add Participants
        yield participants_1.default.create([
            { userId: petOwnerId, role: 'petOwner', chatRoomId: chatRoom._id },
            { userId: 'test', role: 'staff', chatRoomId: chatRoom._id },
        ]);
        res.status(201).json({ appointment, chatRoomId: chatRoom._id });
    }
    catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Failed to book appointment' });
    }
});
exports.bookAppointment = bookAppointment;
//# sourceMappingURL=appointment-controller.js.map