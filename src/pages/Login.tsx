import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Trophy } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-4">
            <span className="text-3xl font-bold">ATHLETIX</span>
          </Link>
          <p className="text-muted-foreground">
            Welcome back to your athletic journey
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;