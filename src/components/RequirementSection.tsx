
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface RequirementSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
  requiredCourses: string[];
}

interface CourseCardProps {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  description: string;
  isCompleted?: boolean;
  onToggleComplete?: (code: string) => void;
}

export function RequirementSection({ 
  title, 
  description, 
  children, 
  completedCourses,
  onCourseToggle,
  requiredCourses 
}: RequirementSectionProps) {
  const childrenWithCompletion = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if ('code' in child.props) {
        return React.cloneElement(child as React.ReactElement<CourseCardProps>, {
          isCompleted: completedCourses.includes((child.props as CourseCardProps).code),
          onToggleComplete: onCourseToggle
        });
      }
      return child;
    }
    return child;
  });

  const completedCount = requiredCourses.filter(course => 
    completedCourses.includes(course)
  ).length;
  
  const progressPercentage = (completedCount / requiredCourses.length) * 100;
  const isCompleted = progressPercentage === 100;

  const [isOpen, setIsOpen] = React.useState(!isCompleted);

  return (
    <Card className="w-full mb-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <CollapsibleTrigger className="hover:bg-accent p-2 rounded-full">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>{completedCount} / {requiredCourses.length} requirements completed</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
          <CollapsibleContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {childrenWithCompletion}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
}

