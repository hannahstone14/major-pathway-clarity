
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseCard } from './CourseCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface RequirementSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  completedCourses: string[];
  onCourseToggle: (code: string) => void;
  requiredCourses: string[];
  scheduledCourses: string[];
}

export function RequirementSection({
  title,
  description,
  children,
  completedCourses,
  onCourseToggle,
  requiredCourses,
  scheduledCourses
}: RequirementSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  // Filter out children that represent scheduled courses
  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child) && 'code' in child.props) {
      return !scheduledCourses.includes(child.props.code);
    }
    return true;
  });

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            {filteredChildren}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
