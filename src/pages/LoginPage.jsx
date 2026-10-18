import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { loginFailed, loginStarted, loginSucceeded } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  if (token) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    dispatch(loginStarted());
    try {
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(loginSucceeded(data));
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (loginError) {
      dispatch(loginFailed(loginError.response?.data?.message || "Could not log in. Check that the backend is running."));
    }
  };

  return (
    <div className="page">
      <section className="page-hero compact"><p className="eyebrow">WELCOME BACK</p><h1>Log in to Foodie.</h1><p>Sign in to manage your cart and place an order.</p></section>
      <section className="section auth-section">
        <form className="auth-card" onSubmit={submit}>
          <h2>Login</h2>
          <label>Gmail address<input type="email" required pattern="[^\s@]+@gmail\.com" title="Use an address ending in @gmail.com" placeholder="you@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <p role="alert" className="form-error">{error}</p>}
          <button className="btn btn-primary full-width" disabled={status === "loading"}>{status === "loading" ? "Logging in…" : "Log in"}</button>
          <p className="demo-credentials">Use the Gmail address and password you registered.</p>
          <p>New here? <Link to="/signup">Create an account</Link></p>
        </form>
      </section>
    </div>
  );
}
