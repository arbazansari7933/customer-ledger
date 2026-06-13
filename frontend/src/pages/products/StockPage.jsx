import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar";

export default function StockPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * p.stock),
    0
  );

  // fetch categories
  useEffect(() => {
    api.get("/products/categories").then(res => {
      setCategories(res.data);
      setSelectedCategory(res.data[0]); // auto select first
    });
  }, []);

  // fetch products
  useEffect(() => {
    if (!selectedCategory) return;

    api.get(`/products/categories/${selectedCategory}`)
      .then(res => setProducts(res.data));

  }, [selectedCategory]);
  // all product
  useEffect(() => {
    api.get("/products/").then(res => {
      setAllProducts(res.data);
    });
  }, []);

  // filter search

  const filteredProducts = (search
    ? allProducts
    : products
  ).filter(p => {
    const query = search.toLowerCase();

    return (
      p.name.toLowerCase().includes(query) ||
      String(p.price).includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-16">
      <div className="max-w-5xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Stock</h1>

          <button
            onClick={() => window.location.href = "/addstock"}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Stock
          </button>
        </div>

        {/* 🔥 STOCK SUMMARY (LIKE BILL UI) */}
        <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">

          {/* TOTAL ITEMS */}
          <div className="text-center w-1/2">
            <p className="text-gray-500 text-sm">Total Items</p>
            <p className="text-xl font-bold text-green-600">
              {totalStock}
            </p>
          </div>

          {/* DIVIDER */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* TOTAL VALUE */}
          <div className="text-center w-1/2">
            <p className="text-gray-500 text-sm">Stock Value</p>
            <p className="text-xl font-bold text-blue-600">
              ₹{totalValue.toFixed(0)}
            </p>
          </div>

        </div>

        {/* 🔥 SEARCH BAR (FULL WIDTH BELOW SUMMARY) */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg shadow-sm"
          />
        </div>

        {/* 🔥 CATEGORY TABS */}
        {search === "" && (
          <div className="flex gap-2 overflow-x-auto mb-4 pb-2">

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
        )}

        {/* 🔥 PRODUCT LIST */}
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
                onClick={() => navigate(`/products/${p._id}`)}
                className="bg-white rounded-lg p-4 shadow flex justify-between items-center cursor-pointer hover:shadow-md"
              >

                {/* LEFT */}
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {p.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ₹{p.price}
                  </p>
                </div>

                {/* RIGHT */}
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

        {/* EMPTY */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No products found
          </p>
        )}

      </div>

      <BottomNavbar />
    </div>
  );
}