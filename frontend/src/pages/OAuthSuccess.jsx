import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home2", { replace: true });
    } else {
      navigate("/login");
    }
  }, []);

  return <p className="text-center mt-20">Seeing the world 🌍…</p>;
}
