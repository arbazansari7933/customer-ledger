import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function StockPage() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // fetch categories
  useEffect(() => {
    api.get("/product/categories").then(res => {
      setCategories(res.data);
      setSelectedCategory(res.data[0]); // auto select first
    });
  }, []);

  // fetch products
  useEffect(() => {
    if (!selectedCategory) return;

    api.get(`/product/categories/${selectedCategory}`)
      .then(res => setProducts(res.data));

  }, [selectedCategory]);

  // filter search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <div className="min-h-screen bg-gray-100 p-4">

    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">Stock</h1>

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-52"
          />

          {/* 🔥 ADD STOCK BUTTON */}
          <button
            onClick={() => window.location.href = "/addstock"}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Stock
          </button>

        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex gap-3 overflow-x-auto mb-4 pb-2">

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm
              ${selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-white border hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* 🔥 LIST VIEW */}
      <div className="space-y-3">

        {filteredProducts.map(p => {

          const stockColor =
            p.stock === 0
              ? "text-red-600"
              : p.stock < 5
              ? "text-yellow-600"
              : "text-green-600";

          return (
            <div
              key={p._id}
              className="bg-white rounded-lg p-4 shadow flex justify-between items-center"
            >

              {/* LEFT SIDE */}
              <div>
                <h2 className="font-semibold text-gray-800">
                  {p.name}
                </h2>

                <p className="text-sm text-gray-500">
                  ₹{p.price}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">

                <p className={`font-semibold ${stockColor}`}>
                  {p.stock === 0
                    ? "Out of stock"
                    : `Stock: ${p.stock}`
                  }
                </p>

              </div>

            </div>
          );
        })}

      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      )}

    </div>
  </div>
);
}