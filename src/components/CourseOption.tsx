
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Course {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  description: string;
}

interface CourseOptionProps {
  title: string;
  courses: Course[];
  selectedCourse?: string;
  completedCourses: string[];
  onCourseSelect: (code: string) => void;
  onCourseToggle: (code: string) => void;
}

export function CourseOption({
  title,
  courses,
  selectedCourse,
  completedCourses,
  onCourseSelect,
  onCourseToggle,
}: CourseOptionProps) {
  const isCompleted = selectedCourse && completedCourses.includes(selectedCourse);
  
  const handleRadioChange = (value: string) => {
    // First remove any previously completed course from this option group
    courses.forEach(course => {
      if (completedCourses.includes(course.code)) {
        onCourseToggle(course.code); // Remove from completed
      }
    });
    
    // Then select the new course
    onCourseSelect(value);
    
    // If the course is not already in the completed list, add it
    if (!completedCourses.includes(value)) {
      onCourseToggle(value); // Add to completed
    }
  };

  return (
    <Card 
      className={`w-full hover:shadow-md transition-all ${
        isCompleted ? 'border-green-500 shadow-green-100 opacity-60' : ''
      }`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedCourse}
          onValueChange={handleRadioChange}
        >
          {courses.map((course) => (
            <div key={course.code} className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value={course.code} id={course.code} />
              <Label htmlFor={course.code} className="text-sm font-medium cursor-pointer flex-1">
                {course.code} - {course.title}
                <p className="text-xs text-muted-foreground mt-1">{course.description}</p>
                {course.prerequisites && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Prerequisites: {course.prerequisites.join(", ")}
                  </p>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
