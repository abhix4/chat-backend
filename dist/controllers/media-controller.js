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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = void 0;
// import path from 'path';
const uploadMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const file = req.file;
        if (!file)
            return res.status(400).json({ message: "No file uploaded" });
        const fileUrl = `/uploads/${file.filename}`;
        res.status(200).json({ url: fileUrl });
    }
    catch (error) {
        console.error("Media Upload Error:", error);
        res.status(500).json({ message: "Media upload failed" });
    }
});
exports.uploadMedia = uploadMedia;
//# sourceMappingURL=media-controller.js.map