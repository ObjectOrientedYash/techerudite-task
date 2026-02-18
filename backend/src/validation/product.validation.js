import z from 'zod';
export const productSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative(),
    categories: z.array(z.number())
});
