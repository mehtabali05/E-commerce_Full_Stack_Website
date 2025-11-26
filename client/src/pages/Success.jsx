import React from "react";
import { useNavigate } from "react-router-dom";


const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-success bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Back to Home
        </button>
      </div>

    </div>
  );
};

export default Success;
