
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
  const remainingPrereqs = getRemainingPrerequisites(prerequisites || [], completedCourses);

  return (
    <Card className={`
      w-full 
      hover:shadow-md 
      transition-all 
      border-opacity-50 
      ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'}
      ${remainingPrereqs.length > 0 ? 'opacity-60' : ''}
    `}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="font-mono text-sm text-gray-700">{code}</span>
          <span className="text-xs text-muted-foreground">{credits} credits</span>
        </CardTitle>
        <h3 className="text-md font-semibold text-primary truncate">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-2 pt-2">
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        {prerequisites && prerequisites.length > 0 && (
          <div className="text-xs space-y-1">
            <span className="font-semibold text-secondary">Prerequisites: </span>
            {remainingPrereqs.length === 0 ? (
              <span className="text-green-600">All prerequisites met</span>
            ) : (
              <span className="text-muted-foreground">
                {remainingPrereqs.join(", ")}
              </span>
            )}
          </div>
        )}
        {onToggleComplete && (
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox 
              id={`complete-${code}`} 
              checked={isCompleted} 
              onCheckedChange={() => onToggleComplete(code)}
            />
            <label 
              htmlFor={`complete-${code}`}
              className="text-xs font-medium text-muted-foreground"
            >
              Mark as completed
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
