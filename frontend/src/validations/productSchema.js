import {z} from 'zod';

export const productSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().optional(),
    quantity: z.number().min(0, 'Quantity must be 0 or more'),
    categories: z.array(z.number()).min(1, 'Select at least one category')
});
