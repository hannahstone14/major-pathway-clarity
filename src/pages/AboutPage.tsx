import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">About Major Pathway Clarity</h2>
      <div className="space-y-4 text-lg text-foreground">
        <p>
          We are two Columbia students who, like many others, found ourselves overwhelmed with planning our schedules four years in advance. Trying to navigate credit limits while ensuring we could fulfill the requirements for both our desired majors and minors felt like a monumental task.
        </p>
        <p>
          There are so many rules, prerequisites, and potential pathways to keep track of. Juggling departmental requirements, Core Curriculum mandates, and personal academic interests often leads to confusion and stress.
        </p>
        <p>
          This project, Major Pathway Clarity, was born out of that frustration. Our goal is to create a tool that simplifies academic planning, helps visualize potential schedules, and makes navigating Columbia's complex requirements more manageable and less daunting. We aim for a clear, intuitive, and visually appealing interface to bring clarity to the major pathway planning process.
        </p>
      </div>
    </div>
  );
};

export default AboutPage; 