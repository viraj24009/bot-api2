import express from "express";
import ytdl from "@distube/ytdl-core";

const app = express();

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ YouTube API is running");
});

// 🎥 Video + 🎵 Audio details endpoint
app.get("/details", async (req, res) => {
  try {
    const { videoId } = req.query;
    if (!videoId) return res.status(400).json({ error: "videoId required" });

    const info = await ytdl.getInfo(videoId);
    const videoFormats = ytdl.filterFormats(info.formats, "videoandaudio");
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

    res.json({
      title: info.videoDetails.title,
      video: videoFormats.map(v => ({
        qualityLabel: v.qualityLabel,
        url: v.url
      })),
      audio: audioFormats.map(a => ({
        quality: a.audioBitrate + "kbps",
        url: a.url
      }))
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch details", details: e.message });
  }
});

export default app;
