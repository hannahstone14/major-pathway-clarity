
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseCard } from "./CourseCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ElectivesSectionProps {
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
  scheduledCourses: string[];
}

export function ElectivesSection({ 
  completedCourses, 
  onCourseToggle,
  scheduledCourses 
}: ElectivesSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const electiveCourses = [
    {
      code: "ECON GU4370",
      title: "Financial Economics",
      credits: 3,
      prerequisites: ["ECON UN3213", "STAT UN1201"],
      description: "Analysis of financial markets and instruments"
    },
    {
      code: "ECON GU4700",
      title: "International Trade",
      credits: 3,
      prerequisites: ["ECON UN3213"],
      description: "Analysis of international trade and investment"
    },
    {
      code: "ECON GU4750",
      title: "Globalization and Its Risks",
      credits: 3,
      prerequisites: ["ECON UN3213"],
      description: "Study of global economic integration"
    }
  ];

  // Filter out scheduled courses
  const availableElectives = electiveCourses.filter(
    course => !scheduledCourses.includes(course.code)
  );

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Elective Courses</CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose from these elective courses
          </p>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            {availableElectives.map((course) => (
              <CourseCard
                key={course.code}
                code={course.code}
                title={course.title}
                credits={course.credits}
                prerequisites={course.prerequisites}
                description={course.description}
                completedCourses={completedCourses}
              />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
