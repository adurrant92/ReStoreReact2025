import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),      // validates the email is a string 
    password: z.string().min(6, {
        message: 'Password must be at least 6 charactors '
    })
});

export type loginSchema = z.infer<typeof loginSchema>;