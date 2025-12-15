import { useForm } from "react-hook-form";
import api from "../uitls/api";
import { useState } from "react";

export default function Signup() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");


  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);

      setMessage(res.data.message);
      setRole(res.data.roleAssigned);
      reset(); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white w-full max-w-sm rounded-2xl shadow-md p-6 sm:p-7 space-y-5"
  >
    <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800">
      Sign Up
    </h1>

    {message && (
      <p className="text-center text-red-500 text-sm">
        {message} Role: {role}
      </p>
    )}

    {/* NAME */}
    <div>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>

    {/* EMAIL */}
    <div>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    {/* PASSWORD */}
    <div>
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* BUTTON */}
    <button
      type="submit"
      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow transition"
    >
      Sign Up
    </button>

    {/* Login Link */}
    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <a href="/login" className="text-green-600 font-semibold hover:underline">
        Login
      </a>
    </p>

  </form>

</div>

  );
}
