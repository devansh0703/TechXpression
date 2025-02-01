import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Landing } from "./pages/Landing"; // ✅ Fix: Named import

import Blog from "./pages/Blog";
import Tutorial from "./pages/Tutorial";
import Info from "./pages/Info";
import { TimelineDemo } from "./components/TimelineDemo";
import { Accordion } from "./components/AccordionItem";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Info" element={<Info />} />
          {/* idhar route daal */}
        </Routes>
      </Router>
      <TimelineDemo />
      <Accordion />
    </>
  );
}

export default App;
