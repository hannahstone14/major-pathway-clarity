
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Course {
  code: string;
  title: string;
  credits: number;
}

interface ProgressSummaryProps {
  completedCourses: string[];
  allCourses: Course[];
}

export function ProgressSummary({ completedCourses, allCourses }: ProgressSummaryProps) {
  const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
  const completedCredits = allCourses
    .filter(course => completedCourses.includes(course.code))
    .reduce((sum, course) => sum + course.credits, 0);
  
  const progressPercentage = (completedCredits / totalCredits) * 100;
  const remainingCourses = allCourses.filter(course => !completedCourses.includes(course.code));

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Progress Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{completedCredits} credits completed</span>
            <span>{totalCredits - completedCredits} credits remaining</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>
        
        {remainingCourses.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Remaining Courses:</h4>
            <ScrollArea className="h-[100px] w-full rounded-md border p-4">
              {remainingCourses.map(course => (
                <div key={course.code} className="flex justify-between py-1">
                  <span className="font-mono">{course.code}</span>
                  <span className="text-muted-foreground">{course.title}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
