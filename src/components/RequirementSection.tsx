
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequirementSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
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
  onCourseToggle 
}: RequirementSectionProps) {
  const childrenWithCompletion = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if ('code' in child.props) {
        // Handle CourseCard components
        return React.cloneElement(child as React.ReactElement<CourseCardProps>, {
          isCompleted: completedCourses.includes((child.props as CourseCardProps).code),
          onToggleComplete: onCourseToggle
        });
      }
      // CourseOption components already receive completedCourses and onCourseToggle
      return child;
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
