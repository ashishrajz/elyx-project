import mongoose, { Schema } from "mongoose";

const KeyDecisionSchema = new Schema(
  {
    userClerkId: { type: String, required: true },
    date: { type: Date, required: true },
    decisionBy: String,
    context: String,
    decision: String,
    rationale: String,
  },
  { timestamps: true }
);

export default mongoose.models.KeyDecision ||
  mongoose.model("KeyDecision", KeyDecisionSchema);
