import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { CourseOption } from "@/components/CourseOption";
import { RequirementSection } from "@/components/RequirementSection";
import { ProgressSummary } from "@/components/ProgressSummary";
import { Calendar } from "lucide-react";
import { ElectivesSection } from "@/components/ElectivesSection";

export default function Index() {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses<{ [key: string]: string }>({});

  const handleCourseToggle = (code: string) => {
    setCompletedCourses(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const handleCourseSelect = (optionId: string, courseCode: string) => {
    setSelectedCourses(prev => ({
      ...prev,
      [optionId]: courseCode
    }));
  };

  const allCourses = [
    // Quantitative Requirements
    { code: "MATH UN1101", title: "Calculus I", credits: 3 },
    { code: "MATH UN1102", title: "Calculus II", credits: 3 },
    { code: "MATH UN1201", title: "Calculus III", credits: 3 },
    { code: "MATH UN1205", title: "Accelerated Multivariable Calculus", credits: 4 },
    { code: "STAT UN1201", title: "Intro to Statistics", credits: 3 },
    
    // Core Courses
    { code: "ECON UN1105", title: "Principles of Economics", credits: 4 },
    { code: "ECON UN3211", title: "Intermediate Microeconomics", credits: 4 },
    { code: "ECON UN3213", title: "Intermediate Macroeconomics", credits: 4 },
    { code: "ECON UN3412", title: "Introduction to Econometrics", credits: 4 },
    
    // Electives (sample)
    { code: "ECON UN2105", title: "Economics Elective (2000-level)", credits: 3 },
    { code: "ECON UN3251", title: "Economics Elective (3000-level)", credits: 3 },
    { code: "ECON UN3265", title: "Economics Elective (3000-level)", credits: 3 },
    { code: "ECON UN3952", title: "Economics Elective (3000-level)", credits: 3 },
    { code: "ECON GU4370", title: "Economics Elective (4000-level)", credits: 3 },
    
    // Seminars
    { code: "ECON GU4911", title: "Seminar in Microeconomics", credits: 4 },
    { code: "ECON GU4913", title: "Seminar in Macroeconomics", credits: 4 },
    { code: "ECON GU4918", title: "Seminar in Econometrics", credits: 4 },
    { code: "ECON GU4921", title: "Seminar in Political Economy", credits: 4 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 font-inter">Economics Major Requirements</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Navigate your path through the Economics major with our comprehensive guide to course requirements, prerequisites, and recommended sequences.
          </p>
          <Button variant="secondary" className="mt-6" size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            Plan Your Schedule
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <ProgressSummary completedCourses={completedCourses} allCourses={allCourses} />
        
        <RequirementSection
          title="I. Quantitative Requirements"
          description="Mathematical foundation courses required for the Economics major"
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
        >
          <CourseOption
            title="Calculus I or II"
            courses={[
              {
                code: "MATH UN1101",
                title: "Calculus I",
                credits: 3,
                description: "Introduction to differential calculus of functions of one variable."
              },
              {
                code: "MATH UN1102",
                title: "Calculus II",
                credits: 3,
                description: "Introduction to integral calculus of functions of one variable."
              }
            ]}
            selectedCourse={selectedCourses["calc1or2"]}
            completedCourses={completedCourses}
            onCourseSelect={(code) => handleCourseSelect("calc1or2", code)}
            onCourseToggle={handleCourseToggle}
          />
          <CourseOption
            title="Calculus III or Accelerated Multivariable Calculus"
            courses={[
              {
                code: "MATH UN1201",
                title: "Calculus III",
                credits: 3,
                prerequisites: ["MATH UN1102"],
                description: "Vector functions, partial differentiation, multiple integrals."
              },
              {
                code: "MATH UN1205",
                title: "Accelerated Multivariable Calculus",
                credits: 4,
                prerequisites: ["MATH UN1102"],
                description: "Accelerated version of Calculus III covering multivariable calculus and linear algebra."
              }
            ]}
            selectedCourse={selectedCourses["calc3"]}
            completedCourses={completedCourses}
            onCourseSelect={(code) => handleCourseSelect("calc3", code)}
            onCourseToggle={handleCourseToggle}
          />
          <CourseCard
            code="STAT UN1201"
            title="Intro to Statistics"
            credits={3}
            description="Introduction to statistics with applications to the social sciences. Higher level alternatives: STAT UN4204, STAT GU4001"
          />
        </RequirementSection>

        <RequirementSection
          title="II. Core Courses"
          description="These foundational courses are required for all Economics majors (must be completed by Spring of Junior Year)"
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
        >
          <CourseOption
            title="Principles of Economics"
            courses={[
              {
                code: "ECON UN1105",
                title: "Principles of Economics",
                credits: 4,
                description: "Introduction to economic concepts and theories. This is the only major class that can be taken Pass/D/Fail."
              },
              {
                code: "ECON AP/IB",
                title: "AP/IB Credit",
                credits: 4,
                description: "AP/IB credit can fulfill the Principles of Economics requirement."
              }
            ]}
            selectedCourse={selectedCourses["principles"]}
            completedCourses={completedCourses}
            onCourseSelect={(code) => handleCourseSelect("principles", code)}
            onCourseToggle={handleCourseToggle}
          />
          <CourseCard
            code="ECON UN3211"
            title="Intermediate Microeconomics"
            credits={4}
            prerequisites={["ECON UN1105", "MATH UN1201"]}
            description="Analysis of consumer and firm behavior, market structures, and welfare economics."
          />
          <CourseCard
            code="ECON UN3213"
            title="Intermediate Macroeconomics"
            credits={4}
            prerequisites={["ECON UN1105", "MATH UN1101"]}
            description="Analysis of aggregate economic activity, long-run growth, and short-run fluctuations."
          />
          <CourseCard
            code="ECON UN3412"
            title="Introduction to Econometrics"
            credits={4}
            prerequisites={["ECON UN3211", "ECON UN3213", "MATH UN1201", "STAT UN1201"]}
            description="Statistical methods applied to economic data analysis."
          />
        </RequirementSection>

        <ElectivesSection 
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
        />

        <RequirementSection
          title="IV. Seminar Requirement"
          description="Take one of the following seminars (Prerequisites: UN3211, UN3213, UN3412)"
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
        >
          <CourseOption
            title="Choose one seminar"
            courses={[
              {
                code: "ECON GU4911",
                title: "Seminar in Microeconomics",
                credits: 4,
                prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412"],
                description: "Advanced seminar on microeconomic topics."
              },
              {
                code: "ECON GU4913",
                title: "Seminar in Macroeconomics",
                credits: 4,
                prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412"],
                description: "Advanced seminar on macroeconomic topics."
              },
              {
                code: "ECON GU4918",
                title: "Seminar in Econometrics",
                credits: 4,
                prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412"],
                description: "Advanced seminar on econometric methods."
              },
              {
                code: "ECON GU4921",
                title: "Seminar in Political Economy",
                credits: 4,
                prerequisites: ["ECON UN3211", "ECON UN3213", "ECON UN3412", "ECON GU4370"],
                description: "Advanced seminar on political economy topics."
              }
            ]}
            selectedCourse={selectedCourses["seminar"]}
            onCourseSelect={(code) => handleCourseSelect("seminar", code)}
            onCourseToggle={handleCourseToggle}
          />
        </RequirementSection>
        
        <RequirementSection
          title="Additional Notes"
          description="Important information about the Economics major requirements"
          completedCourses={completedCourses}
          onCourseToggle={handleCourseToggle}
        >
          <Card className="w-full p-4 bg-muted/50">
            <ul className="list-disc pl-5 space-y-2">
              <li>Minimum 9 economics lecture courses, 5 must be taken in the Columbia Economics Department.</li>
              <li>Barnard seminars don't count for the seminar requirement.</li>
              <li>You must get a C- or higher in major classes, except for UN1105 which can be Pass/D/Fail.</li>
              <li>No credit for courses taken before prerequisites.</li>
              <li>Transfer credits must be approved by the department.</li>
            </ul>
          </Card>
        </RequirementSection>
      </main>
    </div>
  );
}

// Helper component for the notes section
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
};
