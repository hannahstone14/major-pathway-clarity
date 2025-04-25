
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";

interface Elective {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  corequisites?: string[];
  notes?: string;
}

interface ElectivesSectionProps {
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
}

const ELECTIVES_2000 = [
  { 
    code: "ECON UN2105", 
    title: "The American Economy", 
    credits: 3.0,
    prerequisites: ["ECON UN1105"]
  },
  { 
    code: "ECON UN2257", 
    title: "The Global Economy", 
    credits: 3.0,
    prerequisites: ["ECON UN1105"]
  },
];

const ELECTIVES_3000_4000 = [
  { 
    code: "ECON UN3025", 
    title: "Financial Economics", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "STAT UN1201"]
  },
  { 
    code: "ECON UN3901", 
    title: "Economics of Education", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412"]
  },
  { 
    code: "ECON UN3952", 
    title: "Macroeconomics & Formation of Expectations", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412"]
  },
  { 
    code: "ECON UN3981", 
    title: "Applied Econometrics", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412"]
  },
  { 
    code: "ECON GU4020", 
    title: "Economics of Uncertainty & Information", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "STAT UN1201"]
  },
  { 
    code: "ECON GU4211", 
    title: "Advanced Microeconomics", 
    credits: 4.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "MATH UN2010"],
    corequisites: ["MATH UN2500", "MATH GU4061"]
  },
  { 
    code: "ECON GU4213", 
    title: "Advanced Macroeconomics", 
    credits: 4.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412", "MATH UN2010"]
  },
  { 
    code: "ECON GU4228", 
    title: "Urban Economics", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213"]
  },
  { 
    code: "ECON GU4230", 
    title: "Economics of New York City", 
    credits: 3.0,
    prerequisites: ["ECON UN3211", "ECON UN3213", "STAT UN1201"]
  },
  // ... continue with all other electives following the same pattern
];

export function ElectivesSection({ completedCourses, onCourseToggle }: ElectivesSectionProps) {
  const completed2000Level = completedCourses.filter(code => 
    ELECTIVES_2000.some(elective => elective.code === code)
  );

  const handleElectiveToggle = (code: string, is2000Level: boolean) => {
    if (is2000Level && completed2000Level.length >= 1 && !completedCourses.includes(code)) {
      toast({
        title: "Selection Error",
        description: "Only one 2000-level elective is allowed.",
        variant: "destructive",
      });
      return;
    }
    onCourseToggle(code);
  };

  const allElectives = [...ELECTIVES_2000, ...ELECTIVES_3000_4000].sort((a, b) => a.code.localeCompare(b.code));

  const totalCredits = allElectives
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
          Select electives (maximum one 2000-level course). Selected: {completedCourses.length}. Current total: {totalCredits} credits
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[520px] rounded-md border p-4">
          <div className="space-y-2">
            {allElectives.map((elective) => (
              <div key={elective.code} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg">
                <Checkbox
                  id={elective.code}
                  checked={completedCourses.includes(elective.code)}
                  onCheckedChange={() => handleElectiveToggle(elective.code, ELECTIVES_2000.some(e => e.code === elective.code))}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={elective.code}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {elective.code} - {elective.title}
                    {ELECTIVES_2000.some(e => e.code === elective.code) && 
                      <span className="ml-2 text-xs text-muted-foreground">(2000-level)</span>
                    }
                  </label>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{elective.credits} credits</p>
                    {elective.prerequisites && (
                      <p>Prerequisites: {elective.prerequisites.join(", ")}</p>
                    )}
                    {elective.corequisites && (
                      <p>Corequisites: {elective.corequisites.join(" or ")}</p>
                    )}
                    {elective.notes && (
                      <p className="italic">{elective.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
