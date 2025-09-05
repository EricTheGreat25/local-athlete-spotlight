import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Users, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-gradient opacity-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-secondary/50 backdrop-blur mb-8">
            <Trophy className="h-4 w-4" />
            <span className="text-sm font-medium">Connecting Athletes with Opportunities</span>
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Discover Local
            <span className="block text-gradient">Athletic Talent</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Athletix bridges the gap between talented local athletes and scouts, providing a platform for 
            talent discovery, performance analytics, and career opportunities.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="secondary">
                Browse Athletes
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 mr-2" />
                <span className="text-3xl font-bold">5,000+</span>
              </div>
              <p className="text-muted-foreground">Athletes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 mr-2" />
                <span className="text-3xl font-bold">200+</span>
              </div>
              <p className="text-muted-foreground">Scouts & Organizations</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 mr-2" />
                <span className="text-3xl font-bold">1,500+</span>
              </div>
              <p className="text-muted-foreground">Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;