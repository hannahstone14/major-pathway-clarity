
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequirementSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function RequirementSection({ title, description, children }: RequirementSectionProps) {
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </CardContent>
    </Card>
  );
}
