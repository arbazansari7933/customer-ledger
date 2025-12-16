import { useForm } from "react-hook-form";
import api from "../uitls/api";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  const onSubmit= async(data)=>{
    try {
        const res=await api.post("/auth/login", data);
        localStorage.setItem("token", res.data.token)
        setMessage(res.data.message);
        console.log("Login Response:", res.data);
        reset();
        navigate(`/`)
        

    } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong")
        
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white w-full max-w-sm rounded-2xl shadow-md p-6 sm:p-7 space-y-5"
  >
    <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800">
      Login
    </h1>

    {/* Error Message */}
    {message && (
      <p className="text-center text-red-500 text-sm">{message}</p>
    )}

    {/* Email */}
    <div>
      <input
        type="email"
        placeholder="Enter email"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
        {...register("email", { required: "Email is required!" })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    {/* Password */}
    <div>
      <input
        type="password"
        placeholder="Enter password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
        {...register("password", { required: "Password is required!" })}
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow transition"
    >
      Login
    </button>

    {/* Sign Up Link */}
    <p className="text-center text-sm text-gray-600">
      Not have an account?{" "}
      <a href="/signup" className="text-green-600 font-semibold hover:underline">
        Sign Up
      </a>
    </p>
  </form>

</div>

  )
}

export default Login
