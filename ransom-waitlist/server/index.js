const express = require("express");
const cors = require("cors");
const { RansomNote } = require("ransom-note-generator");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }
  try {
    const { imageBuffer } = await RansomNote.generateImageBuffer(text.trim());
    const base64 = imageBuffer.toString("base64");
    res.json({ image: `data:image/png;base64,${base64}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image generation failed" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
