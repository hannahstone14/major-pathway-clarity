
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SchedulePlanner() {
  const navigate = useNavigate();
  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

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
                  <TableCell className="h-12 border border-border">
                    Course {i + 1}
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
                  <TableCell className="h-12 border border-border">
                    Course {i + 1}
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
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-4xl font-bold mb-6">Schedule Planner</h1>
      
      <div className="max-w-[1200px] mx-auto">
        {years.map((year) => (
          <YearTable key={year} year={year} />
        ))}
      </div>
    </div>
  );
}
