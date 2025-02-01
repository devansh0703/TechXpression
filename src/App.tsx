import React from 'react';
import Main from './components/Main';
import Blog from './components/Blog';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">ASSET - Anti Social-Engineering Security & Educational Toolkit</h1>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Main />
        <div className="mt-8">
          <Quiz />
        </div>
        <div className="mt-8">
          <Blog />
        </div>
      </div>
    </div>
  );
}

export default App;