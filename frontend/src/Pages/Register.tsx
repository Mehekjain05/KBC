import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registration successful:", result);
        navigate("/game"); // Redirect to game screen after registration
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
      <h2 className="text-3xl text-white mb-6 font-extrabold">Register to Play</h2>

      <form
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl space-y-4 h-[400px]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          className="w-full p-3 mt-5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full p-3 mt-5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        {/* Show error message if there's an issue */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Gradient Border Button */}
        <div className="relative inline-flex items-center justify-center w-full group mt-5">
          <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full w-full"
          >
            Register
          </button>
        </div>
      </form>

      {/* <p className="text-gray-400 mt-4">
        Already have an account?{" "}
        <NavLink to="/login" className="text-cyan-400 hover:underline">
          Login here
        </NavLink>
      </p> */}
    </div>
  );
};

export default Register;
