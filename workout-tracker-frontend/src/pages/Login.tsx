import { useState } from "react";
import { login } from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Email dan password wajib diisi.");

    setLoading(true);
    try {
      const response = await login(email, password);
      toast.success("Login berhasil!");
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (error: any) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/user-not-found":
          toast.error("Email tidak ditemukan.");
          break;
        case "auth/wrong-password":
          toast.error("Password salah.");
          break;
        case "auth/invalid-email":
          toast.error("Format email tidak valid.");
          break;
        default:
          toast.error("Gagal login.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? <>Logging in <span className="spinner" /></> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
