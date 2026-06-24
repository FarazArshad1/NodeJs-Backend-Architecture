import z from "zod";
import { Header } from "./utils.js";

export const APIkeySchema = z.object({
    [Header.API_KEY]: z.string({
        message: "API Key is required",
    }).min(1, "API Key is required"),
});