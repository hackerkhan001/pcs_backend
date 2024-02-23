import {object , string, TypeOf } from 'zod';

const createContactUserInputSchema = {
 body : object({
    name: string({
        required_error:"Name is required",
    }).min(3).max(20),
    email: string({
        required_error:"Email is require"
    }).email("It is not a valid email"),
    subject: string({
        required_error: "Subject is required"
    }),
    number : string({
        required_error:"Number is required",
    }).max(13),
    message : string().optional()
 })
}

export const UserInput = object(createContactUserInputSchema);
export type  UserInputType = TypeOf<typeof UserInput>;