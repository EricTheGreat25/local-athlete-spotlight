import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface RegistrationStep2Props {
  onComplete: () => void;
  onBack: () => void;
}

const RegistrationStep2 = ({ onComplete, onBack }: RegistrationStep2Props) => {
  const [formData, setFormData] = useState({
    sport: "",
    bio: "",
  });

  const sports = [
    "Basketball",
    "Football", 
    "Volleyball",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sport) {
      toast.error("Please select a sport");
      return;
    }
    
    if (!formData.bio.trim()) {
      toast.error("Please write a bio");
      return;
    }
    
    // Complete registration
    toast.success("Registration completed successfully!");
    onComplete();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Tell us about yourself and your sport</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sport">Primary Sport</Label>
            <Select value={formData.sport} onValueChange={(value) => setFormData({ ...formData, sport: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself, your experience, achievements, goals..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="min-h-[120px]"
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.bio.length}/500 characters
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationStep2;