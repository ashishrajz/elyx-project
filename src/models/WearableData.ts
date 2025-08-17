import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWearableData extends Document {
    _id: Types.ObjectId;
    userClerkId: string;
    date: Date;
    device: string; // e.g., Garmin, Oura
    metrics: {
      restingHR: number;
      HRV: number;
      sleepHours: number;
      steps: number;
      caloriesBurned: number;
    };
    scientistNotes?: string;
  }
  
  const WearableDataSchema = new Schema<IWearableData>(
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
  
  export default mongoose.models.WearableData as mongoose.Model<IWearableData> ||
    mongoose.model<IWearableData>("WearableData", WearableDataSchema);
  