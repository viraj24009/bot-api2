import express from "express";
import ytdl from "ytdl-core";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ YT Media API Running");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(url, { format: "mp4" }).pipe(res);
});

// Vercel me yahi chahiye:
export default app;