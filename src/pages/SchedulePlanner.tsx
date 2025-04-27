
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { RequirementSection } from "@/components/RequirementSection";
import { ElectivesSection } from "@/components/ElectivesSection";
import { CourseCard } from "@/components/CourseCard";
import { toast } from "sonner";

interface ScheduledCourse {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  description: string;
}

interface SemesterSchedule {
  [key: number]: ScheduledCourse | null;
}

interface YearSchedule {
  fall: SemesterSchedule;
  spring: SemesterSchedule;
}

export default function SchedulePlanner() {
  const navigate = useNavigate();
  const years = ["Freshman", "Sophomore", "Junior", "Senior"];
  const [selectedMajor, setSelectedMajor] = useState("Select Major");
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  
  // Initialize schedule state
  const [schedule, setSchedule] = useState<Record<string, YearSchedule>>(() =>
    years.reduce((acc, year) => ({
      ...acc,
      [year]: {
        fall: Array(6).fill(null).reduce((obj, _, i) => ({ ...obj, [i]: null }), {}),
        spring: Array(6).fill(null).reduce((obj, _, i) => ({ ...obj, [i]: null }), {})
      }
    }), {})
  );

  const majors = [
    "Computer Science",
    "Economics",
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry"
  ];

  const handleCourseToggle = (code: string) => {
    setCompletedCourses(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, year: string, semester: 'fall' | 'spring', slot: number) => {
    e.preventDefault();
    
    // Try to get course data from regular drag
    const courseData = e.dataTransfer.getData("application/json");
    if (courseData) {
      const course: ScheduledCourse = JSON.parse(courseData);
      
      // Check if course is already scheduled
      for (const yearData of Object.values(schedule)) {
        for (const semesterData of Object.values(yearData)) {
          const scheduledCourses = Object.values(semesterData).filter(Boolean) as ScheduledCourse[];
          if (scheduledCourses.some(c => c && c.code === course.code)) {
            toast.error("This course is already scheduled");
            return;
          }
        }
      }

      setSchedule(prev => ({
        ...prev,
        [year]: {
          ...prev[year],
          [semester]: {
            ...prev[year][semester],
            [slot]: course
          }
        }
      }));
    }

    // Try to get moved course data
    const movedCourseData = e.dataTransfer.getData("move-course");
    if (movedCourseData) {
      const { course, sourceYear, sourceSemester, sourceSlot } = JSON.parse(movedCourseData);
      
      // Remove from old position
      setSchedule(prev => {
        const newSchedule = { ...prev };
        newSchedule[sourceYear][sourceSemester][sourceSlot] = null;
        newSchedule[year][semester][slot] = course;
        return newSchedule;
      });
    }
  };

  const handleScheduledCourseDragStart = (
    e: React.DragEvent<HTMLDivElement>, 
    course: ScheduledCourse,
    year: string,
    semester: 'fall' | 'spring',
    slot: number
  ) => {
    e.dataTransfer.setData("move-course", JSON.stringify({
      course,
      sourceYear: year,
      sourceSemester: semester,
      sourceSlot: slot
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const handleRemoveCourse = (year: string, semester: 'fall' | 'spring', slot: number) => {
    setSchedule(prev => ({
      ...prev,
      [year]: {
        ...prev[year],
        [semester]: {
          ...prev[year][semester],
          [slot]: null
        }
      }
    }));
    toast.success("Course removed from schedule");
  };

  const YearTable = ({ year }: { year: string }) => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{year} Year</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Fall Semester</h3>
          <Table>
            <TableBody>
              {[...Array(6)].map((_, i) => (
                <TableRow key={`fall-${i}`}>
                  <TableCell 
                    className="h-12 border border-border"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, year, 'fall', i)}
                  >
                    {schedule[year]?.fall[i] ? (
                      <CourseCard 
                        code={schedule[year].fall[i]!.code}
                        title={schedule[year].fall[i]!.title}
                        credits={schedule[year].fall[i]!.credits}
                        prerequisites={schedule[year].fall[i]!.prerequisites}
                        description={schedule[year].fall[i]!.description}
                        completedCourses={completedCourses}
                        isScheduled={true}
                        onRemoveFromSchedule={() => handleRemoveCourse(year, 'fall', i)}
                      />
                    ) : (
                      "Drop course here"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Spring Semester</h3>
          <Table>
            <TableBody>
              {[...Array(6)].map((_, i) => (
                <TableRow key={`spring-${i}`}>
                  <TableCell 
                    className="h-12 border border-border"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, year, 'spring', i)}
                  >
                    {schedule[year]?.spring[i] ? (
                      <CourseCard 
                        code={schedule[year].spring[i]!.code}
                        title={schedule[year].spring[i]!.title}
                        credits={schedule[year].spring[i]!.credits}
                        prerequisites={schedule[year].spring[i]!.prerequisites}
                        description={schedule[year].spring[i]!.description}
                        completedCourses={completedCourses}
                        isScheduled={true}
                        onRemoveFromSchedule={() => handleRemoveCourse(year, 'spring', i)}
                      />
                    ) : (
                      "Drop course here"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px]">
              {selectedMajor}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[150px]">
            {majors.map((major) => (
              <DropdownMenuItem
                key={major}
                onClick={() => setSelectedMajor(major)}
              >
                {major}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex gap-8">
        {selectedMajor === "Economics" && (
          <div className="w-[400px] space-y-6">
            <RequirementSection
              title="Core Requirements"
              description="Required foundation courses for Economics"
              completedCourses={completedCourses}
              onCourseToggle={handleCourseToggle}
              requiredCourses={[
                "ECON UN1105",
                "ECON UN3211",
                "ECON UN3213",
                "ECON UN3412",
                "MATH UN1101",
                "STAT UN1201"
              ]}
            >
              <CourseCard
                code="ECON UN1105"
                title="Principles of Economics"
                credits={3}
                description="Introduction to economic concepts and methods"
                completedCourses={completedCourses}
              />
              <CourseCard
                code="ECON UN3211"
                title="Intermediate Microeconomics"
                credits={4}
                prerequisites={["ECON UN1105"]}
                description="Analysis of determination of price and output in different market situations"
                completedCourses={completedCourses}
              />
              <CourseCard
                code="ECON UN3213"
                title="Intermediate Macroeconomics"
                credits={4}
                prerequisites={["ECON UN1105"]}
                description="Analysis of determination of national income, employment, and price levels"
                completedCourses={completedCourses}
              />
              <CourseCard
                code="ECON UN3412"
                title="Introduction to Econometrics"
                credits={4}
                prerequisites={["STAT UN1201"]}
                description="Statistical methods applied to economic data"
                completedCourses={completedCourses}
              />
              <CourseCard
                code="MATH UN1101"
                title="Calculus I"
                credits={3}
                description="Limits, continuity, differentiation and integration"
                completedCourses={completedCourses}
              />
              <CourseCard
                code="STAT UN1201"
                title="Introduction to Statistics"
                credits={3}
                description="Basic concepts of statistics and probability"
                completedCourses={completedCourses}
              />
            </RequirementSection>

            <RequirementSection
              title="Seminars"
              description="Required senior seminars"
              completedCourses={completedCourses}
              onCourseToggle={handleCourseToggle}
              requiredCourses={[
                "ECON GU4911",
                "ECON GU4913"
              ]}
            >
              <CourseCard
                code="ECON GU4911"
                title="Seminar in Microeconomics"
                credits={4}
                prerequisites={["ECON UN3211", "ECON UN3213"]}
                description="Advanced topics in microeconomic theory and applications"
                completedCourses={completedCourses}
              />
              <CourseCard
                code="ECON GU4913"
                title="Seminar in Macroeconomics"
                credits={4}
                prerequisites={["ECON UN3211", "ECON UN3213"]}
                description="Advanced topics in macroeconomic theory and policy"
                completedCourses={completedCourses}
              />
            </RequirementSection>

            <ElectivesSection
              completedCourses={completedCourses}
              onCourseToggle={handleCourseToggle}
            />
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">Schedule Planner</h1>
          <div className="max-w-[1200px] mx-auto">
            {years.map((year) => (
              <YearTable key={year} year={year} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
