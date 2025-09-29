import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useSports } from "@/hooks/useSports";

// Define the shape of the data this component will pass up
interface Step2Data {
  sport: string;
  bio: string;
}

interface RegistrationStep2Props {
  // This function now expects the data from this step
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
}

const RegistrationStep2 = ({ onComplete, onBack }: RegistrationStep2Props) => {
  const { sports, loading: sportsLoading, error: sportsError } = useSports();
  const [formData, setFormData] = useState<Step2Data>({
    sport: "",
    bio: "",
  });

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
    
    // Pass this component's data up to the parent to handle the final submission
    onComplete(formData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Step 2 of 2 - Tell us about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sport">Primary Sport</Label>
            <Select 
              value={formData.sport} 
              onValueChange={(value) => setFormData({ ...formData, sport: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your primary sport" />
              </SelectTrigger>
              <SelectContent>
                {sportsLoading ? (
                  <SelectItem value="loading" disabled>Loading...</SelectItem>
                ) : sportsError ? (
                  <SelectItem value="error" disabled>Error loading sports</SelectItem>
                ) : (
                  sports.map((sport) => (
                    <SelectItem key={sport.sport_id} value={sport.sport_id.toString()}>
                      {sport.sport_name}
                    </SelectItem>
                  ))
                )}
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