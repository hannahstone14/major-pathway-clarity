
export const getRemainingPrerequisites = (prerequisites: string[] | undefined, completedCourses: string[]): string[] => {
  if (!prerequisites) return [];
  return prerequisites.filter(prereq => !completedCourses.includes(prereq));
};
