import express from "express";
import axios from "axios";
import https from "https";

const router = express.Router();

// Axios instance that ignores SSL certificate errors (dev only)
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

// GET /api/quote
router.get("/quote", async (req, res) => {
  try {
    const r = await axiosInstance.get("https://api.quotable.io/random");
    res.json({
      type: "quote",
      data: { text: r.data.content, author: r.data.author },
    });
  } catch (e) {
    console.error("Quote API error:", e.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// GET /api/fact
router.get("/fact", async (req, res) => {
  try {
    const r = await axiosInstance.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    res.json({ type: "fact", data: { text: r.data.text } });
  } catch (e) {
    console.error("Fact API error:", e.message);
    res.status(500).json({ error: "Failed to fetch fact" });
  }
});

// GET /api/joke
router.get("/joke", async (req, res) => {
  try {
    const r = await axiosInstance.get(
      "https://official-joke-api.appspot.com/random_joke"
    );
    res.json({
      type: "joke",
      data: { setup: r.data.setup, punchline: r.data.punchline },
    });
  } catch (e) {
    console.error("Joke API error:", e.message);
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

// GET /api/word
router.get("/word", async (req, res) => {
  try {
    let word;

    // Try Random Word API
    try {
      const w = await axiosInstance.get(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      if (Array.isArray(w.data) && w.data.length) {
        word = w.data[0];
      }
    } catch (e) {
      console.warn("Random Word API failed, using fallback");
    }

    // Fallback word list
    const fallbackWords = [
      "serendipity",
      "ephemeral",
      "catalyst",
      "eloquent",
      "labyrinth",
    ];
    if (!word)
      word = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];

    // Get definition
    try {
      const d = await axiosInstance.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const meanings = d.data[0]?.meanings || [];
      const def =
        meanings[0]?.definitions?.[0]?.definition ||
        "Definition not available.";
      const example = meanings[0]?.definitions?.[0]?.example || "";
      res.json({ type: "word", data: { word, definition: def, example } });
    } catch (err) {
      console.warn("Dictionary API failed for", word);
      res.json({
        type: "word",
        data: { word, definition: "Definition not available." },
      });
    }
  } catch (err) {
    console.error("Word API error:", err.message);
    res.status(500).json({ error: "Failed to fetch word" });
  }
});

export default router;
