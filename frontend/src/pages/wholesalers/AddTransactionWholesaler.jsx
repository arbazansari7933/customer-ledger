import api from "../../uitls/api";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddTransactionWholesaler = () => {
  const location = useLocation();
  const type = location.state?.type; // give / receive
  const { id } = useParams();
  const navigate = useNavigate();   // ⭐ REQUIRED FIX

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // ⭐ Set type automatically in form
  useEffect(() => {
    setValue("type", type);
  }, [type, setValue]);

  // ⭐ Submit handler
  const onSubmit = async (data) => {
    if(isSubmitting) return;
    try {
      setIsSubmitting(true);
      const res = await api.post(`http://localhost:5000/api/wholesalers/${id}/transactions`, data);
      setMessage(res.data.message);

      reset();

      // ⭐ Navigate back to wholesaler detail
      navigate(`/wholesaler-details/${id}`);
    } catch (error) {
      console.log("TX ERROR:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6">

  <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-7">
    
    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5 text-center">
      Add {type === "give" ? "Give (Payment)" : "Receive (Stock)"} Transaction
    </h1>

    {/* Message */}
    {message && (
      <p className="text-center text-sm mb-3 text-green-600 font-medium">
        {message}
      </p>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* AMOUNT */}
      <div>
        <input
          type="number"
          placeholder="Enter Amount"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
          {...register("amount", {
            required: "Amount is required!",
            valueAsNumber: true,
          })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* NOTE */}
      <div>
        <input
          type="text"
          placeholder="Enter Note (optional)"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
          {...register("note")}
        />
      </div>

      {/* BUTTON */}
      <button
      disabled={isSubmitting}
        type="submit"
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition"
      >
        Add Transaction
      </button>

    </form>
  </div>
</div>

  );
};

export default AddTransactionWholesaler;
