import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for events
  const events = [
    {
      id: "1",
      title: "Elite Basketball Showcase",
      type: "showcase" as const,
      sport: "Basketball",
      date: "2024-04-15",
      location: "Madison Square Garden, NY",
      organizer: "NBA Scouts Association",
      participants: 45,
      maxParticipants: 50,
      description: "Annual showcase for top high school basketball talents looking to get recruited by college programs.",
      status: "upcoming" as const,
    },
    {
      id: "2",
      title: "Regional Soccer Tryouts",
      type: "tryout" as const,
      sport: "Soccer",
      date: "2024-03-28",
      location: "LA Galaxy Training Center, CA",
      organizer: "MLS Youth Development",
      participants: 120,
      maxParticipants: 150,
      description: "Open tryouts for U19 soccer players seeking opportunities in professional youth academies.",
      status: "upcoming" as const,
    },
    {
      id: "3",
      title: "Track & Field Championships",
      type: "competition" as const,
      sport: "Track & Field",
      date: "2024-05-10",
      location: "Olympic Training Center, CO",
      organizer: "USA Track & Field",
      participants: 200,
      maxParticipants: 300,
      description: "National championship event featuring the best young track and field athletes from across the country.",
      status: "upcoming" as const,
    },
    {
      id: "4",
      title: "Elite Football Camp",
      type: "camp" as const,
      sport: "Football",
      date: "2024-06-15",
      location: "University of Texas, Austin",
      organizer: "College Football Alliance",
      participants: 75,
      maxParticipants: 100,
      description: "Intensive training camp for quarterback and wide receiver development with college coaches.",
      status: "upcoming" as const,
    },
    {
      id: "5",
      title: "Swimming Invitational",
      type: "competition" as const,
      sport: "Swimming",
      date: "2024-04-05",
      location: "Aquatic Center, Miami, FL",
      organizer: "USA Swimming",
      participants: 150,
      maxParticipants: 150,
      description: "Elite swimming competition featuring Olympic hopefuls and national record holders.",
      status: "ongoing" as const,
    },
    {
      id: "6",
      title: "Baseball Scout Day",
      type: "showcase" as const,
      sport: "Baseball",
      date: "2024-03-15",
      location: "Fenway Park, Boston, MA",
      organizer: "MLB Scout Network",
      participants: 60,
      maxParticipants: 60,
      description: "Exclusive showcase event for top high school baseball prospects.",
      status: "completed" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Events & Opportunities</h1>
            <p className="text-muted-foreground">
              Discover tryouts, competitions, and showcases near you
            </p>
          </div>
          <Button className="hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events by name, sport, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="soccer">Soccer</SelectItem>
              <SelectItem value="baseball">Baseball</SelectItem>
              <SelectItem value="swimming">Swimming</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tryout">Tryouts</SelectItem>
              <SelectItem value="competition">Competitions</SelectItem>
              <SelectItem value="showcase">Showcases</SelectItem>
              <SelectItem value="camp">Camps</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Past Events</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.status === "upcoming")
                .map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ongoing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.status === "ongoing")
                .map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.status === "completed")
                .map(event => (
                  <EventCard key={event.id} {...event} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-6">
            <div className="bg-card rounded-lg border p-8">
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Calendar view coming soon
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;