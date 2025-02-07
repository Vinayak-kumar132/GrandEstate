import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signInStart,signInfailure,signInSuccess} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        toast.error("Couldn't Sign In");
        dispatch(signInfailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      
      toast.success("Signin Successfull");
      navigate("/");
      
    } catch (error) {
      dispatch(signInfailure(error.message));
      toast.error("Something went wrong!"); 
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold py-7">Sign In</h1>
      <form disable={loading} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          required
          className="border p-3 rounded-lg outline-none"
          id="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          required
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-3 pt-3">
       Don't have an account?
        <Link to="/sign-up">
          <span className="text-blue-700 cursor-pointer">sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

