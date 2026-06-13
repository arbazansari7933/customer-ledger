import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/id/${id}`);
      setProduct(res.data);
    } catch (error) {
      alert("Product not found");
      navigate("/stock");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete ${product.name}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product deleted successfully");
      navigate("/stocks");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error deleting product"
      );
    }
  };

  const updateStock = async (change) => {
  try {
    const res = await api.patch(
      `/products/${id}/stock`,
      { change }
    );

    setProduct(res.data.product);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Error updating stock"
    );
  }
};

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const stockColor =
    product.stock === 0
      ? "text-red-600"
      : product.stock < 5
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-xl"
          >
            ←
          </button>

          <h1 className="text-2xl font-bold">
            Product Details
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-5 space-y-4">

          <div>
            <p className="text-gray-500 text-sm">
              Product Name
            </p>
            <p className="font-semibold text-lg">
              {product.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Category
            </p>
            <p>{product.category}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Price
            </p>
            <p>₹{product.price}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Discount
            </p>
            <p>{product.discount}%</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              GST
            </p>
            <p>{product.gst}%</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Product Code
            </p>
            <p className="font-mono">
              {product.productCode}
            </p>
          </div>

          
          
          <div className="flex justify-between items-center">

  <div>
    <p className="text-gray-500 text-sm">
      Stock
    </p>

    <p className={`text-lg font-semibold ${stockColor}`}>
      {product.stock === 0
        ? "Out of Stock"
        : `${product.stock} Units`}
    </p>
  </div>

  <div className="flex items-center gap-3">

    <button
      onClick={() => updateStock(-1)}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-300 bg-red-50 text-red-600 text-xl font-bold hover:bg-red-100 active:scale-95 transition"
    >
      −
    </button>

    <button
      onClick={() => updateStock(1)}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-green-300 bg-green-50 text-green-600 text-xl font-bold hover:bg-green-100 active:scale-95 transition"
    >
      +
    </button>

  </div>

</div>

        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium"
        >
          Delete Product
        </button>

      </div>

    </div>
  );
}