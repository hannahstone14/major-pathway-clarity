
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Elective {
  code: string;
  title: string;
  credits: number;
}

interface ElectivesSectionProps {
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
}

const ELECTIVES_2000 = [
  { code: "ECON UN2105", title: "The American Economy", credits: 3.0 },
  { code: "ECON UN2257", title: "The Global Economy", credits: 3.0 },
];

const ELECTIVES_3000_4000 = [
  { code: "ECON UN3025", title: "Financial Economics", credits: 3.0 },
  { code: "ECON UN3901", title: "Economics of Education", credits: 3.0 },
  { code: "ECON UN3952", title: "Macroeconomics & Formation of Expectations", credits: 3.0 },
  { code: "ECON UN3981", title: "Applied Econometrics", credits: 3.0 },
  { code: "ECON GU4020", title: "Economics of Uncertainty & Information", credits: 3.0 },
  { code: "ECON GU4211", title: "Advanced Microeconomics", credits: 4.0 },
  { code: "ECON GU4213", title: "Advanced Macroeconomics", credits: 4.0 },
  { code: "ECON GU4228", title: "Urban Economics", credits: 3.0 },
  { code: "ECON GU4230", title: "Economics of New York City", credits: 3.0 },
  { code: "ECON GU4251", title: "Industrial Organization", credits: 3.0 },
  { code: "ECON GU4260", title: "Market Design", credits: 3.0 },
  { code: "ECON GU4280", title: "Corporate Finance", credits: 3.0 },
  { code: "ECON GU4301", title: "Economic Growth & Development I", credits: 3.0 },
  { code: "ECON GU4321", title: "Economic Development", credits: 3.0 },
  { code: "ECON GU4325", title: "Economic Development of Japan", credits: 3.0 },
  { code: "ECON GU4370", title: "Political Economy", credits: 3.0 },
  { code: "ECON GU4400", title: "Labor Economics", credits: 3.0 },
  { code: "ECON GU4412", title: "Advanced Econometrics", credits: 4.0 },
  { code: "ECON GU4413", title: "Econometrics of Time Series and Forecasting", credits: 3.0 },
  { code: "ECON GU4415", title: "Game Theory", credits: 3.0 },
  { code: "ECON GU4438", title: "Economics of Race in the U.S.", credits: 3.0 },
  { code: "ECON GU4465", title: "Public Economics", credits: 3.0 },
  { code: "ECON GU4480", title: "Gender & Applied Economics", credits: 3.0 },
  { code: "ECON GU4500", title: "International Trade", credits: 3.0 },
  { code: "ECON GU4505", title: "International Macroeconomics", credits: 3.0 },
  { code: "ECON GU4615", title: "Law and Economics", credits: 3.0 },
  { code: "ECON GU4630", title: "Climate Finance", credits: 3.0 },
  { code: "ECON GU4700", title: "Financial Crises", credits: 3.0 },
  { code: "ECON GU4710", title: "Finance and the Real Economy", credits: 3.0 },
  { code: "ECON GU4750", title: "Globalization & Its Risks", credits: 3.0 },
  { code: "ECON GU4840", title: "Behavioral Economics", credits: 3.0 },
  { code: "ECON GU4850", title: "Cognitive Mechanisms & Economic Behavior", credits: 4.0 },
  { code: "ECON GU4860", title: "Behavioral Finance", credits: 3.0 },
];

export function ElectivesSection({ completedCourses, onCourseToggle }: ElectivesSectionProps) {
  const completed2000Level = completedCourses.filter(code => 
    ELECTIVES_2000.some(elective => elective.code === code)
  );

  const handleElectiveToggle = (code: string, is2000Level: boolean) => {
    if (is2000Level) {
      // Check if we're trying to add a second 2000-level course
      if (completed2000Level.length >= 1 && !completedCourses.includes(code)) {
        toast({
          title: "Selection Error",
          description: "Only one 2000-level elective is allowed.",
          variant: "destructive",
        });
        return;
      }
    }

    // Check if we're exceeding 5 total electives
    if (!completedCourses.includes(code) && completedCourses.length >= 5) {
      toast({
        title: "Selection Error",
        description: "Maximum of 5 electives can be selected.",
        variant: "destructive",
      });
      return;
    }

    onCourseToggle(code);
  };

  const renderElectiveGroup = (electives: Elective[], is2000Level: boolean) => (
    <div className="space-y-2">
      {electives.map((elective) => (
        <div key={elective.code} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg">
          <Checkbox
            id={elective.code}
            checked={completedCourses.includes(elective.code)}
            onCheckedChange={() => handleElectiveToggle(elective.code, is2000Level)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={elective.code}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {elective.code} - {elective.title}
            </label>
            <p className="text-sm text-muted-foreground">
              {elective.credits} credits
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const totalCredits = [...ELECTIVES_2000, ...ELECTIVES_3000_4000]
    .filter(elective => completedCourses.includes(elective.code))
    .reduce((sum, elective) => sum + elective.credits, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <CardTitle className="text-2xl font-bold text-primary">Electives</CardTitle>
        </div>
        <p className="text-muted-foreground">
          Select up to 5 electives (maximum one 2000-level course). Current total: {totalCredits} credits
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">2000-level Electives (select maximum 1)</h3>
            <ScrollArea className="h-[120px] rounded-md border p-4">
              {renderElectiveGroup(ELECTIVES_2000, true)}
            </ScrollArea>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">3000/4000-level Electives</h3>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              {renderElectiveGroup(ELECTIVES_3000_4000, false)}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
