import React, { useState, useEffect } from "react";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { safetyTopics } from "../data/safetyTopics";

const Info = () => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    initializeGroq();
  }, []);

  const initializeGroq = () => {
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey || apiKey === "your-api-key") {
        throw new Error("Please set a valid GROQ API key in your .env file");
      }

      const groqModel = new ChatGroq({
        apiKey,
        modelName: "mixtral-8x7b-32768",
        temperature: 0,
      });

      setModel(groqModel);
    } catch (error) {
      setError(error.message);
    }
  };

  const createSystemMessage = () =>
    new SystemMessage(
      "You are a social engineer and a human psychology expert, your job is to analyse email and SMS chats. ..."
    );

  const handleAnalyze = async () => {
    if (!userInput.trim()) {
      setResult("Please enter some content to analyze");
      return;
    }

    if (!model) {
      setResult("Model is not initialized. Please wait or refresh the page.");
      return;
    }

    setLoading(true);
    try {
      const messages = [createSystemMessage(), new HumanMessage(userInput)];

      const response = await model.invoke(messages);
      setResult(response.content);
    } catch (error) {
      setResult(`Analysis error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setSelectedSubtopic("");
    setExplanation("");
  };

  const handleSubtopicChange = (e) => {
    setSelectedSubtopic(e.target.value);
  };

  const handleGetExplanation = async () => {
    if (!selectedTopic || !selectedSubtopic) return;

    setLoading(true);
    try {
      // Hardcoded Google API Key
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCyoasSyFVFvbh_wCZX6U6QAiq57nJqbOA"
      ); // Hardcoded API key
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const topic = safetyTopics.topics.find(
        (t) => t.id === Number(selectedTopic)
      );
      const subtopic = topic.subtopics.find(
        (s) => s.id === Number(selectedSubtopic)
      );

      const prompt = `Explain ${subtopic.title} and provide 5 key points to look out for when recognizing such attacks.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = await response.text();

      setExplanation(output); // Show the generated explanation
    } catch (error) {
      setExplanation(`Error generating explanation: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Configuration Error</h2>
          <p>{error}</p>
          <p>
            Please check your .env file and ensure you have set a valid GROQ API
            key.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Social Engineering Detection</h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl mb-8">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste your suspicious chat or email content here for analysis..."
          rows="6"
          className="w-full bg-gray-800 text-white p-4 rounded-lg mb-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !userInput.trim()}
          className="bg-white text-black p-3 rounded-lg w-full text-xl font-semibold hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin h-6 w-6 border-4 border-t-4 border-gray-500 border-solid rounded-full mx-auto"></div>
          ) : (
            "Analyze Content"
          )}
        </button>
      </div>

      {result && (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl mb-8">
          <h3 className="text-2xl font-bold mb-4">Analysis Results</h3>
          <div>{result}</div>
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Social Engineering Teacher</h2>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Select a Topic:</label>
          <select
            value={selectedTopic}
            onChange={handleTopicChange}
            className="bg-gray-800 text-white p-3 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="">Select a topic</option>
            {safetyTopics.topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        {selectedTopic && (
          <div className="mb-4">
            <label className="block text-lg font-semibold">
              Select a Subtopic:
            </label>
            <select
              value={selectedSubtopic}
              onChange={handleSubtopicChange}
              className="bg-gray-800 text-white p-3 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-white"
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

        <div className="mt-6">
          <button
            onClick={handleGetExplanation}
            disabled={loading || !selectedTopic || !selectedSubtopic}
            className="bg-white text-black p-3 rounded-lg w-full text-xl font-semibold hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin h-6 w-6 border-4 border-t-4 border-gray-500 border-solid rounded-full mx-auto"></div>
            ) : (
              "Get Explanation"
            )}
          </button>
          {explanation && (
            <div className="mt-4">
              {explanation.split("\n").map((line, i) => (
                <p key={i} className="text-lg">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
