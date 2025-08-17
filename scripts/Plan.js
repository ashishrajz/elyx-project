import mongoose, { Schema } from "mongoose";

const PlanSchema = new Schema(
  {
    userClerkId: { type: String, required: true },
    date: { type: Date, required: true },
    planType: {
      type: String,
      enum: ["Nutrition", "Exercise", "Supplements"],
      required: true,
    },
    assignedBy: String,
    details: Schema.Types.Mixed, // Flexible JSON object
    goal: String,
  },
  { timestamps: true }
);

export default mongoose.models.Plan ||
  mongoose.model("Plan", PlanSchema);
