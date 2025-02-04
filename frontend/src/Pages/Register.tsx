import React from "react";
import { NavLink } from "react-router-dom";

const Register: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
            
            <h2 className="text-3xl text-white mb-6 font-extrabold">Register to Play</h2>
            <form className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl space-y-4 h-[400px]">
                
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 mt-5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mt-5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mt-5 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

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

            <p className="text-gray-400 mt-4">
                Already have an account?{" "}
                <NavLink to="/login" className="text-cyan-400 hover:underline">
                    Login here
                </NavLink>
            </p>
        </div>
    );
};

export default Register;
