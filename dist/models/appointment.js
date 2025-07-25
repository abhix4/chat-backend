"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Appointment.ts
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
    petOwnerId: String,
    hospitalId: String,
    time: Date,
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
});
exports.default = mongoose_1.default.model('Appointment', appointmentSchema);
//# sourceMappingURL=appointment.js.map