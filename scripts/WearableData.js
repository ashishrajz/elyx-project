import mongoose, { Schema } from "mongoose";

const WearableDataSchema = new Schema(
  {
    userClerkId: { type: String, required: true },
    date: { type: Date, required: true },
    device: String,
    metrics: {
      restingHR: Number,
      HRV: Number,
      sleepHours: Number,
      steps: Number,
      caloriesBurned: Number,
    },
    scientistNotes: String,
  },
  { timestamps: true }
);

export default mongoose.models.WearableData ||
  mongoose.model("WearableData", WearableDataSchema);
