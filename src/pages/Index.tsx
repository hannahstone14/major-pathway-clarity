
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { RequirementSection } from "@/components/RequirementSection";
import { Calendar } from "lucide-react";

export default function Index() {
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
        <RequirementSection
          title="Core Requirements"
          description="These foundational courses are required for all Economics majors"
        >
          <CourseCard
            code="ECON 101"
            title="Principles of Microeconomics"
            credits={4}
            description="Introduction to economic principles governing individual decision-making in a market economy."
          />
          <CourseCard
            code="ECON 102"
            title="Principles of Macroeconomics"
            credits={4}
            prerequisites={["ECON 101"]}
            description="Study of aggregate economic behavior and national economic performance."
          />
          <CourseCard
            code="ECON 301"
            title="Intermediate Microeconomics"
            credits={4}
            prerequisites={["ECON 101", "MATH 120"]}
            description="Advanced analysis of supply and demand, consumer behavior, and market structures."
          />
        </RequirementSection>

        <RequirementSection
          title="Mathematical Prerequisites"
          description="Required mathematical foundation courses"
        >
          <CourseCard
            code="MATH 120"
            title="Calculus I"
            credits={4}
            description="Introduction to differential and integral calculus of functions of one variable."
          />
          <CourseCard
            code="STAT 210"
            title="Statistical Methods"
            credits={4}
            prerequisites={["MATH 120"]}
            description="Introduction to probability and statistical inference with applications in economics."
          />
        </RequirementSection>

        <RequirementSection
          title="Upper Division Electives"
          description="Choose four courses from the following list"
        >
          <CourseCard
            code="ECON 410"
            title="International Economics"
            credits={4}
            prerequisites={["ECON 301", "ECON 302"]}
            description="Analysis of international trade and finance."
          />
          <CourseCard
            code="ECON 420"
            title="Labor Economics"
            credits={4}
            prerequisites={["ECON 301"]}
            description="Economic analysis of labor markets and wage determination."
          />
          <CourseCard
            code="ECON 430"
            title="Public Economics"
            credits={4}
            prerequisites={["ECON 301"]}
            description="Economic analysis of government spending, taxation, and policy."
          />
        </RequirementSection>
      </main>
    </div>
  );
}
