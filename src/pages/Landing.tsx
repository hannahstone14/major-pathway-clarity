import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Landing() {
  const navigate = useNavigate();

  const majors = [
    { name: "Economics", path: "economics" },
    // These are placeholders that would typically link to real pages
    { name: "Computer Science", path: "economics" },
    { name: "Mathematics", path: "economics" },
  ];

  const features = [
    { 
      title: "Track Your Progress", 
      description: "See your progress towards graduation at a glance",
      icon: <GraduationCap className="h-8 w-8 text-primary" />
    },
    { 
      title: "Plan Your Courses", 
      description: "Visualize your academic journey semester by semester",
      icon: <BookOpen className="h-8 w-8 text-primary" />
    },
    { 
      title: "Meet Requirements", 
      description: "Ensure you're fulfilling all major requirements",
      icon: <ChevronRight className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-6xl px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="animate-fade-in space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-2">
            Major Pathway
            <span className="text-accent"> Clarity</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan your academic journey with confidence. Track your progress and navigate degree requirements easily.
          </p>
          
          <div className="flex flex-col items-center gap-8 mt-12">
            <div className="bg-card shadow-lg rounded-lg p-6 w-full max-w-sm border border-border/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Select your major</h2>
              <Select onValueChange={(value) => navigate(`/${value.toLowerCase()}`)}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Choose a major" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                    <SelectItem key={major.path} value={major.path}>
                      {major.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => navigate("/schedule")}
                className="w-full"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full bg-card py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why use Major Pathway Clarity?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-accent/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Majors Carousel */}
      <div className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Available Majors</h2>
          
          <Carousel className="w-full max-w-xs sm:max-w-md mx-auto">
            <CarouselContent>
              {majors.map((major) => (
                <CarouselItem key={major.path} className="md:basis-1/1">
                  <div className="p-2">
                    <Card className="border-2 hover:border-primary transition-all">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <h3 className="text-2xl font-semibold mb-4">{major.name}</h3>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/${major.path}`)}
                        >
                          View Requirements
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full py-8 bg-muted">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Major Pathway Clarity. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
