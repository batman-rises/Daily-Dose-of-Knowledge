import express from "express";
const router = express.Router();

import Favorite from "../models/Favoirte.js";

router.post("/", async (req, res) => {
  try {
    const { kind, text, author, meta } = req.body;
    if (!kind || !text)
      return res.status(400).json({ error: "kind & text required" });
    const fav = new Favorite({ kind, text, author, meta });
    await fav.save();
    res.status(201).json(fav);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

router.get("/", async (req, res) => {
  try {
    const favs = await Favorite.find().sort({ createdAt: -1 });
    res.json(favs);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});
// DELETE /api/favorites/:id
router.delete("/:id", async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

export default router;
