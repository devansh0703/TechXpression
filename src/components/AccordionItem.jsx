import React, { useState } from "react";
import { motion } from "framer-motion";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-600">
      <button
        className="w-full flex justify-between items-center py-6 px-8 text-2xl font-bold text-white bg-black hover:bg-gray-900 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-3xl">{isOpen ? "−" : "+"}</span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-8 pb-6 text-lg text-gray-300 bg-black"
      >
        {content}
      </motion.div>
    </div>
  );
};

export const Accordion = () => {
  const accordionData = [
    {
      title: "🔍 What is Social Engineering?",
      content:
        "Social engineering is a technique used by cybercriminals to trick individuals into revealing sensitive information.",
    },
    {
      title: "🛡 How can I stay safe?",
      content:
        "Verify requests for sensitive data, avoid clicking unknown links, and be aware of phishing attempts.",
    },
    {
      title: "📚 Why is security training important?",
      content:
        "Training helps individuals and organizations recognize and prevent cyber threats effectively.",
    },
  ];

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black text-white p-4">
      <div className="w-full max-w-3xl">
        {accordionData.map((item, index) => (
          <AccordionItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
