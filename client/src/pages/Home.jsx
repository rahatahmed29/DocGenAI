import React, { useState } from "react";
import InputTextBox from "../components/InputTextBox";
import OutputTextBox from "../components/OutputTextBox";
import annotateCode from "../api/ai.js";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("jsdoc");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const annotated = await annotateCode(code, style);
      setResult(annotated);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6">
        
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🤖 AI Documentation Generator
        </h1>

        {/* STYLE SELECT */}
        <div className="mb-4 flex justify-end">
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="jsdoc">JSDoc</option>
            <option value="python">Python Docstring</option>
          </select>
        </div>

        {/* INPUT */}
        <InputTextBox code={code} setCode={setCode} />

        {/* BUTTON */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition"
          >
            {loading ? "Generating..." : "Generate Documentation"}
          </button>
        </div>

        {/* OUTPUT */}
        {result && <OutputTextBox code={result} />}
      </div>
    </div>
  );
}