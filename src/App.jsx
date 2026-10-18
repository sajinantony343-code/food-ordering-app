import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FoodAdminPage from "./pages/FoodAdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { logout } from "./store/authSlice";

const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const FoodDetailsPage = lazy(() => import("./pages/FoodDetailsPage"));

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [tokenCopied, setTokenCopied] = useState(false);
  useEffect(() => {
    const expired = () => dispatch(logout());
    window.addEventListener("foodie:session-expired", expired);
    return () => window.removeEventListener("foodie:session-expired", expired);
  }, [dispatch]);

  // Make login the entry gate for every page, including home and menu.
  if (!token && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="app">
      <Navbar />

      <div className="session-bar">
        {token ? <>
          <span>Signed in as {user?.email}</span>
          <Link to="/admin/foods">Manage food</Link>
          <details className="token-details">
            <summary>View token</summary>
            <div className="token-panel">
              <label htmlFor="auth-token">Your access token (expires in 2 hours)</label>
              <textarea id="auth-token" readOnly value={token} rows="4" />
              <button onClick={() => navigator.clipboard.writeText(token).then(() => { setTokenCopied(true); window.setTimeout(() => setTokenCopied(false), 2000); })}>{tokenCopied ? "Copied" : "Copy token"}</button>
            </div>
          </details>
          <button onClick={() => dispatch(logout())}>Log out</button>
        </> : <Link to="/login">Login</Link>}
      </div>

      <main>
        <Suspense fallback={<p className="menu-message" role="status">Loading page…</p>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/food/:foodId" element={<FoodDetailsPage />} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/success" element={<OrderSuccessPage />} />
            <Route path="/admin/foods" element={<ProtectedRoute><FoodAdminPage /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
