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
exports.setupSocket = void 0;
const message_1 = __importDefault(require("../models/message"));
const chat_room_1 = __importDefault(require("../models/chat-room"));
const get_token_1 = require("../controllers/get-token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setupSocket = (io) => {
    io.on("connection", (socket) => {
        const token = socket.handshake.query.token;
        const decoded = jsonwebtoken_1.default.verify(token, get_token_1.JWT_SECRET);
        const userId = decoded.userId;
        console.log("New connection from userId:", userId);
        // Log everything that comes in
        socket.onAny((event, data) => {
            console.log(`🟢 Event: ${event}`, data);
        });
        socket.on("joinRoom", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId }) {
            if (!roomId)
                return console.error("⚠️ No roomId provided");
            try {
                const room = yield chat_room_1.default.findById(roomId).lean();
                if (!room) {
                    console.error("❌ Room not found");
                    return socket.emit("error", "Room not found");
                }
                if (room.status !== 'active') {
                    console.log("Room is not active");
                    return socket.emit("error", "room is not active");
                }
                // assuming room.assigned is an array of ObjectIds or strings
                const isAssigned = room.assigned && room.assigned.toString() === userId;
                const isPetOwner = room.petOwnerId.toString() === userId;
                if (!isAssigned && !isPetOwner) {
                    console.warn(`❌ User ${userId} is not assigned to room ${roomId}`);
                    return socket.emit("unauthorized", "You are not allowed in this room");
                }
                socket.join(roomId);
                console.log(`✅ User ${userId} joined room ${roomId}`);
            }
            catch (err) {
                console.error("❌ Error verifying room join", err);
                socket.emit("error", "Internal server error");
            }
        }));
        socket.on("message", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, content, type }) {
            if (!roomId || !content) {
                console.error("⚠️ Missing roomId or content");
                return;
            }
            const msg = yield message_1.default.create({
                senderId: userId,
                chatRoomId: roomId,
                content,
                type,
            });
            console.log(`📩 Message from ${userId} to room ${roomId}: ${content}`);
            io.to(roomId).emit("message", msg);
        }));
        socket.on("disconnect", () => {
            console.log(`🔌 User ${userId} disconnected`);
        });
    });
};
exports.setupSocket = setupSocket;
//# sourceMappingURL=chat-socket.js.map