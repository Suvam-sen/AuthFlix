import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./store/userSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "./utils/axiosConfig";
import { setBannerData, setImageURL } from "./store/movieoSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check user authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
        navigate("/dashboard");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // ✅ Fetch Trending Movies & Configuration
  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get("/trending/all/week");
        dispatch(setBannerData(response.data.results));
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    const fetchConfiguration = async () => {
      try {
        const response = await axios.get("/configuration");
        dispatch(
          setImageURL(response.data.images.secure_base_url + "original")
        );
      } catch (error) {
        console.log("Error fetching configuration:", error);
      }
    };

    fetchTrendingData();
    fetchConfiguration();
  }, [dispatch]);

  // ✅ Hide Header/Footer when on Login or Register pages
  const hideLayout =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <main
      className={`${
        hideLayout
          ? "h-screen flex justify-center items-center bg-blue-200"
          : "pb-14 lg:pb-0"
      }`}
    >
      {!hideLayout && <Header />}
      <div
        className={
          hideLayout
            ? "w-full flex justify-center items-center"
            : "min-h-[90vh]"
        }
      >
        <Outlet />
      </div>
      {!hideLayout && <Footer />}
      {!hideLayout && <MobileNavigation />}
    </main>
  );
};

export default App;
