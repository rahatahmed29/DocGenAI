import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function OutputTextBox({ code }) {
  return (
    <div className="w-full mt-6">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Generated Documentation
      </label>

      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800">
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "14px",
            background: "#1e1e1e",
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}