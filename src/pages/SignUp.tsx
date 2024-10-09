

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    try {
      const newCreatedUserData = await signup(email, password);
      console.log(newCreatedUserData);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/characters");
    } catch (error) {
         if (error instanceof Error) {
            if (error.message.includes('auth/weak-password')) {
                setError('Password should be at least 6 characters.');
            } else if (error.message.includes('auth/email-already-in-use')) {
                setError('Email is already in use.');
            } else {
                setError('An error occurred. Please try again.'); 
            }
        } else {
            throw error; 
        }
    }


  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
           <span
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )}
          </span>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white rounded p-2 w-full hover:bg-red-600"
        >
          Sign Up
        </button>
        <p className="mt-4">
          Have an account already?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
