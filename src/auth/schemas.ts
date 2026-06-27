import z from "zod";
import { Header } from "./utils.js";

export const ZodAuthBearer = z.string().refine(value => value.startsWith("Bearer"), {
    message: "Authorization Header must start with Bearer"
}).refine(value => value.split(" ").length === 2, {
    message: "Authorization Header must contain a token"
})

export const APIkeySchema = z.object({
    [Header.API_KEY]: z.string({
        message: "API Key is required",
    }).min(1, "API Key is required")
});

export const authSchema = z.object({
    authorization: ZodAuthBearer,
});