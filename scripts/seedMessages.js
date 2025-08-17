import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Message from "./Message.js";

// 👇 Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ No MongoDB URI found. Check .env.local and dotenv config.");
  process.exit(1);
}


async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    const filePath = path.join(process.cwd(), "scripts", "elyx_8_month_conversation_realistic.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // clear existing
    await Message.deleteMany({});
    await Message.insertMany(data);

    console.log("✅ Messages seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding messages:", err);
    process.exit(1);
  }
}

run();
