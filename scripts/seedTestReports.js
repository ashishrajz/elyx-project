import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import TestReport from "./TestReport.js";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ No MongoDB URI found. Check .env.local and dotenv config.");
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    const filePath = path.join(process.cwd(), "scripts", "TestReports.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await TestReport.deleteMany({});
    await TestReport.insertMany(data);

    console.log("✅ TestReports seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding TestReports:", err);
    process.exit(1);
  }
}

run();
