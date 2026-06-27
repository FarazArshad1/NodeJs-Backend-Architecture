import z from "zod"

export const userLoginScehma = z.object({
    email: z.email({
        message: "Invalid Email"
    }),
    password: z.string()
})

export const userRegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email({
        message: "Invalid Email"
    }),
    password: z.string().min(6, "Password must be at least 6 characters long")
})