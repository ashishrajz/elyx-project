import mongoose, { Schema, Document, Types } from "mongoose";

export interface IJourney extends Document {
  memberId: Types.ObjectId;
  episodes: {
    title: string;
    date: Date;
    description: string;
    metrics?: Record<string, any>;
    decisionReason?: string;
  }[];
}

const JourneySchema = new Schema<IJourney>(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    episodes: [
      {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        description: { type: String, required: true },
        metrics: { type: Object },
        decisionReason: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Journey || mongoose.model<IJourney>("Journey", JourneySchema);
