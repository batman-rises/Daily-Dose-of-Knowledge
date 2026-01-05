import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: ["quote", "fact", "joke", "word"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: { type: String },
    meta: { type: Object },
  },
  { timesttamps: true }
);
const Favorite = mongoose.model("Favorite", FavoriteSchema);
export default Favorite;
