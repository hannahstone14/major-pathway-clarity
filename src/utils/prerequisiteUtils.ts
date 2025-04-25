
export const getRemainingPrerequisites = (prerequisites: string[] | undefined, completedCourses: string[]): string[] => {
  if (!prerequisites) return [];
  
  // Handle alternative prerequisites (courses that fulfill the same requirement)
  const alternativeMappings: { [key: string]: string[] } = {
    "MATH UN1101": ["MATH UN1102"],  // Calc I or Calc II
    "MATH UN1102": ["MATH UN1101"],  // Calc II or Calc I
    "MATH UN1201": ["MATH UN1205"],  // Calc III or Accelerated Multi
    "MATH UN1205": ["MATH UN1201"],  // Accelerated Multi or Calc III
  };
  
  // Filter prerequisites, considering both direct completion and alternatives
  return prerequisites.filter(prereq => {
    const isDirectlyCompleted = completedCourses.includes(prereq);
    const alternatives = alternativeMappings[prereq] || [];
    const isCompletedViaAlternative = alternatives.some(alt => completedCourses.includes(alt));
    
    return !isDirectlyCompleted && !isCompletedViaAlternative;
  });
};
