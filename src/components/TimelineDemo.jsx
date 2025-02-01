import React from "react";
import { Timeline } from "../components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Detection and Prevention toolkit",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-2xl  font-normal mb-8">
            advanced ai solution to tackel social eniginerring attcksw
          </p>
        </div>
      ),
    },
    {
      title: "Personalized Trainer🤖",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-2xl font-normal mb-8">
            Train your employees to effectively detetct prevent and respond to
            social engineering attacks
          </p>
        </div>
      ),
    },
    {
      title: "Personalized Quizzes",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-2xl  font-normal mb-8">
            test your knowledge with personalized social engineering and cyber
            security related quizes
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
