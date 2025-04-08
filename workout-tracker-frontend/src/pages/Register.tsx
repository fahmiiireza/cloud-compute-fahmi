import { useState } from "react";
import { register } from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email || !password) return toast.error("Semua field wajib diisi.");
    if (password.length < 6) return toast.error("Password minimal 6 karakter.");

    setLoading(true);
    try {
      await register(displayName, email, password);
      toast.success("Registrasi berhasil! Cek email untuk verifikasi.");
      navigate("/login");
    } catch (error: any) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          toast.error("Email sudah terdaftar.");
          break;
        case "auth/invalid-email":
          toast.error("Format email tidak valid.");
          break;
        case "auth/weak-password":
          toast.error("Password terlalu lemah.");
          break;
        default:
          toast.error("Registrasi gagal.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? <>Registering <span className="spinner" /></> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
