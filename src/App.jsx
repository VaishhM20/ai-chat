import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function generateAnswer() {
    setIsGenerating(true);
    setCurrentAnswer("loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCtxyZlRSoeSYWLBr6mScCygd_AiUE5bLc",
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });

      setCurrentAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setCurrentAnswer("An error occurred while generating the answer.");
    } finally {
      setIsGenerating(false);
    }
  }

  function addQuestion() {
    setQuestions([...questions, { question: currentQuestion, answer: currentAnswer }]);
    setCurrentQuestion("");
    setCurrentAnswer("");
  }

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-start p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl text-center mb-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">AI-MIND-CHAT</h1>
        <textarea
          className="border border-gray-300 rounded-lg w-full h-40 p-4 mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          onClick={generateAnswer}
          disabled={isGenerating}
          className="bg-purple-500 text-white font-bold py
2 px-4 rounded-lg hover
transition-colors duration-300"
>
{isGenerating ? "Generating..." : "Generate answer"}
</button>
</div>
{currentAnswer && (
<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl text-center mb-6">
<div className="mt-6 p-4 bg-gray-100 rounded-lg max-h-96 overflow-y-auto text-left">
<pre className="whitespace-pre-wrap break-words">{currentAnswer}</pre>
</div>
<button
         onClick={addQuestion}
         className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
       >
Add Question
</button>
</div>
)}
{questions.map((q, index) => (
<div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl text-center mb-6">
<p className="text-xl font-semibold mb-4">{q.question}</p>
<div className="mt-6 p-4 bg-gray-100 rounded-lg max-h-96 overflow-y-auto text-left">
<pre className="whitespace-pre-wrap break-words">{q.answer}</pre>
</div>
</div>
))}
</div>
);
}

export default App;