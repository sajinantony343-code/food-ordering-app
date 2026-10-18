import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";
import { loginFailed, loginStarted, loginSucceeded } from "../store/authSlice";

export default function SignupPage() {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (token) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    dispatch(loginStarted());
    try {
      const { data } = await api.post("/auth/signup", { name, email, password });
      dispatch(loginSucceeded(data));
      navigate("/", { replace: true });
    } catch (signupError) {
      dispatch(loginFailed(signupError.response?.data?.message || "Could not create your account. Please check the backend and try again."));
    }
  };

  return (
    <div className="page">
      <section className="page-hero compact"><p className="eyebrow">JOIN FOODIE</p><h1>Create your account.</h1><p>Use a Gmail address to get started.</p></section>
      <section className="section auth-section">
        <form className="auth-card" onSubmit={submit}>
          <h2>Sign up</h2>
          <label>Your name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label>
          <label>Gmail address<input type="email" required pattern="[^\s@]+@gmail\.com" title="Use an address ending in @gmail.com" autoComplete="email" placeholder="you@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Password (at least 8 characters)<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <p role="alert" className="form-error">{error}</p>}
          <button className="btn btn-primary full-width" disabled={status === "loading"}>{status === "loading" ? "Creating account…" : "Create account"}</button>
          <p className="demo-credentials">Each Gmail address can register once. If it is already registered, log in instead.</p>
          <p>Already registered? <Link to="/login">Log in</Link></p>
        </form>
      </section>
    </div>
  );
}
