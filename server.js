import express from "express";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";
import cron from "node-cron";

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





app.get("/api/birthday/send", async (req, res) => {
  try {
    console.log("Birthday cron started");

    // 1. Get today's date
    // 2. Find students whose birthday is today
    // 3. Send email

    res.status(200).json({
      success: true,
      message: "Birthday check completed"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const PORT = 2238;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;