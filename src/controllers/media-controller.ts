import { Request, Response } from 'express';


export const uploadMedia = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const fileUrl = `/uploads/${file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error("Media Upload Error:", error);
    res.status(500).json({ message: "Media upload failed" });
  }
};