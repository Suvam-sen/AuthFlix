import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white text-center px-6">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
      <p className="text-neutral-400 mb-6">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/dashboard" 
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-semibold transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
