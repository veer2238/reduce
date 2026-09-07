import express from "express";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";


dotenv.config();

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
    console.log("Birthday API called");

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@v-extechsolution.in',
        pass: 'Hima@0409',
      },
    });

    const mailOptions = {
      from: 'info@v-extechsolution.in',
      to: 'veer2238rajput@gmail.com',
      subject: "Birthday Test",
      html: "<h1>hi</h1>",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = 2238;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;