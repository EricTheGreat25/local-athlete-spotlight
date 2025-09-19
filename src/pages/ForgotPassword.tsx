import { Link } from "react-router-dom";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-4">
            <span className="text-3xl font-bold">ATHLETIX</span>
          </Link>
          <p className="text-muted-foreground">
            Reset your password to get back to your athletic journey
          </p>
        </div>
        
        <ForgotPasswordForm />
        
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;