import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import WearableData from "./WearableData.js";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ No MongoDB URI found. Check .env.local and dotenv config.");
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    const filePath = path.join(process.cwd(), "scripts", "WearableData.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await WearableData.deleteMany({});
    await WearableData.insertMany(data);

    console.log("✅ WearableData seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding WearableData:", err);
    process.exit(1);
  }
}

run();
