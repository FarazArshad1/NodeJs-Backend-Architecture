import { it, describe, expect, beforeAll, afterAll } from "vitest";
import resquest from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"

import { app } from "../../src/server.js";
import mongoose from "mongoose";
import { RoleModel } from "../../src/models/roleModel.js";

let mongo: any;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    const mongoURI = mongo.getUri()
    await mongoose.connect(mongoURI)
    await RoleModel.create({
        code: "USER",
        status: true
    })
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop()
    }
    await mongoose.connection.close()
})

describe("Test the Register functionality", () => {

    // Arrnage
    const endpoint = "/api/users/register"
    const userPayload = {
        name: "John",
        email: "john@example.com",
        password: "123456789"
    }

    // Act
    it("should register a user", async () => {
        const res = await resquest(app).post(endpoint).send(userPayload)

        // Assert
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
            name: "John",
            email: "john@example.com"
        })
        expect(res.body._id).toBeDefined()
    })

    it("returns 400 with invalid email", async () => {
        const res = await resquest(app).post(endpoint).send({
            name: "John",
            email: "johnexample.com",
            password: "123456789"
        })

        // Assert
        expect(res.status).toBe(400)
        expect(res.body._id).not.toBeDefined()
    })
})