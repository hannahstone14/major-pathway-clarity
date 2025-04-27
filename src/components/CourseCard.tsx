
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
    <div className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg">
      <Checkbox
        id={code}
        checked={completedCourses.includes(code)}
        onCheckedChange={() => onToggleComplete && onToggleComplete(code)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={code}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {code} - {title}
        </label>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>{credits} credits</p>
          {prerequisites && prerequisites.length > 0 && (
            <p>
              Prerequisites: {
                remainingPrereqs.length === 0 
                  ? <span className="text-green-600">All prerequisites met</span>
                  : remainingPrereqs.join(", ")
              }
            </p>
          )}
          {description && (
            <p className="text-xs italic">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
