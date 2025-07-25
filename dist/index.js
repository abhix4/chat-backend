"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const chat_socket_1 = require("./sockets/chat-socket");
const media_routes_1 = __importDefault(require("./routes/media-routes"));
const chat_routes_1 = __importDefault(require("./routes/chat-routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment-routes"));
const admin_routes_1 = __importDefault(require("./routes/admin-routes"));
const staff_routes_1 = __importDefault(require("./routes/staff-routes"));
const get_token_1 = require("./controllers/get-token");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
(0, chat_socket_1.setupSocket)(io);
mongoose_1.default.connect('mongodb://admin:secret@localhost:27017').then(() => {
    console.log('MongoDB connected');
    app.use(express_1.default.json());
    const uploadPath = path_1.default.resolve(__dirname, '../uploads'); // make it absolute
    app.use('/uploads', express_1.default.static(uploadPath));
    app.use('/api/media', media_routes_1.default);
    app.use('/api/chat', chat_routes_1.default);
    app.use('/api/appointments', appointment_routes_1.default);
    app.use('/api/admin', admin_routes_1.default);
    app.use('/api/staff', staff_routes_1.default);
    app.post('/api/get-token', get_token_1.getToken);
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//# sourceMappingURL=index.js.map