
import React, { useState } from 'react';
import { RequirementSection } from '@/components/RequirementSection';
import { ProgressSummary } from '@/components/ProgressSummary';
import { ElectivesSection } from '@/components/ElectivesSection';

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

  const mathCourses = [
    { code: "MATH-UN1101", title: "Calculus I", credits: 3 },
    { code: "MATH-UN1102", title: "Calculus II", credits: 3 },
    { code: "MATH-UN1201", title: "Calculus III", credits: 3 },
    { code: "STAT-UN1201", title: "Introduction to Statistics", credits: 3 },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-8">Economics Major Requirements</h1>
      
      <div className="space-y-8">
        <ProgressSummary 
          completedCourses={completedCourses} 
          allCourses={[...economicsCourses, ...mathCourses]}
        />

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

        <RequirementSection
          title="Mathematics Requirements"
          description="Complete all required mathematics and statistics courses"
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
          requiredCourses={mathCourses.map(course => course.code)}
        >
          {mathCourses.map(course => (
            <div key={course.code} className="p-4 border rounded">
              <h3 className="font-medium">{course.code}</h3>
              <p className="text-sm text-muted-foreground">{course.title}</p>
              <p className="text-sm">{course.credits} credits</p>
            </div>
          ))}
        </RequirementSection>

        <ElectivesSection
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
        />
      </div>
    </div>
  );
};

export default RequirementsPage;
