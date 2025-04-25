
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  code: string;
  title: string;
  credits: number;
  prerequisites?: string[];
  description: string;
}

export function CourseCard({ code, title, credits, prerequisites, description }: CourseCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="font-mono text-lg">{code}</span>
          <span className="text-sm text-muted-foreground">{credits} credits</span>
        </CardTitle>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {prerequisites && prerequisites.length > 0 && (
          <div className="mt-2">
            <span className="text-xs font-semibold text-secondary">Prerequisites: </span>
            <span className="text-xs text-muted-foreground">{prerequisites.join(", ")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
