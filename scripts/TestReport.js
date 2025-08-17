import mongoose, { Schema } from "mongoose";

const TestReportSchema = new Schema(
  {
    userClerkId: { type: String, required: true },
    date: { type: Date, required: true },
    panel: {
      LDL: Number,
      HDL: Number,
      TotalCholesterol: Number,
      Triglycerides: Number,
      CRP: Number,
      GlucoseFasting: Number,
    },
    summary: String,
    doctorNotes: String,
  },
  { timestamps: true }
);

export default mongoose.models.TestReport ||
  mongoose.model("TestReport", TestReportSchema);
