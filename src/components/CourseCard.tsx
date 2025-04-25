
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getRemainingPrerequisites } from "@/utils/prerequisiteUtils";

interface CourseCardProps {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  description: string;
  isCompleted?: boolean;
  onToggleComplete?: (code: string) => void;
  completedCourses: string[];
}

export function CourseCard({ 
  code, 
  title, 
  credits, 
  prerequisites, 
  description,
  isCompleted = false,
  onToggleComplete,
  completedCourses
}: CourseCardProps) {
  return (
    <Card className={`w-full hover:shadow-md transition-all ${isCompleted ? 'border-green-500 shadow-green-100' : ''}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="font-mono text-lg">{code}</span>
          <span className="text-sm text-muted-foreground">{credits} credits</span>
        </CardTitle>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {prerequisites && prerequisites.length > 0 && (
          <div className="mt-2">
            <span className="text-xs font-semibold text-secondary">Prerequisites: </span>
            {getRemainingPrerequisites(prerequisites, completedCourses).length === 0 ? (
              <span className="text-xs text-green-600">All prerequisites met</span>
            ) : (
              <span className="text-xs text-muted-foreground">
                {getRemainingPrerequisites(prerequisites, completedCourses).join(", ")}
              </span>
            )}
          </div>
        )}
        {onToggleComplete && (
          <div className="mt-4 flex items-center space-x-2">
            <Checkbox 
              id={`complete-${code}`} 
              checked={isCompleted} 
              onCheckedChange={() => onToggleComplete(code)}
            />
            <label 
              htmlFor={`complete-${code}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Completed
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
