import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITestReport extends Document {
  _id: Types.ObjectId;
  userClerkId: string;
  date: Date;
  panel: {
    LDL: number;
    HDL: number;
    TotalCholesterol: number;
    Triglycerides: number;
    CRP?: number;
    GlucoseFasting?: number;
  };
  summary: string;
  doctorNotes: string;
}

const TestReportSchema = new Schema<ITestReport>(
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

export default mongoose.models.TestReport as mongoose.Model<ITestReport> ||
  mongoose.model<ITestReport>("TestReport", TestReportSchema);
