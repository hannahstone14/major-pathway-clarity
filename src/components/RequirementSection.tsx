
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequirementSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
}

// Define a type for props that the CourseCard component accepts
interface CourseCardProps {
  code: string;
  isCompleted?: boolean;
  onToggleComplete?: (code: string) => void;
}

export function RequirementSection({ 
  title, 
  description, 
  children, 
  completedCourses,
  onCourseToggle 
}: RequirementSectionProps) {
  const childrenWithCompletion = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && 'code' in child.props) {
      return React.cloneElement(child as React.ReactElement<CourseCardProps>, {
        isCompleted: completedCourses.includes(child.props.code as string),
        onToggleComplete: onCourseToggle
      });
    }
    return child;
  });

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {childrenWithCompletion}
      </CardContent>
    </Card>
  );
}
