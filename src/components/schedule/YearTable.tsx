
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface YearTableProps {
  year: string;
}

export function YearTable({ year }: YearTableProps) {
  return (
    <Card className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{year} Year</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Fall Semester */}
        <div>
          <h3 className="text-lg font-medium mb-2">Fall Semester</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(6).fill(null).map((_, index) => (
                <TableRow key={`fall-${index}`}>
                  <TableCell className="h-16 border-2 border-dashed border-muted" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Spring Semester */}
        <div>
          <h3 className="text-lg font-medium mb-2">Spring Semester</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(6).fill(null).map((_, index) => (
                <TableRow key={`spring-${index}`}>
                  <TableCell className="h-16 border-2 border-dashed border-muted" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
