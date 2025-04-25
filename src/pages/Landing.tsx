
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-primary mb-2">My Major is...</h1>
        
        <div className="flex flex-col items-center gap-4">
          <Select onValueChange={(value) => navigate(`/${value.toLowerCase()}`)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Economics">Economics</SelectItem>
            </SelectContent>
          </Select>
          
          <p className="text-muted-foreground mt-2">
            Select your major to view degree requirements and plan your courses
          </p>

          <Button 
            variant="outline" 
            onClick={() => navigate("/economics")}
            className="mt-4"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            View All Majors
          </Button>
        </div>
      </div>
    </div>
  );
}
