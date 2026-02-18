import {useState, useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {GET_PRODUCTS, GET_CATEGORIES} from './graphql/queries.js';
import {ADD_PRODUCT, DELETE_PRODUCT} from './graphql/mutation.js';
import ProductForm from './component/ProductForm.jsx';

export default function App() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Debounce Search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    const {data: catData} = useQuery(GET_CATEGORIES);

    const {data, loading, refetch} = useQuery(GET_PRODUCTS, {
        variables: {
            page,
            limit: 5,
            search: debouncedSearch,
            categories: selectedCategories
        }
    });

    const [addProduct] = useMutation(ADD_PRODUCT);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const handleAdd = async formData => {
        try {
            await addProduct({variables: formData});
            toast.success('Product added successfully 🎉');
            refetch();
        } catch (err) {
            toast.error(err.message || 'Failed to add product');
        }
    };

    const handleDelete = async id => {
        try {
            await deleteProduct({variables: {id}});
            toast.success('Product deleted successfully');
            refetch();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const totalPages = Math.ceil((data?.products?.total || 0) / 5);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center">Product Inventory</h1>

                <ProductForm categories={catData?.categories || []} onSubmit={handleAdd} />

                <div className="bg-white p-4 rounded-xl shadow space-y-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full px-4 py-2 border rounded-lg"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <div className="relative w-full max-w-xs">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full px-4 py-2 border rounded-lg bg-white text-left">
                            {selectedCategories.length > 0 ? `${selectedCategories.length} selected` : 'Filter by categories'}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
                                {catData?.categories?.map(cat => {
                                    const id = Number(cat.id);
                                    const isChecked = selectedCategories.includes(id);

                                    return (
                                        <label key={id} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => {
                                                    if (isChecked) {
                                                        setSelectedCategories(selectedCategories.filter(c => c !== id));
                                                    } else {
                                                        setSelectedCategories([...selectedCategories, id]);
                                                    }
                                                    setPage(1);
                                                }}
                                                className="mr-2"
                                            />
                                            {cat.name}
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-lg font-semibold">Products</h2>

                    {loading && <p className="text-gray-500">Loading...</p>}

                    {data?.products?.data?.length === 0 && <p className="text-gray-500">No products found.</p>}

                    {data?.products?.data?.map(product => (
                        <div key={product.id} className="border rounded-lg p-4 flex justify-between">
                            <div>
                                <h3 className="font-semibold">{product.name}</h3>

                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {product.categories?.map(cat => (
                                        <span key={cat.id} className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-xs text-gray-500 mt-2">
                                    Added on: {product.createdAt ? new Date(Number(product.createdAt)).toLocaleDateString() : '-'}
                                </p>
                            </div>

                            <div className="text-right space-y-2">
                                <p>Qty: {product.quantity}</p>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({length: totalPages}, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
