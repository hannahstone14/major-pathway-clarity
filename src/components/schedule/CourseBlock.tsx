
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';

interface CourseBlockProps {
  id: string;
  code: string;
  title: string;
  credits: number;
}

export function CourseBlock({ id, code, title, credits }: CourseBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="text-sm font-medium">{code}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-xs text-muted-foreground">{credits} credits</div>
    </Card>
  );
}
