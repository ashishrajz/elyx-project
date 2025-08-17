import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Plan from "./Plan.js";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ No MongoDB URI found. Check .env.local and dotenv config.");
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    const filePath = path.join(process.cwd(), "scripts", "Plans.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Plan.deleteMany({});
    await Plan.insertMany(data);

    console.log("✅ Plans seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding Plans:", err);
    process.exit(1);
  }
}

run();
