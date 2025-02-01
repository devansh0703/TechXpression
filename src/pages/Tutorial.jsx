import React from "react";

const Tutorial = () => {
  const tutorials = [
    {
      id: 1,
      title: "Understanding Phishing Attacks",
      videoId: "XBkzBrXlle0", // Replace with your actual YouTube video ID
    },
    {
      id: 2,
      title: "Social Engineering Techniques",
      videoId: "gWGhUdHItto", // Replace with your actual YouTube video ID
    },
    {
      id: 3,
      title: "Advanced Malware Analysis",
      videoId: "gWGhUdHItto", // Replace with your actual YouTube video ID
    },
    {
      id: 4,
      title: "How to Prevent Phishing",
      videoId: "gWGhUdHItto", // Replace with your actual YouTube video ID
    },
    {
      id: 5,
      title: "Cybersecurity Best Practices",
      videoId: "gWGhUdHItto", // Replace with your actual YouTube video ID
    },
    {
      id: 6,
      title: "Exploring Social Engineering Threats",
      videoId: "gWGhUdHItto", // Replace with your actual YouTube video ID
    },
  ];

  return (
    <div className="tutorial-container bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-green-500 mb-8">
        Cybersecurity Tutorials
      </h1>

      <div className="tutorials-list space-y-8">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="tutorial-card border-2 border-green-500 p-4 rounded-lg shadow-lg hover:bg-green-500 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{tutorial.title}</h2>
            <div className="video-embed-container">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                title={tutorial.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
