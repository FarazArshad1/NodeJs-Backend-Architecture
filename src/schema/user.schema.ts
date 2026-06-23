import z from "zod"

export const userLoginScehma = z.object({
    email: z.email({
        message : "Invalid Email"
    }),
    password : z.string()
})