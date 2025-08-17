import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeamMember extends Document {
  clerkId: string;
  email: string;
  name: string;
  role: "Concierge" | "Doctor" | "Nutritionist" | "PT" | "Performance Scientist" | "Lead";
  bio?: string;
  speciality?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["Concierge", "Doctor", "Nutritionist", "PT", "Performance Scientist", "Lead"],
      required: true
    },
    bio: String,
    speciality: String
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
