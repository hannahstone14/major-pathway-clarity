
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
  const REQUIRED_CREDITS = 44;
  const completedCredits = allCourses
    .filter(course => completedCourses.includes(course.code))
    .reduce((sum, course) => sum + course.credits, 0);
  
  const progressPercentage = Math.min((completedCredits / REQUIRED_CREDITS) * 100, 100);

  const getRemainingRequirements = () => {
    // Handle calculus alternatives
    const hasCalc1or2 = completedCourses.includes("MATH UN1101") || completedCourses.includes("MATH UN1102");
    const hasCalc3orAccel = completedCourses.includes("MATH UN1201") || completedCourses.includes("MATH UN1205");
    const hasStats = completedCourses.includes("STAT UN1201");
    const hasPrinciples = completedCourses.includes("ECON UN1105") || completedCourses.includes("ECON AP/IB");
    const hasMicro = completedCourses.includes("ECON UN3211");
    const hasMacro = completedCourses.includes("ECON UN3213");
    const hasEconometrics = completedCourses.includes("ECON UN3412");
    
    const hasSeminar = completedCourses.some(code => 
      ["ECON GU4911", "ECON GU4913", "ECON GU4918", "ECON GU4921"].includes(code)
    );

    const completedElectives = completedCourses.filter(code => 
      code.startsWith("ECON") && 
      !["ECON UN1105", "ECON UN3211", "ECON UN3213", "ECON UN3412", "ECON AP/IB"].includes(code) &&
      !code.includes("GU49")
    ).length;

    const requirements = [];

    if (!hasCalc1or2) requirements.push("Calculus I or II");
    if (!hasCalc3orAccel) requirements.push("Calculus III or Accelerated Multivariable");
    if (!hasStats) requirements.push("Statistics");
    if (!hasPrinciples) requirements.push("Principles of Economics");
    if (!hasMicro) requirements.push("Intermediate Microeconomics");
    if (!hasMacro) requirements.push("Intermediate Macroeconomics");
    if (!hasEconometrics) requirements.push("Introduction to Econometrics");
    if (!hasSeminar) requirements.push("1 Seminar");
    
    const remainingElectives = Math.max(5 - completedElectives, 0);
    if (remainingElectives > 0) {
      requirements.push(`${remainingElectives} Elective${remainingElectives > 1 ? 's' : ''}`);
    }

    return requirements;
  };

  const remainingRequirements = getRemainingRequirements();

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Progress Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{completedCredits} / {REQUIRED_CREDITS} credits completed</span>
            <span>{Math.max(REQUIRED_CREDITS - completedCredits, 0)} credits remaining</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>
        
        {remainingRequirements.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Remaining Requirements:</h4>
            <ScrollArea className="h-[100px] w-full rounded-md border p-4">
              {remainingRequirements.map((req, index) => (
                <div key={index} className="py-1">
                  <span className="text-muted-foreground">{req}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
