import z from "zod";
import { Header } from "./utils.js";

export const APIkeySchema = z.object({
    apiKey : z.object({
        [Header.API_KEY] : z.string().nonempty("API Key is required")
    })
})