import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: String,
      required: true,
    },
    reps: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
