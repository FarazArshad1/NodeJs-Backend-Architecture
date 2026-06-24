import crypto from "node:crypto";
import mongoose from "mongoose";
import "./index.js"; // Import database index to establish connection
import { APIKeyModel, Permission } from "../models/APIKeyModel.js";
import Logger from "../core/Logger.js";

/**
 * Standalone script to seed a sample API key.
 * Should be run once to populate the database.
 */
const seedApiKey = async () => {
    // Ensure the database connection is ready before proceeding
    if (mongoose.connection.readyState !== 1) {
        await new Promise((resolve) => {
            mongoose.connection.once("connected", () => {
                resolve(true);
            });
        });
    }

    // Generate a secure random API key using crypto
    const key = crypto.randomBytes(32).toString("hex");

    try {
        // Since we are generating a random key, we don't check for existence of THIS specific key
        // as it's highly unlikely to collide. If the user wanted to ensure ONLY ONE key exists,
        // they would check for ANY key, but here we just create a new unique one.
        
        await APIKeyModel.create({
            key,
            version: 1,
            permissions: [Permission.GENERAL],
            status: true,
        });

        Logger.info(`A new API Key has been generated and seeded successfully:`);
        Logger.info(`Key: ${key}`);
    } catch (error) {
        Logger.error("Error seeding API key:");
        Logger.error(error);
    } finally {
        // Close the connection and exit the process
        await mongoose.connection.close();
        Logger.info("Mongoose connection closed. Seeding complete.");
        process.exit(0);
    }
};

// Execute the seeding process
seedApiKey();
