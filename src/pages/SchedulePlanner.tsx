
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { YearTable } from '@/components/schedule/YearTable';
import { CourseBlock } from '@/components/schedule/CourseBlock';
import { RequirementsList } from '@/components/schedule/RequirementsList';

const SchedulePlanner = () => {
  const [selectedCourses, setSelectedCourses] = useState<{ [key: string]: string }>({});

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold mb-8">Course Schedule Planner</h1>
      
      <div className="flex gap-6">
        {/* Requirements List */}
        <div className="w-1/4">
          <RequirementsList />
        </div>
        
        {/* Year Tables */}
        <div className="w-3/4 space-y-8">
          <DndContext collisionDetection={closestCenter}>
            <YearTable year="Freshman" />
            <YearTable year="Sophomore" />
            <YearTable year="Junior" />
            <YearTable year="Senior" />
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default SchedulePlanner;
