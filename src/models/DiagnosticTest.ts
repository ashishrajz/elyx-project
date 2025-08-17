import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDiagnosticTest extends Document {
  memberId: Types.ObjectId;
  testName: string;
  results?: Record<string, any>;
  status: "Scheduled" | "Completed";
  date: Date;
}

const DiagnosticTestSchema = new Schema<IDiagnosticTest>(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    testName: { type: String, required: true },
    results: { type: Object },
    status: { type: String, enum: ["Scheduled", "Completed"], default: "Scheduled" },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.DiagnosticTest || mongoose.model<IDiagnosticTest>("DiagnosticTest", DiagnosticTestSchema);
