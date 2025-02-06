import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        toast.error("Couldn't Sign up");
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      toast('SignUp Successfull!', {
        icon: '👏',
      });
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error("Something went wrong!"); 
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold py-7">Sign Up</h1>
      <form disable={loading} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg outline-none"
          id="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg outline-none"
          id="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg outline-none"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="border p-3 bg-slate-600 text-white rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        
      </form>
      <div className="flex gap-3 pt-3">
        Have an account?
        <Link to="/sign-in">
          <span className="text-blue-700 cursor-pointer">sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
