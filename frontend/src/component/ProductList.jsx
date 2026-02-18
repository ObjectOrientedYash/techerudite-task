<div className="grid gap-4">
    {products.map(p => (
        <div key={p.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{p.name}</h2>

            <div className="flex gap-2">
                {p.categories.map(c => (
                    <span key={c.id} className="bg-gray-200 px-2 py-1 text-sm rounded-full">
                        {c.name}
                    </span>
                ))}
            </div>

            <p className="text-sm text-gray-500">Added on {new Date(p.createdAt).toLocaleDateString()}</p>
        </div>
    ))}
</div>;
