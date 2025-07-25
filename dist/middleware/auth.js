"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const get_token_1 = require("../controllers/get-token");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("🔐 Auth Header:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    const token = authHeader.split(' ')[1]; // Get the token after "Bearer"
    try {
        const decoded = jsonwebtoken_1.default.verify(token, get_token_1.JWT_SECRET);
        // Optionally attach user info to the request object:
        // req.user = decoded;
        next();
    }
    catch (err) {
        console.error("❌ Invalid token:", err.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map