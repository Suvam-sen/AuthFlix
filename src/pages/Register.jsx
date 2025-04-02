import { useState } from "react";
import { Link } from "react-router-dom";
import formValidation from "../utils/formValidation";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  // const [registerErrors, setRegisterErrors] = useState({})
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    errors: {}
  })

  const authenticateUser = async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {};
      } catch (error) {
        return {
          code: error.code,
          message: error.message,
        };
      }
    };

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev, errors: {}
    }))

    const validErrors = formValidation(
      formData.username,
      formData.email,
      formData.password
    );

    if (Object.keys(validErrors).length > 0) {
      setFormData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          ...validErrors
        }
      }));
      return;
    }

    const authError = await authenticateUser(formData.email, formData.password)

    if (authError.code) {
      setFormData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          code: authError.code,
          message: authError.message
        }
      }));
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200 p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white text-black p-6 sm:p-8 flex flex-col gap-6 sm:gap-10 rounded-3xl shadow-lg">
        <h2 className="text-center font-bold text-lg sm:text-2xl">Register Page</h2>
  
        <form onSubmit={handleRegister} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {formData.errors.username && (
              <p className="text-red-500">{formData.errors.username}</p>
            )}
          </div>
  
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formData.errors.email && (
              <p className="text-red-500">{formData.errors.email}</p>
            )}
          </div>
  
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formData.errors.password && (
              <p className="text-red-500">{formData.errors.password}</p>
            )}
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-xl w-40 mx-auto cursor-pointer"
          >
            Register
          </button>
        </form>
  
        <p className="text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 cursor-pointer">
            Login
          </Link>
        </p>
  
        {formData.errors.code && (
          <p className="text-red-500">{`${formData.errors.code} - ${formData.errors.message}`}</p>
        )}
      </div>
    </div>
  );
  
};

export default Register;