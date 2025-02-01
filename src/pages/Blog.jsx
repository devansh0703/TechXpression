import React, { useState } from "react";
import BlogList from "../components/BlogList";

const Blog = () => {
  const initialBlogs = [
    {
      id: 1,
      title: "Understanding Phishing Attacks in 2024",
      content:
        "Phishing attacks have become increasingly sophisticated, using AI-generated content to create more convincing emails...",
      category: "phishing",
      votes: 45,
      comments: [
        { id: 1, text: "Great explanation of modern phishing techniques!" },
        {
          id: 2,
          text: "I recently encountered a similar attack at my workplace.",
        },
      ],
    },
    {
      id: 2,
      title: "The Rise of QR Code Baiting",
      content:
        "Cybercriminals are increasingly using malicious QR codes in public places to trick users...",
      category: "baiting",
      votes: 32,
      comments: [
        {
          id: 3,
          text: "QR codes are everywhere these days, we need to be careful.",
        },
      ],
    },
    {
      id: 3,
      title: "New Ransomware Strain Targeting Cloud Services",
      content:
        "A new strain of ransomware has been detected that specifically targets cloud storage services...",
      category: "malware",
      votes: 67,
      comments: [
        {
          id: 4,
          text: "This is scary stuff. Time to review our backup strategy.",
        },
        { id: 5, text: "Does anyone know if this affects Google Drive?" },
      ],
    },
    {
      id: 4,
      title: "Social Engineering Through Professional Networks",
      content:
        "Attackers are creating elaborate fake profiles on LinkedIn and other professional networks...",
      category: "social-engineering",
      votes: 53,
      comments: [
        {
          id: 6,
          text: "I've seen so many suspicious connection requests lately.",
        },
      ],
    },
  ];

  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "phishing",
    "baiting",
    "malware",
    "social-engineering",
  ];

  const handleVote = (id, type) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, votes: type === "up" ? blog.votes + 1 : blog.votes - 1 }
          : blog
      )
    );
  };

  const addComment = (blogId, comment) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              comments: [...blog.comments, { id: Date.now(), text: comment }], // Add comment to the blog
            }
          : blog
      )
    );
  };

  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="app-container bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-green-500 mb-6">
        Cybersecurity Blog
      </h1>
      <div className="category-filter mb-6">
        <span>Filter by: </span>
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn px-4 py-2 rounded-lg text-white font-medium mr-4 ${
              selectedCategory === category
                ? "bg-green-500 border-2 border-green-600"
                : "bg-transparent border-2 border-transparent hover:bg-green-500 hover:border-green-600"
            } transition-all duration-300`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <BlogList
        blogs={filteredBlogs}
        onVote={handleVote}
        onComment={addComment}
      />
    </div>
  );
};

export default Blog;
