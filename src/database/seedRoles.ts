import mongoose from "mongoose";
import { RoleCode, RoleModel } from "../models/roleModel.js";
import { db } from "../config.js";

const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`;

async function seedRoles() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB...");

    const roles = Object.values(RoleCode);

    for (const code of roles) {
      const exists = await RoleModel.findOne({ code });
      if (!exists) {
        await RoleModel.create({ code, status: true });
        console.log(`Created role: ${code}`);
      } else {
        console.log(`Role already exists: ${code}`);
      }
    }

    console.log("Role seeding completed.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedRoles();
