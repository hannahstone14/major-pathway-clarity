
import React from 'react';
import { Card } from '@/components/ui/card';
import { CourseBlock } from './CourseBlock';

const economicsCourses = [
  // Quantitative Requirements
  { id: "MATH-UN1101", code: "MATH UN1101", title: "Calculus I", credits: 3 },
  { id: "MATH-UN1102", code: "MATH UN1102", title: "Calculus II", credits: 3 },
  { id: "MATH-UN1201", code: "MATH UN1201", title: "Calculus III", credits: 3 },
  { id: "STAT-UN1201", code: "STAT UN1201", title: "Intro to Statistics", credits: 3 },
  
  // Core Courses
  { id: "ECON-UN1105", code: "ECON UN1105", title: "Principles of Economics", credits: 4 },
  { id: "ECON-UN3211", code: "ECON UN3211", title: "Intermediate Microeconomics", credits: 4 },
  { id: "ECON-UN3213", code: "ECON UN3213", title: "Intermediate Macroeconomics", credits: 4 },
  { id: "ECON-UN3412", code: "ECON UN3412", title: "Introduction to Econometrics", credits: 4 },
  
  // Seminars
  { id: "ECON-GU4911", code: "ECON GU4911", title: "Seminar in Microeconomics", credits: 4 },
  { id: "ECON-GU4913", code: "ECON GU4913", title: "Seminar in Macroeconomics", credits: 4 },
];

export function RequirementsList() {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Required Courses</h2>
      <div className="space-y-2">
        {economicsCourses.map((course) => (
          <CourseBlock key={course.id} {...course} />
        ))}
      </div>
    </Card>
  );
}
