
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <Button 
          onClick={() => navigate('/requirements')}
          className="shadow-lg"
        >
          <BookOpen className="mr-2" />
          View Requirements
        </Button>
        <Button 
          onClick={() => navigate('/schedule')}
          className="shadow-lg"
        >
          <Calendar className="mr-2" />
          Plan Your Schedule
        </Button>
      </div>
    </div>
  );
};

export default Index;
