import React, { useState, useEffect } from 'react';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { safetyTopics } from '../data/safetyTopics';

const Main = () => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    initializeGroq();
  }, []);

  const initializeGroq = () => {
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey || apiKey === 'your-api-key') {
        throw new Error('Please set a valid GROQ API key in your .env file');
      }

      const groqModel = new ChatGroq({
        apiKey,
        modelName: "mixtral-8x7b-32768", // Changed from model to modelName
        temperature: 0
      });

      setModel(groqModel);
    } catch (error) {
      setError(error.message);
    }
  };

  const createSystemMessage = () => new SystemMessage(
    "You are a social engineer and a human psychology expert, your job is to analyse email and SMS chats. Now since you are expert in social engineering and human psychology your job is to detect whether there is possible phishing, pretexting or baiting attempt made, remember to not underestimate pretexting and baiting, as they might be chained to phishing as a follow up scam. You need to return the answer in a structured way which is given below:" + 
    "1) Is there an attempt of phishing(all types), pretexting or baiting? If yes then which one and how much percent you can assure that you are right and explain why you think it is that particular type." + 
    "2) Name of the manipulation tactic(eg: Scarcity, Urgency) and their definition:" + 
    "3) How did you identify the attempt and the tactic used:" + 
    "4) How do I identify such attempts and tactics in the future, i.e. tips and tricks to spot them:" + 
    "5) How to avoid such things in future, what steps should be taken." + 
    "6) How to respond to such incidents." + 
    "7) What is the appropriate response in the given case." + 
    "You are responsible for the security of the organisation from such social engineering attacks, make sure to analyse the input thoroughly, even analysing subtle linguistic inconsistencies like spelling errors or grammatical errors, take spoofing risks into consideration also and categorize the type of phishing(eg: smishing, whaling, etc) wherever necessary and make an unbiased and proper judgement along with in-depth analyses in such a way that the employee understands it clearly.Give a comprehensive analysis for each point."
  );

  const handleAnalyze = async () => {
    if (!userInput.trim()) {
      setResult('Please enter some content to analyze');
      return;
    }

    if (!model) {
      setResult('Model is not initialized. Please wait or refresh the page.');
      return;
    }

    setLoading(true);
    try {
      const messages = [
        createSystemMessage(),
        new HumanMessage(userInput)
      ];
      
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
    setSelectedSubtopic('');
    setExplanation('');
  };

  const handleSubtopicChange = (e) => {
    setSelectedSubtopic(e.target.value);
  };

  const handleGetExplanation = async () => {
    if (!selectedTopic || !selectedSubtopic) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCyoasSyFVFvbh_wCZX6U6QAiq57nJqbOA");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const topic = safetyTopics.topics.find(t => t.id === Number(selectedTopic));
      const subtopic = topic.subtopics.find(s => s.id === Number(selectedSubtopic));
      
      const prompt = `Explain ${subtopic.title} and provide 5 key points to look out for when recognizing such attacks.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = await response.text();
      
      setExplanation(output);
    } catch (error) {
      setExplanation(`Error generating explanation: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>Configuration Error</h2>
          <p>{error}</p>
          <p>Please check your .env file and ensure you have set a valid GROQ API key.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Social Engineering Detection</h1>
      <div className="input-section">
        <textarea 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste your suspicious chat or email content here for analysis..."
          rows="6"
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading || !userInput.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </div>
      {result && (
        <div className="result-section">
          <div className="analysis">
            <h3>Analysis Results</h3>
            <div>{result}</div>
          </div>
        </div>
      )}

      <div className="teacher-section">
        <h2>Social Engineering Teacher</h2>
        <div className="topic-selection">
          <label>
            Select a Topic:
            <select value={selectedTopic} onChange={handleTopicChange}>
              <option value="">Select a topic</option>
              {safetyTopics.topics.map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        {selectedTopic && (
          <div className="subtopic-selection">
            <label>
              Select a Subtopic:
              <select value={selectedSubtopic} onChange={handleSubtopicChange}>
                <option value="">Select a subtopic</option>
                {safetyTopics.topics
                  .find(t => t.id === Number(selectedTopic))
                  ?.subtopics.map(subtopic => (
                    <option key={subtopic.id} value={subtopic.id}>
                      {subtopic.title}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        )}

        <div className="explanation-section">
          <button 
            onClick={handleGetExplanation}
            disabled={loading || !selectedTopic || !selectedSubtopic}
          >
            {loading ? 'Loading...' : 'Get Explanation'}
          </button>
          {explanation && (
            <div className="explanation-content">
              {explanation.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;