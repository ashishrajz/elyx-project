import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMetric extends Document {
  memberId: Types.ObjectId;
  metricType: string; // e.g. "doctorHours", "coachHours", "hrv", "bloodPressure"
  value: number;
  date: Date;
}

const MetricSchema = new Schema<IMetric>(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    metricType: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Metric || mongoose.model<IMetric>("Metric", MetricSchema);
