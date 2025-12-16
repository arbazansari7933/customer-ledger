import api from "../../uitls/api";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const AddWholesaler = () => {
  const navigate = useNavigate();  
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit=async(data)=>{
    if(isSubmitting) return;
    try {
      setIsSubmitting(true);
      const res=await api.post("/wholesalers/add-wholesaler", data);
      setMessage(res.data.message);
      reset();
      navigate(`/wholesalers`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6">

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white w-full max-w-sm rounded-2xl shadow-md p-6 sm:p-7 space-y-5"
  >
    <h1 className="text-3xl font-semibold text-center text-gray-800">
      Add Wholesaler
    </h1>

    {/* MESSAGE */}
    {message && (
      <p className="text-center text-sm text-green-600 font-medium">
        {message}
      </p>
    )}

    <div className="space-y-4">

      {/* NAME */}
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
          {...register("name", { required: "Name is required!" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <input
          type="text"
          placeholder="Enter Phone"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone must be 10 digits",
            },
          })}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* ADDRESS */}
      <div>
        <input
          type="text"
          placeholder="Enter Address (optional)"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
          {...register("address")}
        />
      </div>

    </div>

    {/* BUTTON */}
    <button
    disabled={isSubmitting}
      type="submit"
      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow transition"
    >
      Add Wholesaler
    </button>

  </form>
</div>

  )
}

export default AddWholesaler
