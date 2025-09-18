import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import AthleteCard from "@/components/athletes/AthleteCard";
import SearchFilters from "@/components/search/SearchFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Filter, Users, BarChart, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({});

  // Mock data - expanded for better filtering demonstration
  const allAthletes = [
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
    {
      id: "3",
      name: "James Wilson",
      sport: "Football",
      position: "Quarterback",
      age: 21,
      location: "Los Angeles, CA",
      achievements: 15,
      stats: [
        { label: "Passing Yards", value: "3,842" },
        { label: "TD", value: "28" },
        { label: "Completion %", value: "68.5" },
      ],
      verified: true,
    },
    {
      id: "4",
      name: "Sarah Chen",
      sport: "Swimming",
      position: "Freestyle",
      age: 18,
      location: "Miami, FL",
      achievements: 20,
      stats: [
        { label: "50m Free", value: "23.8s" },
        { label: "100m Free", value: "52.3s" },
        { label: "Gold Medals", value: "8" },
      ],
      verified: false,
    },
    {
      id: "5",
      name: "Michael Davis",
      sport: "Basketball",
      position: "Center",
      age: 22,
      location: "Chicago, IL",
      achievements: 10,
      stats: [
        { label: "PPG", value: "18.5" },
        { label: "RPG", value: "12.3" },
        { label: "BPG", value: "3.2" },
      ],
      verified: true,
    },
    {
      id: "6",
      name: "Emma Thompson",
      sport: "Tennis",
      position: "Singles",
      age: 17,
      location: "Boston, MA",
      achievements: 6,
      stats: [
        { label: "Ranking", value: "#12" },
        { label: "Win Rate", value: "78%" },
        { label: "Aces/Match", value: "8.5" },
      ],
      verified: false,
    },
  ];

  // Filter logic
  const filteredAthletes = useMemo(() => {
    let filtered = allAthletes;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(athlete => 
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.sport) {
      filtered = filtered.filter(athlete => 
        athlete.sport.toLowerCase() === filters.sport
      );
    }

    if (filters.position && filters.position !== 'any') {
      filtered = filtered.filter(athlete => 
        athlete.position.toLowerCase() === filters.position
      );
    }

    if (filters.ageRange) {
      filtered = filtered.filter(athlete => 
        athlete.age >= filters.ageRange[0] && athlete.age <= filters.ageRange[1]
      );
    }

    if (filters.verified === 'verified') {
      filtered = filtered.filter(athlete => athlete.verified);
    } else if (filters.verified === 'unverified') {
      filtered = filtered.filter(athlete => !athlete.verified);
    }

    return filtered;
  }, [searchQuery, filters]);

  const toggleAthleteSelection = (athleteId: string) => {
    setSelectedAthletes(prev =>
      prev.includes(athleteId)
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const handleFilterChange = (newFilter: any) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
  };

  const resetFilters = () => {
    setFilters({});
    setSearchQuery("");
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
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredAthletes.length} athletes matching your criteria
                  </p>
                  {selectedAthletes.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const tabElement = document.querySelector('[value="compare"]') as HTMLElement;
                        if (tabElement) tabElement.click();
                      }}
                    >
                      Compare Selected ({selectedAthletes.length})
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAthletes.map((athlete) => (
                    <div key={athlete.id} className="relative">
                      <input
                        type="checkbox"
                        className="absolute top-4 right-4 z-10 h-4 w-4 cursor-pointer"
                        checked={selectedAthletes.includes(athlete.id)}
                        onChange={() => toggleAthleteSelection(athlete.id)}
                      />
                      <AthleteCard {...athlete} />
                    </div>
                  ))}
                </div>
                
                {filteredAthletes.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">
                        No athletes found matching your criteria. Try adjusting your filters.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Athlete Comparison</span>
                  {selectedAthletes.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedAthletes([])}
                    >
                      Clear Selection
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAthletes.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground">
                    Go to the Search tab and select athletes to compare
                  </p>
                ) : selectedAthletes.length === 1 ? (
                  <p className="text-center py-12 text-muted-foreground">
                    Please select at least 2 athletes to compare (currently {selectedAthletes.length} selected)
                  </p>
                ) : (
                  <div className="space-y-8">
                    {/* Athlete Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredAthletes
                        .filter(a => selectedAthletes.includes(a.id))
                        .map(athlete => (
                          <Card key={athlete.id} className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => toggleAthleteSelection(athlete.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <CardContent className="pt-6">
                              <div className="text-center mb-4">
                                <h3 className="font-bold text-lg">{athlete.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {athlete.sport} • {athlete.position}
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                  <Badge variant="outline">{athlete.age} years</Badge>
                                  {athlete.verified && (
                                    <Badge variant="default">Verified</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                {athlete.stats.map((stat, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                                    <span className="font-semibold">{stat.value}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>

                    {/* Comparison Charts */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {filteredAthletes
                              .filter(a => selectedAthletes.includes(a.id))
                              .map(athlete => (
                                <div key={athlete.id} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{athlete.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {athlete.achievements} achievements
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(athlete.achievements / 20) * 100} 
                                    className="h-2"
                                  />
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Stats Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Attribute</th>
                                  {filteredAthletes
                                    .filter(a => selectedAthletes.includes(a.id))
                                    .map(athlete => (
                                      <th key={athlete.id} className="text-center py-2 px-4">
                                        {athlete.name.split(' ')[0]}
                                      </th>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2 font-medium">Sport</td>
                                  {filteredAthletes
                                    .filter(a => selectedAthletes.includes(a.id))
                                    .map(athlete => (
                                      <td key={athlete.id} className="text-center py-2 px-4">
                                        {athlete.sport}
                                      </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2 font-medium">Position</td>
                                  {filteredAthletes
                                    .filter(a => selectedAthletes.includes(a.id))
                                    .map(athlete => (
                                      <td key={athlete.id} className="text-center py-2 px-4">
                                        {athlete.position}
                                      </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2 font-medium">Age</td>
                                  {filteredAthletes
                                    .filter(a => selectedAthletes.includes(a.id))
                                    .map(athlete => (
                                      <td key={athlete.id} className="text-center py-2 px-4">
                                        {athlete.age}
                                      </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2 font-medium">Location</td>
                                  {filteredAthletes
                                    .filter(a => selectedAthletes.includes(a.id))
                                    .map(athlete => (
                                      <td key={athlete.id} className="text-center py-2 px-4 text-sm">
                                        {athlete.location}
                                      </td>
                                    ))}
                                </tr>
                                <tr>
                                  <td className="py-2 font-medium">Verified</td>
                                  {filteredAthletes
                                    .filter(a => selectedAthletes.includes(a.id))
                                    .map(athlete => (
                                      <td key={athlete.id} className="text-center py-2 px-4">
                                        {athlete.verified ? (
                                          <Badge variant="default" className="mx-auto">Yes</Badge>
                                        ) : (
                                          <Badge variant="outline" className="mx-auto">No</Badge>
                                        )}
                                      </td>
                                    ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
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