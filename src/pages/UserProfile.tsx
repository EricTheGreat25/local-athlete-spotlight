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
  Building,
  Users,
  Eye,
  Mail,
  Globe,
  Share2,
  Trophy,
  Target,
  TrendingUp,
  CheckCircle,
  ChevronLeft,
  Star,
  Clock,
  FileText,
  Award
} from "lucide-react";

const UserProfile = () => {
  const { id } = useParams();

  // Sample scout/organization data
  const user = {
    id: "1",
    name: "Elite Sports Management",
    type: "Sports Agency",
    role: "Scout / Organization",
    location: "New York, NY",
    joinDate: "December 2023",
    bio: "Leading sports management agency specializing in basketball talent development and recruitment. We've helped over 200 athletes reach their professional goals.",
    website: "www.elitesportsmanagement.com",
    imageUrl: "",
    verified: true,
    followers: 3450,
    following: 156,
    eventsPosted: 24,
    athletesScouted: 89,
    stats: {
      totalEvents: 24,
      activeEvents: 8,
      totalAthletes: 89,
      successfulPlacements: 45,
    },
    achievements: [
      { id: 1, title: "Top Recruiting Agency 2023", icon: Trophy },
      { id: 2, title: "100+ Successful Placements", icon: Award },
      { id: 3, title: "Verified Organization", icon: CheckCircle },
      { id: 4, title: "5 Star Rating", icon: Star },
    ],
    recentEvents: [
      {
        id: 1,
        title: "Elite Basketball Combine 2024",
        date: "January 15, 2024",
        location: "Madison Square Garden",
        participants: 120,
        status: "upcoming",
      },
      {
        id: 2,
        title: "Spring Talent Showcase",
        date: "March 10, 2024",
        location: "Brooklyn, NY",
        participants: 85,
        status: "upcoming",
      },
      {
        id: 3,
        title: "Regional Championships Tryouts",
        date: "December 5, 2023",
        location: "Queens, NY",
        participants: 150,
        status: "completed",
      },
    ],
    scoutedAthletes: [
      { id: 1, name: "James Wilson", sport: "Basketball", status: "Signed" },
      { id: 2, name: "Maria Garcia", sport: "Soccer", status: "In Progress" },
      { id: 3, name: "David Chen", sport: "Tennis", status: "Signed" },
      { id: 4, name: "Sarah Johnson", sport: "Track", status: "Evaluating" },
    ],
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        comment: "Excellent organization that truly cares about athlete development.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        author: "Jane Smith",
        rating: 5,
        comment: "Professional and supportive throughout the entire recruitment process.",
        date: "1 month ago",
      },
    ],
  };

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    {user.verified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {user.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {user.joinDate}
                    </span>
                  </div>
                  <p className="text-muted-foreground max-w-2xl mb-3">{user.bio}</p>
                  <a 
                    href={`https://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    {user.website}
                  </a>
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    Follow
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-2xl font-bold">{user.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.eventsPosted}</p>
                  <p className="text-sm text-muted-foreground">Events Posted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.athletesScouted}</p>
                  <p className="text-sm text-muted-foreground">Athletes Scouted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="athletes">Athletes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Events Organized</span>
                    <span className="font-bold">{user.stats.totalEvents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Events</span>
                    <span className="font-bold">{user.stats.activeEvents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Athletes Evaluated</span>
                    <span className="font-bold">{user.stats.totalAthletes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Successful Placements</span>
                    <span className="font-bold text-green-600">{user.stats.successfulPlacements}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-5xl font-bold mb-2">
                      {Math.round((user.stats.successfulPlacements / user.stats.totalAthletes) * 100)}%
                    </p>
                    <p className="text-muted-foreground">Placement Success Rate</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">5.0 Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <div className="space-y-4">
              {user.recentEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                          <p className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.participants} Participants
                          </p>
                        </div>
                      </div>
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </div>
                    <Button className="mt-4 w-full">View Event Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="athletes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.scoutedAthletes.map((athlete) => (
                <Card key={athlete.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{athlete.name}</h3>
                        <p className="text-sm text-muted-foreground">{athlete.sport}</p>
                      </div>
                      <Badge 
                        variant={
                          athlete.status === "Signed" ? "default" : 
                          athlete.status === "In Progress" ? "secondary" : 
                          "outline"
                        }
                      >
                        {athlete.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card key={achievement.id}>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {user.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;