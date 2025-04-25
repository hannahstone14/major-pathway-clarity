
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface RequirementSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function RequirementSection({ title, description, children }: RequirementSectionProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  const childrenWithCompletion = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isCompleted: completed.includes(child.props.code),
        onToggleComplete: (code: string) => {
          setCompleted(prev => 
            prev.includes(code) 
              ? prev.filter(c => c !== code)
              : [...prev, code]
          );
        }
      });
    }
    return child;
  });

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {childrenWithCompletion}
      </CardContent>
    </Card>
  );
}
