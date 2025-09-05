import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AthleteCard from "@/components/athletes/AthleteCard";
import SearchFilters from "@/components/search/SearchFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Filter, Users, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);

  // Mock data
  const searchResults = [
    {
      id: "1",
      name: "Alex Johnson",
      sport: "Basketball",
      position: "Point Guard",
      age: 20,
      location: "New York, NY",
      achievements: 12,
      stats: [
        { label: "PPG", value: "22.3" },
        { label: "APG", value: "8.1" },
        { label: "SPG", value: "2.5" },
      ],
      verified: true,
    },
    {
      id: "2",
      name: "Maria Garcia",
      sport: "Soccer",
      position: "Midfielder",
      age: 19,
      location: "Austin, TX",
      achievements: 9,
      stats: [
        { label: "Goals", value: "15" },
        { label: "Assists", value: "22" },
        { label: "Games", value: "35" },
      ],
      verified: true,
    },
  ];

  const toggleAthleteSelection = (athleteId: string) => {
    setSelectedAthletes(prev =>
      prev.includes(athleteId)
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Advanced Search</h1>
          <p className="text-muted-foreground">
            Find and compare athletes with our powerful search tools
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, sport, position, location, or performance metrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="search">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="compare">
              <Users className="mr-2 h-4 w-4" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <SearchFilters
                  onFilterChange={(filters) => console.log(filters)}
                  onReset={() => console.log("Reset")}
                />
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found {searchResults.length} athletes matching your criteria
                  </p>
                  {selectedAthletes.length > 0 && (
                    <Button variant="outline" size="sm">
                      Compare Selected ({selectedAthletes.length})
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((athlete) => (
                    <div key={athlete.id} className="relative">
                      <input
                        type="checkbox"
                        className="absolute top-4 right-4 z-10 h-4 w-4"
                        checked={selectedAthletes.includes(athlete.id)}
                        onChange={() => toggleAthleteSelection(athlete.id)}
                      />
                      <AthleteCard {...athlete} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Select 2-4 athletes from the search results to compare their stats and achievements
                </p>
                {selectedAthletes.length >= 2 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults
                      .filter(a => selectedAthletes.includes(a.id))
                      .map(athlete => (
                        <div key={athlete.id} className="space-y-4">
                          <h3 className="font-semibold">{athlete.name}</h3>
                          <div className="space-y-2">
                            {athlete.stats.map((stat, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-sm text-muted-foreground">{stat.label}</span>
                                <span className="font-medium">{stat.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    Please select at least 2 athletes to compare
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View detailed performance analytics and trends for selected athletes
                </p>
                <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    Analytics visualization will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;