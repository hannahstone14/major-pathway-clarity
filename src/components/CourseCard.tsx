
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getRemainingPrerequisites } from "@/utils/prerequisiteUtils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  description: string;
  isCompleted?: boolean;
  onToggleComplete?: (code: string) => void;
  completedCourses: string[];
  isScheduled?: boolean;
  onRemoveFromSchedule?: () => void;
}

export function CourseCard({ 
  code, 
  title, 
  credits, 
  prerequisites, 
  description,
  isCompleted = false,
  onToggleComplete,
  completedCourses,
  isScheduled,
  onRemoveFromSchedule
}: CourseCardProps) {
  const remainingPrereqs = getRemainingPrerequisites(prerequisites || [], completedCourses);
  const isComplete = completedCourses.includes(code);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Don't allow dragging if course is completed
    if (isComplete) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData("application/json", JSON.stringify({
      code,
      title,
      credits,
      prerequisites,
      description
    }));
  };

  return (
    <div 
      draggable={!isScheduled && !isComplete}
      onDragStart={handleDragStart}
      className={`flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg 
        ${!isScheduled && !isComplete ? 'cursor-move' : ''} 
        ${isComplete ? 'opacity-50' : ''}
        border border-transparent hover:border-border`}
    >
      <Checkbox
        id={code}
        checked={completedCourses.includes(code)}
        onCheckedChange={() => onToggleComplete && onToggleComplete(code)}
      />
      <div className="grid gap-1.5 leading-none flex-grow">
        <label
          htmlFor={code}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {code} - {title}
        </label>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>{credits} credits</p>
          {prerequisites && prerequisites.length > 0 && (
            <p>
              Prerequisites: {
                remainingPrereqs.length === 0 
                  ? <span className="text-green-600">All prerequisites met</span>
                  : remainingPrereqs.join(", ")
              }
            </p>
          )}
          {description && (
            <p className="text-xs italic">{description}</p>
          )}
        </div>
      </div>
      {isScheduled && onRemoveFromSchedule && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-6 w-6" 
          onClick={onRemoveFromSchedule}
          title="Remove from schedule"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
