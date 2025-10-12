import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");
    const type = hashParams.get("type");

    if (type === "signup" && access_token && refresh_token) {
      toast.success("Email verified successfully! You can now log in.");
      navigate("/login", { replace: true });
    } else {
      toast.error("Invalid or expired verification link.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <p className="text-center mt-10">Verifying your email...</p>;
};

export default AuthRedirect;
