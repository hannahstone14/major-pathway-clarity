import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      
      <div className="fixed bottom-8 right-8">
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
