import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Printer, FileText } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState, useRef } from "react";
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
  const [scheduledCourses, setScheduledCourses] = useState<string[]>([]);
  const scheduleRef = useRef<HTMLDivElement>(null);
  
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

  // Handle printing schedule
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Schedule Plan - ${selectedMajor}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1, h2, h3 { color: #333; }
              .year { margin-bottom: 30px; }
              .semester { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              th { background-color: #f2f2f2; }
              .course { padding: 10px; border: 1px solid #ddd; margin-bottom: 5px; background-color: #f9f9f9; }
              .completed { background-color: #e6ffe6; }
              .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
              .logo { font-weight: bold; font-size: 24px; }
              .date { color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">Major Pathway Clarity</div>
              <div class="date">Generated: ${new Date().toLocaleDateString()}</div>
            </div>
            <h1>${selectedMajor} - Four Year Schedule Plan</h1>
            ${generatePrintContent()}
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
      toast.success("Print preview opened");
    }
  };

  // Export schedule as CSV
  const handleExport = () => {
    let csvContent = "Year,Semester,Course Code,Course Title,Credits\n";
    
    Object.entries(schedule).forEach(([year, yearData]) => {
      Object.entries(yearData).forEach(([semester, semesterData]) => {
        Object.values(semesterData).forEach((course) => {
          if (course) {
            const typedCourse = course as ScheduledCourse; // Fix type issue by casting
            csvContent += `${year},${semester},${typedCourse.code},${typedCourse.title},${typedCourse.credits}\n`;
          }
        });
      });
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedMajor}_schedule_plan.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Schedule exported as CSV");
  };

  // Generate content for printing
  const generatePrintContent = () => {
    let content = '';
    
    Object.entries(schedule).forEach(([year, yearData]) => {
      content += `<div class="year"><h2>${year} Year</h2>`;
      
      content += `<div class="semester"><h3>Fall Semester</h3><table>
        <tr><th>Course Code</th><th>Course Title</th><th>Credits</th></tr>`;
      
      Object.values(yearData.fall).forEach(course => {
        if (course) {
          content += `<tr>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.credits}</td>
          </tr>`;
        }
      });
      content += `</table></div>`;
      
      content += `<div class="semester"><h3>Spring Semester</h3><table>
        <tr><th>Course Code</th><th>Course Title</th><th>Credits</th></tr>`;
      
      Object.values(yearData.spring).forEach(course => {
        if (course) {
          content += `<tr>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.credits}</td>
          </tr>`;
        }
      });
      content += `</table></div>`;
      content += `</div>`;
    });
    
    return content;
  };

  const handleCourseToggle = (code: string) => {
    // Don't allow toggling if course is scheduled
    if (scheduledCourses.includes(code)) {
      toast.error("Cannot mark a scheduled course as completed");
      return;
    }
    
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

      // Add course to scheduled courses
      setScheduledCourses(prev => [...prev, course.code]);

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
    // Get the course code before removing it
    const courseToRemove = schedule[year][semester][slot];
    if (courseToRemove) {
      // Remove course from scheduled courses
      setScheduledCourses(prev => prev.filter(code => code !== courseToRemove.code));
    }

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
    <AccordionItem value={year} className="border rounded-lg mb-4 bg-white/50 backdrop-blur-sm">
      <AccordionTrigger className="hover:no-underline px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-primary">{year} Year</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="mb-8 border-none shadow-none bg-transparent">
          <CardContent className="flex gap-8 pt-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4 text-primary/80">Fall Semester</h3>
              <Table>
                <TableBody>
                  {[...Array(6)].map((_, i) => (
                    <TableRow key={`fall-${i}`}>
                      <TableCell 
                        className="h-[100px] border border-border/50 rounded-lg transition-colors hover:bg-accent/5"
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
                          <div className="h-full flex items-center justify-center text-muted-foreground">
                            {i === 0 ? "Drop course here" : ""}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4 text-primary/80">Spring Semester</h3>
              <Table>
                <TableBody>
                  {[...Array(6)].map((_, i) => (
                    <TableRow key={`spring-${i}`}>
                      <TableCell 
                        className="h-[100px] border border-border/50 rounded-lg transition-colors hover:bg-accent/5"
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
                          <div className="h-full flex items-center justify-center text-muted-foreground">
                            {i === 0 ? "Drop course here" : ""}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );

  // Define the requirement categories from the Economics page
  const quantitativeRequirements = [
    "MATH UN1101", "MATH UN1102", 
    "MATH UN1201", "MATH UN1205", 
    "STAT UN1201"
  ];

  const coreRequirements = [
    "ECON UN1105", "ECON AP/IB", 
    "ECON UN3211",
    "ECON UN3213",
    "ECON UN3412"
  ];

  const seminarRequirements = [
    "ECON GU4911",
    "ECON GU4913",
    "ECON GU4918",
    "ECON GU4921"
  ];

  const additionalRequirements: string[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)} className="hover:bg-white/50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[150px] hover:bg-white/50">
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
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="hover:bg-white/50">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Schedule
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Print Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    This will open a print-friendly version of your schedule in a new window.
                  </p>
                  <Button onClick={handlePrint} className="w-full">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Preview
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button onClick={handleExport} variant="outline" className="hover:bg-white/50">
              <FileText className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="flex gap-8" ref={scheduleRef}>
          {selectedMajor === "Economics" && (
            <div className="w-[400px] space-y-6 animate-fade-in">
              {/* Quantitative Requirements Section */}
              <RequirementSection
                title="I. Quantitative Requirements"
                description="Mathematical foundation courses required for the Economics major"
                completedCourses={completedCourses}
                onCourseToggle={handleCourseToggle}
                requiredCourses={quantitativeRequirements}
                scheduledCourses={scheduledCourses}
              >
                <CourseCard
                  code="MATH UN1101"
                  title="Calculus I"
                  credits={3}
                  description="Introduction to differential calculus of functions of one variable."
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="MATH UN1102"
                  title="Calculus II"
                  credits={3}
                  description="Introduction to integral calculus of functions of one variable."
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="MATH UN1201"
                  title="Calculus III"
                  credits={3}
                  prerequisites={["MATH UN1102"]}
                  description="Vector functions, partial differentiation, multiple integrals."
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="MATH UN1205"
                  title="Accelerated Multivariable Calculus"
                  credits={4}
                  prerequisites={["MATH UN1102"]}
                  description="Accelerated version of Calculus III covering multivariable calculus and linear algebra."
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="STAT UN1201"
                  title="Introduction to Statistics"
                  credits={3}
                  description="Basic concepts of statistics and probability"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
              </RequirementSection>

              {/* Core Requirements Section */}
              <RequirementSection
                title="II. Core Courses"
                description="These foundational courses are required for all Economics majors"
                completedCourses={completedCourses}
                onCourseToggle={handleCourseToggle}
                requiredCourses={coreRequirements}
                scheduledCourses={scheduledCourses}
              >
                <CourseCard
                  code="ECON UN1105"
                  title="Principles of Economics"
                  credits={4}
                  description="Introduction to economic concepts and methods"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="ECON UN3211"
                  title="Intermediate Microeconomics"
                  credits={4}
                  prerequisites={["ECON UN1105"]}
                  description="Analysis of determination of price and output in different market situations"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="ECON UN3213"
                  title="Intermediate Macroeconomics"
                  credits={4}
                  prerequisites={["ECON UN1105"]}
                  description="Analysis of determination of national income, employment, and price levels"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="ECON UN3412"
                  title="Introduction to Econometrics"
                  credits={4}
                  prerequisites={["STAT UN1201"]}
                  description="Statistical methods applied to economic data"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
              </RequirementSection>

              {/* Electives Section */}
              <ElectivesSection 
                completedCourses={completedCourses}
                onCourseToggle={handleCourseToggle}
                scheduledCourses={scheduledCourses}
              />

              {/* Seminar Requirements Section */}
              <RequirementSection
                title="IV. Seminar Requirement"
                description="Take one of the following seminars (Prerequisites: UN3211, UN3213, UN3412)"
                completedCourses={completedCourses}
                onCourseToggle={handleCourseToggle}
                requiredCourses={seminarRequirements}
                scheduledCourses={scheduledCourses}
              >
                <CourseCard
                  code="ECON GU4911"
                  title="Seminar in Microeconomics"
                  credits={4}
                  prerequisites={["ECON UN3211", "ECON UN3213"]}
                  description="Advanced topics in microeconomic theory and applications"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="ECON GU4913"
                  title="Seminar in Macroeconomics"
                  credits={4}
                  prerequisites={["ECON UN3211", "ECON UN3213"]}
                  description="Advanced topics in macroeconomic theory and policy"
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="ECON GU4918"
                  title="Seminar in Econometrics"
                  credits={4}
                  prerequisites={["ECON UN3211", "ECON UN3213", "ECON UN3412"]}
                  description="Advanced seminar on econometric methods."
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
                <CourseCard
                  code="ECON GU4921"
                  title="Seminar in Political Economy"
                  credits={4}
                  prerequisites={["ECON UN3211", "ECON UN3213", "ECON GU4370"]}
                  description="Advanced seminar on political economy topics."
                  completedCourses={completedCourses}
                  onToggleComplete={handleCourseToggle}
                />
              </RequirementSection>

              {/* Additional Notes Section */}
              <RequirementSection
                title="Additional Notes"
                description="Important information about the Economics major requirements"
                completedCourses={completedCourses}
                onCourseToggle={handleCourseToggle}
                requiredCourses={additionalRequirements}
                scheduledCourses={scheduledCourses}
              >
                <div className="w-full p-4 bg-muted/50 rounded-lg">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Minimum 9 economics lecture courses, 5 must be taken in the Columbia Economics Department.</li>
                    <li>Barnard seminars don't count for the seminar requirement.</li>
                    <li>You must get a C- or higher in major classes, except for UN1105 which can be Pass/D/Fail.</li>
                    <li>No credit for courses taken before prerequisites.</li>
                    <li>Transfer credits must be approved by the department.</li>
                  </ul>
                </div>
              </RequirementSection>
            </div>
          )}
          
          <div className="flex-1 bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-fade-in">
            <h1 className="text-4xl font-bold mb-6 text-primary">Schedule Planner</h1>
            <div className="max-w-[1200px] mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {years.map((year) => (
                  <YearTable key={year} year={year} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
