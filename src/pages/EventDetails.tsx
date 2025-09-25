import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock, 
  DollarSign,
  Share2,
  Heart,
  MessageSquare,
  ChevronLeft,
  Medal,
  Target,
  Timer,
  Award
} from "lucide-react";
import { format } from "date-fns";


// Mock event data - in production, this would come from an API
const mockEventData = {
  id: "1",
  title: "Summer Track Championships 2024",
  organizer: "National Athletics Federation",
  sport: "Athletics",
  type: "championship",
  description: "The premier track and field championship featuring the nation's top athletes competing in various events including sprints, distance running, jumping, and throwing events.",
  date: new Date("2024-07-15"),
  endDate: new Date("2024-07-17"),
  location: "Olympic Stadium, Los Angeles",
  participants: 250,
  maxParticipants: 300,
  status: "upcoming",
  registrationDeadline: new Date("2024-06-30"),
  entryFee: 150,
  categories: ["100m Sprint", "200m Sprint", "400m", "800m", "1500m", "Long Jump", "High Jump", "Shot Put"],
  schedule: [
    { day: "Day 1", date: "July 15", events: ["Opening Ceremony", "100m Heats", "Long Jump Qualifying"] },
    { day: "Day 2", date: "July 16", events: ["200m Heats", "High Jump Final", "Shot Put Final"] },
    { day: "Day 3", date: "July 17", events: ["All Finals", "Closing Ceremony", "Awards"] }
  ],
  prizes: ["Gold Medal + $5000", "Silver Medal + $3000", "Bronze Medal + $1000"],
  rules: [
    "All participants must be registered with their national federation",
    "Anti-doping rules apply",
    "Athletes must check in 1 hour before their event",
    "Official competition attire required"
  ],
  sponsors: ["Nike", "Gatorade", "Olympic Committee"],
  contactEmail: "info@nationalathletics.org",
  contactPhone: "+1 555-0123",
  website: "www.summerchampionships2024.com",
  coverImage: "/placeholder.svg",
  gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  registeredAthletes: [
    { id: "1", name: "John Smith", avatar: "/placeholder.svg", events: ["100m", "200m"] },
    { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg", events: ["Long Jump", "100m"] },
    { id: "3", name: "Mike Williams", avatar: "/placeholder.svg", events: ["Shot Put"] }
  ]
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  
  // In production, fetch event data based on id
  const event = mockEventData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "destructive";
      case "completed":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "championship":
        return "default";
      case "tournament":
        return "secondary";
      case "league":
        return "outline";
      case "friendly":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-primary/20 to-primary/5">
        <img 
          src={event.coverImage} 
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4 w-fit"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Events
          </Button>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant={getTypeColor(event.type)}>
                {event.type}
              </Badge>
              <Badge variant={getStatusColor(event.status)}>
                {event.status}
              </Badge>
              <Badge variant="outline">
                {event.sport}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(event.date, "MMM d")} - {format(event.endDate, "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.participants}/{event.maxParticipants} participants
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rules">Rules & Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {event.categories.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prizes & Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {event.prizes.map((prize, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Medal className={`h-5 w-5 ${
                            index === 0 ? 'text-yellow-500' : 
                            index === 1 ? 'text-gray-400' : 
                            'text-orange-600'
                          }`} />
                          <span>{prize}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>
              
              
              <TabsContent value="rules">
                <Card>
                  <CardHeader>
                    <CardTitle>Competition Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Registration & Info */}
          <div className="space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>Event Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium">{event.organizer}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📧 {event.contactEmail}</p>
                  <p>📞 {event.contactPhone}</p>
                  <p>🌐 {event.website}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.sponsors.map((sponsor, index) => (
                    <Badge key={index} variant="secondary">
                      {sponsor}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
}