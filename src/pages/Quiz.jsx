import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { safetyTopics } from "../data/safetyTopics";

const Quiz = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setSelectedSubtopic("");
    setFeedback("");
  };

  const handleSubtopicChange = (e) => {
    setSelectedSubtopic(e.target.value);
    setFeedback("");
  };

  const handleSubmitAnswer = async () => {
    if (!selectedTopic || !selectedSubtopic || !userAnswer.trim()) {
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCyoasSyFVFvbh_wCZX6U6QAiq57nJqbOA"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const topic = safetyTopics.topics.find(
        (t) => t.id === Number(selectedTopic)
      );
      const subtopic = topic.subtopics.find(
        (s) => s.id === Number(selectedSubtopic)
      );

      const prompt = `You are a social engineering and human psychology trainer in an organization who trains employees who uses the Socratic method. The topic is ${topic.title}, ${subtopic.title}, and the student's response is: "${userAnswer}". 
      
      Please respond in the following format:
      
       Ask a thought-provoking follow-up questions that help deepen their understanding
       Provide gentle guidance if there are misconceptions
       Encourage further exploration of specific aspects they might have missed
      
      Keep the tone encouraging and supportive while challenging them to think deeper.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = await response.text();

      setFeedback(output);
    } catch (error) {
      setFeedback(`Error generating feedback: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white p-8 rounded-xl shadow-lg w-full">
      <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 shadow-lg">
        Social Engineering Quiz
      </h2>

      <div className="space-y-8">
        {/* Topic Selection */}
        <div>
          <label className="block text-xl font-medium mb-2">
            Select Topic:
          </label>
          <select
            value={selectedTopic}
            onChange={handleTopicChange}
            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a topic</option>
            {safetyTopics.topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subtopic Selection */}
        {selectedTopic && (
          <div>
            <label className="block text-xl font-medium mb-2">
              Select Subtopic:
            </label>
            <select
              value={selectedSubtopic}
              onChange={handleSubtopicChange}
              className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a subtopic</option>
              {safetyTopics.topics
                .find((t) => t.id === Number(selectedTopic))
                ?.subtopics.map((subtopic) => (
                  <option key={subtopic.id} value={subtopic.id}>
                    {subtopic.title}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* User Answer */}
        {selectedTopic && selectedSubtopic && (
          <div>
            <label className="block text-xl font-medium mb-2">
              Your Answer:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Share your understanding of this topic..."
              className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !userAnswer.trim()}
              className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-500"
            >
              {loading ? "Getting Feedback..." : "Submit Answer"}
            </button>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Teacher's Feedback:
            </h3>
            <div className="p-4 bg-green-900 text-white rounded-lg whitespace-pre-wrap">
              {feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
