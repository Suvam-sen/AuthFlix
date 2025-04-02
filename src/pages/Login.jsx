import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import formValidation from "../utils/formValidation";

const Login = () => {
  const [loginErrors, setLoginErrors] = useState({});

  const email = useRef(null);
  const password = useRef(null);

  const authenticateUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {};
    } catch (error) {
      return {
        code: error.code,
        message: error.message,
      };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginErrors({});

    const validErrors = formValidation("", email.current.value, password.current.value);
    if (Object.keys(validErrors).length > 0) {
      setLoginErrors(validErrors);
      return;
    }

    const authError = await authenticateUser(email.current.value, password.current.value);

    if (authError.code) {
      setLoginErrors(authError);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200 p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white text-black p-6 sm:p-8 flex flex-col gap-6 sm:gap-10 rounded-3xl shadow-lg">
        <h2 className="text-center font-bold text-lg sm:text-2xl">Login Page</h2>
  
        <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your email"
              type="email"
              ref={email}
            />
            {loginErrors.email && (
              <p className="text-red-500">{loginErrors.email}</p>
            )}
          </div>
  
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your password"
              type="password"
              ref={password}
            />
            {loginErrors.password && (
              <p className="text-red-500">{loginErrors.password}</p>
            )}
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-xl w-40 mx-auto cursor-pointer"
          >
            Login
          </button>
        </form>
  
        <p className="text-center text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 cursor-pointer">
            Register
          </Link>
        </p>
  
        {loginErrors.code && (
          <p className="text-red-500">{`${loginErrors.code} - ${loginErrors.message}`}</p>
        )}
      </div>
    </div>
  );
  
};

export default Login;
