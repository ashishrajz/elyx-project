import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderClerkId: string;
  senderName: string;
  senderRole: "Member" | "TeamMember";
  text: string;
  group?: "elyx";               // for group chat
  receiverClerkId?: string;     // for 1:1
}

const MessageSchema = new Schema<IMessage>(
  {
    senderClerkId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderRole: { type: String, enum: ["Member", "TeamMember"], required: true },
    text: { type: String, required: true },
    group: { type: String, enum: ["elyx"], default: null },
    receiverClerkId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
