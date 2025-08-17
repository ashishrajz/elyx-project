import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMember extends Document {
  _id: Types.ObjectId;        // 👈 Explicitly typed _id
  clerkId: string;
  email: string;
  name: string;
  imageUrl?: string; 
  dob?: Date;
  gender?: string;
  primaryResidence?: string;
  travelHubs?: string[];
  occupation?: string;
  healthGoals?: string[];
  chronicConditions?: string[];
  wearables?: string[];
  preferences?: {
    commsChannel?: string;
    detailLevel?: string;
  };

  // 🔽 New references
  testReports?: Types.ObjectId[];   // -> TestReport collection
  decisions?: Types.ObjectId[];     // -> KeyDecision collection
  wearableData?: Types.ObjectId[];  // -> WearableData collection
  plans?: Types.ObjectId[];         // -> Plan collection

  createdAt: Date;
  updatedAt: Date;
  role: "Member";
}

const MemberSchema = new Schema<IMember>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    dob: Date,
    gender: String,
    primaryResidence: String,
    travelHubs: [String],
    occupation: String,
    healthGoals: [String],
    chronicConditions: [String],
    wearables: [String],
    preferences: {
      commsChannel: String,
      detailLevel: String,
    },

    // 🔽 New reference fields
    testReports: [{ type: Schema.Types.ObjectId, ref: "TestReport" }],
    decisions: [{ type: Schema.Types.ObjectId, ref: "KeyDecision" }],
    wearableData: [{ type: Schema.Types.ObjectId, ref: "WearableData" }],
    plans: [{ type: Schema.Types.ObjectId, ref: "Plan" }],

    role: { type: String, default: "Member" },
  },
  { timestamps: true }
);

export default mongoose.models.Member as mongoose.Model<IMember> ||
  mongoose.model<IMember>("Member", MemberSchema);
