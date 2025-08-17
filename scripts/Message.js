import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderClerkId: String,
    senderName: String,
    senderRole: String,
    text: String,
    group: String,
    receiverClerkId: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
