import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPlan extends Document {
    _id: Types.ObjectId;
    userClerkId: string;
    date: Date;
    planType: "Nutrition" | "Exercise" | "Supplements";
    assignedBy: string;
    details: Record<string, any>; // flexible for meals, workouts, supplements
    goal: string;
  }
  
  const PlanSchema = new Schema<IPlan>(
    {
      userClerkId: { type: String, required: true },
      date: { type: Date, required: true },
      planType: { type: String, enum: ["Nutrition", "Exercise", "Supplements"], required: true },
      assignedBy: String,
      details: Schema.Types.Mixed, // allows flexible JSON
      goal: String,
    },
    { timestamps: true }
  );
  
  export default mongoose.models.Plan as mongoose.Model<IPlan> ||
    mongoose.model<IPlan>("Plan", PlanSchema);
  