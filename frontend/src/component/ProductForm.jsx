import {useState} from 'react';
import {productSchema} from '../validations/productSchema.js';

export default function ProductForm({onSubmit, categories}) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        quantity: '',
        categories: []
    });
    console.log('Incoming categories:', categories);
    console.log('Selected categories:', form.categories);

    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleCategoryChange = id => {
        const numericId = Number(id);

        if (form.categories.includes(numericId)) {
            setForm({
                ...form,
                categories: form.categories.filter(c => c !== numericId)
            });
        } else {
            setForm({
                ...form,
                categories: [...form.categories, numericId]
            });
        }
    };

    const handleSubmit = () => {
        try {
            const parsedData = productSchema.parse({
                ...form,
                quantity: Number(form.quantity)
            });
            console.log('38===>', parsedData);
            onSubmit(parsedData);

            setForm({
                name: '',
                description: '',
                quantity: '',
                categories: []
            });

            setError('');
        } catch (err) {
            console.log('Zod error:', err);
            setError(err.errors?.[0]?.message || 'Validation failed');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add New Product</h2>

            {error && <div className="bg-red-100 text-red-600 p-2 rounded text-sm">{error}</div>}

            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div>
                <p className="text-sm font-medium mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                    {categories?.map(cat => {
                        const id = Number(cat.id);

                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => handleCategoryChange(id)}
                                className={`px-3 py-1 rounded-full text-sm border transition ${
                                    form.categories.includes(id) ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                }`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Add Product
            </button>
        </div>
    );
}
