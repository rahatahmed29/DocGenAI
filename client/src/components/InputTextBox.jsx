import React from "react";

export default function InputTextBox({ code, setCode }) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Paste your code
      </label>

      <div className="bg-gray-900 rounded-xl p-3 shadow-md border border-gray-800">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your code here..."
          className="w-full h-64 bg-transparent text-green-400 font-mono text-sm outline-none resize-none"
        />
      </div>
    </div>
  );
}