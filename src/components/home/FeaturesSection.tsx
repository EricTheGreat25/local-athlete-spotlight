import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Search, BarChart3, Calendar, Bell, Shield } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Athlete Profiles",
    description: "Create comprehensive profiles showcasing stats, achievements, and performance videos"
  },
  {
    icon: Search,
    title: "Smart Search & Filter",
    description: "Advanced search capabilities to find athletes by sport, position, age, and performance metrics"
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "AI-powered analysis of athlete statistics with visual reports and insights"
  },
  {
    icon: Calendar,
    title: "Events & Tryouts",
    description: "Discover and participate in competitions, tryouts, and recruitment opportunities"
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Stay informed with news, announcements, and personalized notifications"
  },
  {
    icon: Shield,
    title: "Verified Data",
    description: "Authenticated statistics and achievements verified by official organizers"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Athletic Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for athletes, scouts, and organizations to connect and thrive
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-hover border-border/50 bg-card/50 backdrop-blur"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;