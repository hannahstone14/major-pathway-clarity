
import React, { useState } from 'react';
import { RequirementSection } from '@/components/RequirementSection';

const RequirementsPage = () => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  const handleCourseToggle = (courseCode: string) => {
    setCompletedCourses(prev => 
      prev.includes(courseCode) 
        ? prev.filter(code => code !== courseCode)
        : [...prev, courseCode]
    );
  };

  const economicsCourses = [
    { code: "ECON-UN1105", title: "Principles of Economics", credits: 4 },
    { code: "ECON-UN3211", title: "Intermediate Microeconomics", credits: 4 },
    { code: "ECON-UN3213", title: "Intermediate Macroeconomics", credits: 4 },
    { code: "ECON-UN3412", title: "Introduction to Econometrics", credits: 4 },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-8">Economics Major Requirements</h1>
      
      <RequirementSection
        title="Core Requirements"
        description="Complete all core economics courses"
        completedCourses={completedCourses}
        onCourseToggle={handleCourseToggle}
        requiredCourses={economicsCourses.map(course => course.code)}
      >
        {economicsCourses.map(course => (
          <div key={course.code} className="p-4 border rounded">
            <h3 className="font-medium">{course.code}</h3>
            <p className="text-sm text-muted-foreground">{course.title}</p>
            <p className="text-sm">{course.credits} credits</p>
          </div>
        ))}
      </RequirementSection>
    </div>
  );
};

export default RequirementsPage;
