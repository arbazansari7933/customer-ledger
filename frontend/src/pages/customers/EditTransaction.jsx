import api from "../../uitls/api";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const EditTransaction = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const { transactionId } = useParams();
    const location = useLocation()
    const { type, customerId } = location.state || {}


    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            amount: "",
            type: "",
            note: "",
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await api.put(`/customers/${customerId}/transaction/${transactionId}`, data);
            setMessage(res.data.message);
            reset();
            // ⭐ Navigate back to transaction detail
            navigate(`/transaction-detail/${transactionId}`, {
                state: { customerId }
            });
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong!")
        }
    }
    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get(`/customers/${customerId}/transaction-details/${transactionId}`);
                // reset(res.data.customer);   // ⭐ THE MAGIC LINE
                const tx = res.data.transaction;
                setValue("amount", tx.amount)
                setValue("note", tx.note)
                setValue("type", tx.type)
            } catch (error) {
                console.log("ERROR →", err);

            }

        };

        load();
    }, [customerId, transactionId, setValue]);
    console.log("id:", transactionId);

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-7">

                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5 text-center">
                    Edit Transaction
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
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition"
                    >
                        Add Transaction
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditTransaction
