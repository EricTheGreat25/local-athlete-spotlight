import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { Trophy } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-4">
            <span className="text-3xl font-bold">ATHLETIX</span>
          </Link>
          <p className="text-muted-foreground">
            Join thousands of athletes and scouts
          </p>
        </div>
        
        <RegisterForm />
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;