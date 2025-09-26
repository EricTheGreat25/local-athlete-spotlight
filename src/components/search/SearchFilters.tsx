import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const SearchFilters = ({ onFilterChange, onReset }: SearchFiltersProps) => {
  const [ageRange, setAgeRange] = useState([16, 25]);
  
  const sports = ["Basketball", "Football", "Soccer", "Baseball", "Track & Field", "Swimming", "Tennis"];
  const positions = {
    Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
    Football: ["Quarterback", "Running Back", "Wide Receiver", "Linebacker", "Defensive Back"],
    Soccer: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  };

  const handleAgeRangeChange = (value: number[]) => {
    setAgeRange(value);
    onFilterChange({ ageRange: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </span>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Sport</Label>
          <Select onValueChange={(value) => onFilterChange({ sport: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              {sports.map((sport) => (
                <SelectItem key={sport} value={sport.toLowerCase()}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Position</Label>
          <Select onValueChange={(value) => onFilterChange({ position: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Position</SelectItem>
              {positions.Basketball.map((position) => (
                <SelectItem key={position} value={position.toLowerCase()}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
          <div className="px-2">
            <Slider
              value={ageRange}
              max={35}
              min={14}
              step={1}
              className="mb-2"
              onValueChange={handleAgeRangeChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>14</span>
              <span>35</span>
            </div>
          </div>
        </div>
        
        
        <Button className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;