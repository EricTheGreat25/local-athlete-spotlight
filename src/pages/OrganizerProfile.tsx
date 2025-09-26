import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Trophy,
  Activity,
  Share2,
  Award,
  Users,
  Target,
  Clock,
  ChevronLeft,
  Building,
  Globe,
  Star
} from "lucide-react";

const OrganizerProfile = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample organizer data
  const organizer = {
    id: "1",
    name: "Elite Sports Academy",
    type: "Training Academy",
    location: "Los Angeles, CA",
    joinDate: "March 2023",
    bio: "Premier sports training facility specializing in basketball and soccer development. We focus on creating pathways for young athletes to reach their potential through professional coaching and state-of-the-art facilities.",
    imageUrl: "",
    verified: true,
    website: "www.elitesportsacademy.com",
    founded: "2018",
    events: [
      {
        id: 1,
        title: "Summer Basketball Camp",
        date: "July 15-22, 2024",
        location: "Los Angeles, CA",
        participants: 45,
        status: "Upcoming"
      },
      {
        id: 2,
        title: "Soccer Skills Workshop",
        date: "June 10, 2024",
        location: "Los Angeles, CA",
        participants: 32,
        status: "Completed"
      },
      {
        id: 3,
        title: "Youth Basketball Tournament",
        date: "May 20-21, 2024",
        location: "Los Angeles, CA",
        participants: 128,
        status: "Completed"
      }
    ],
    achievements: [
      { id: 1, title: "Top Youth Development Program", year: "2023", icon: Trophy },
      { id: 2, title: "Excellence in Coaching Award", year: "2023", icon: Award },
      { id: 3, title: "Community Impact Recognition", year: "2024", icon: Star },
      { id: 4, title: "Best Training Facility", year: "2024", icon: Building },
    ],
    stats: {
      totalEvents: 24,
      totalParticipants: 856,
      averageRating: 4.8,
      yearsActive: 6,
    },
    facilities: [
      "2 Indoor Basketball Courts",
      "1 Soccer Field",
      "Modern Fitness Center",
      "Video Analysis Room",
      "Recovery Center"
    ],
    programs: [
      "Youth Basketball Development",
      "Soccer Skills Training",
      "Athletic Conditioning",
      "Mental Performance Coaching",
      "College Recruitment Prep"
    ]
  };

  const initials = organizer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/search">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
        </Link>

        {/* Profile Header */}
        <div className="bg-muted/30 rounded-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage src={organizer.imageUrl} alt={organizer.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{organizer.name}</h1>
                    {organizer.verified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {organizer.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {organizer.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Founded {organizer.founded}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {organizer.website}
                    </span>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">{organizer.bio}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "secondary" : "default"}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-2xl font-bold">{organizer.stats.totalEvents}</p>
                  <p className="text-sm text-muted-foreground">Events Hosted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{organizer.stats.totalParticipants}</p>
                  <p className="text-sm text-muted-foreground">Total Participants</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{organizer.stats.averageRating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{organizer.stats.yearsActive}</p>
                  <p className="text-sm text-muted-foreground">Years Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-4">
              {organizer.events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.participants} participants
                          </span>
                        </div>
                      </div>
                      <Badge variant={event.status === "Upcoming" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {organizer.programs.map((program, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        {program}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {organizer.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organizer.achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card key={achievement.id}>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.year}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded</span>
                  <span className="font-medium">{organizer.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{organizer.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{organizer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Website</span>
                  <span className="font-medium">{organizer.website}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">info@elitesportsacademy.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">(555) 987-6543</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="font-medium">123 Sports Center Blvd, Los Angeles, CA 90210</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizerProfile;