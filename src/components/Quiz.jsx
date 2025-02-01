import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { safetyTopics } from '../data/safetyTopics';

const Quiz = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setSelectedSubtopic('');
    setFeedback('');
  };

  const handleSubtopicChange = (e) => {
    setSelectedSubtopic(e.target.value);
    setFeedback('');
  };

  const handleSubmitAnswer = async () => {
    if (!selectedTopic || !selectedSubtopic || !userAnswer.trim()) {
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyCyoasSyFVFvbh_wCZX6U6QAiq57nJqbOA');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const topic = safetyTopics.topics.find((t) => t.id === Number(selectedTopic));
      const subtopic = topic.subtopics.find((s) => s.id === Number(selectedSubtopic));

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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Social Engineering Quiz</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Topic:
          </label>
          <select
            value={selectedTopic}
            onChange={handleTopicChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subtopic:
            </label>
            <select
              value={selectedSubtopic}
              onChange={handleSubtopicChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        {selectedTopic && selectedSubtopic && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Share your understanding of this topic..."
              className="w-full p-3 border rounded-lg min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !userAnswer.trim()}
              className="mt-4 w-full"
            >
              {loading ? 'Getting Feedback...' : 'Submit Answer'}
            </button>
          </div>
        )}

        {feedback && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Teacher's Feedback:</h3>
            <div className="p-4 bg-blue-50 rounded-lg whitespace-pre-wrap">
              {feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;