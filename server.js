import express from "express";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";

const app = express();

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

app.post("/api/compress", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const compressedImage = await sharp(req.file.buffer)
      .jpeg({
        quality: 70,
      })
      .toBuffer();

    res.set("Content-Type", "image/jpeg");

    res.send(compressedImage);
  } catch (error) {
    console.error("Compression Error:", error);

    res.status(500).json({
      message: "Image compression failed",
    });
  }
});

const PORT = 2238;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});