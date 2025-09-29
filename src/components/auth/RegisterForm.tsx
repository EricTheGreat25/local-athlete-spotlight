import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/utilities/utils";
import RegistrationStep2 from "./RegistrationStep2";
import { validatePassword } from "@/utilities/utils";
import { supabase } from "@/utilities/supabase"; 

type UserRole = "athlete" | "scout" | "organizer" | "fan";
type Gender = "male" | "female" | "other";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "athlete" as UserRole,
    gender: "male" as Gender,
  });
  const [birthDate, setBirthDate] = useState<Date>();
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // This function is for the "Next" button in Step 1
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid } = validatePassword(formData.password);
    if (!isValid) {
      toast.error("Password does not meet requirements");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!birthDate) {
      toast.error("Please select your date of birth");
      return;
    }
    
    // Validation passed, move to step 2
    setCurrentStep(2);
  };

  // This function is triggered by the "Register" button in Step 2
  const handleCompleteRegistration = async (step2Data: { sport: string; bio: string }) => {
    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }
    if (!authData.user) {
      toast.error("Authentication failed. Please try again.");
      return;
    }

    // 2. Insert the combined data into your 'users' table
    const { error: userError } = await supabase.from("users").insert({
      user_id: authData.user.id, // The ID from the newly created auth user
      fullname: formData.name, // Data from Step 1
      role: formData.role, // Data from Step 1
      gender: formData.gender, // Data from Step 1
      birthdate: birthDate ? format(birthDate, "yyyy-MM-dd") : null, // Data from Step 1
      sport_id: parseInt(step2Data.sport, 10), // Data from Step 2
      bio: step2Data.bio, // Data from Step 2
      registration_date: new Date().toISOString(),
    });

    if (userError) {
      toast.error(`Error saving your profile: ${userError.message}`);
      console.log(userError);
      await supabase.auth.admin.deleteUser(authData.user.id);
      return;
    }

    toast.success("Registration successful! Please check your email to verify your account.");
    navigate("/login");
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const { criteria } = validatePassword(newPassword);
    setPasswordCriteria(criteria);
    setFormData({
      ...formData,
      password: newPassword,
    });
  };

  // Conditional rendering based on the current step
  if (currentStep === 2) {
    return (
      <RegistrationStep2 
        onComplete={handleCompleteRegistration}
        onBack={handleBackToStep1}
      />
    );
  }

  // The JSX for Step 1
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Step 1 of 2 - Basic Information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* All the inputs for Step 1 go here... */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handlePasswordChange} required />
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className={passwordCriteria.minLength ? "text-green-600" : ""}>✓ At least 8 characters</p>
              <p className={passwordCriteria.hasUppercase ? "text-green-600" : ""}>✓ At least one uppercase letter</p>
              <p className={passwordCriteria.hasLowercase ? "text-green-600" : ""}>✓ At least one lowercase letter</p>
              <p className={passwordCriteria.hasNumber ? "text-green-600" : ""}>✓ At least one number</p>
              <p className={passwordCriteria.hasSpecialChar ? "text-green-600" : ""}>✓ At least one special character</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={birthDate} onSelect={setBirthDate} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear()} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="athlete" id="athlete" />
                <Label htmlFor="athlete">Athlete</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scout" id="scout" />
                <Label htmlFor="scout">Scout/Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organizer" id="organizer" />
                <Label htmlFor="organizer">Event Organizer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fan" id="fan" />
                <Label htmlFor="fan">Fan/Supporter</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;