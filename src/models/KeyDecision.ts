import mongoose, { Schema, Document, Types } from "mongoose";
export interface IKeyDecision extends Document {
    _id: Types.ObjectId;
    userClerkId: string;
    date: Date;
    decisionBy: string;   // e.g., "Dr. Warren"
    context: string;
    decision: string;
    rationale: string;
  }
  
  const KeyDecisionSchema = new Schema<IKeyDecision>(
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
  
  export default mongoose.models.KeyDecision as mongoose.Model<IKeyDecision> ||
    mongoose.model<IKeyDecision>("KeyDecision", KeyDecisionSchema);
  