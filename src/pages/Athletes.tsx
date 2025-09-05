import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AthleteCard from "@/components/athletes/AthleteCard";
import SearchFilters from "@/components/search/SearchFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

const Athletes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  // Mock data for athletes
  const athletes = [
    {
      id: "1",
      name: "Michael Jordan",
      sport: "Basketball",
      position: "Shooting Guard",
      age: 21,
      location: "Chicago, IL",
      achievements: 15,
      stats: [
        { label: "PPG", value: "28.5" },
        { label: "RPG", value: "6.2" },
        { label: "APG", value: "5.4" },
      ],
      verified: true,
    },
    {
      id: "2",
      name: "Sarah Williams",
      sport: "Soccer",
      position: "Forward",
      age: 19,
      location: "Los Angeles, CA",
      achievements: 8,
      stats: [
        { label: "Goals", value: "24" },
        { label: "Assists", value: "12" },
        { label: "Games", value: "30" },
      ],
      verified: true,
    },
    {
      id: "3",
      name: "James Rodriguez",
      sport: "Football",
      position: "Quarterback",
      age: 18,
      location: "Miami, FL",
      achievements: 12,
      stats: [
        { label: "Yards", value: "3,200" },
        { label: "TDs", value: "28" },
        { label: "Comp%", value: "68.5" },
      ],
      verified: false,
    },
    {
      id: "4",
      name: "Emily Chen",
      sport: "Swimming",
      position: "Freestyle",
      age: 17,
      location: "San Francisco, CA",
      achievements: 20,
      stats: [
        { label: "100m", value: "52.8s" },
        { label: "200m", value: "1:54.2" },
        { label: "Medals", value: "15" },
      ],
      verified: true,
    },
    {
      id: "5",
      name: "Marcus Thompson",
      sport: "Track & Field",
      position: "Sprinter",
      age: 20,
      location: "Houston, TX",
      achievements: 10,
      stats: [
        { label: "100m", value: "10.2s" },
        { label: "200m", value: "20.8s" },
        { label: "400m", value: "46.5s" },
      ],
      verified: true,
    },
    {
      id: "6",
      name: "Jessica Martinez",
      sport: "Tennis",
      position: "Singles",
      age: 22,
      location: "Phoenix, AZ",
      achievements: 18,
      stats: [
        { label: "Ranking", value: "#12" },
        { label: "Win%", value: "78%" },
        { label: "Titles", value: "5" },
      ],
      verified: false,
    },
  ];

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
  };

  const handleReset = () => {
    console.log("Filters reset");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Athletes</h1>
          <p className="text-muted-foreground">
            Browse and connect with talented athletes from various sports
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search athletes by name, sport, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <SearchFilters
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          )}
          
          {/* Athletes Grid */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {athletes.map((athlete) => (
                <AthleteCard key={athlete.id} {...athlete} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Athletes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Athletes;