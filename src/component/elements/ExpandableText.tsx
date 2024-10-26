import { useState } from "react";

export default function ExpandableText({ text, maxWords = 20 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(" ");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : words.slice(0, maxWords).join(" ");

  return (
    <div
      className={`overflow-hidden ${
        isExpanded ? "overflow-auto max-h-auto" : "max-h-20"
      } transition-all duration-300 ease-in-out`}
    >
      <p className="text-white">
        {displayText}
        {!isExpanded && words.length > maxWords ? "..." : ""}
      </p>
      {words.length > maxWords && (
        <button
          onClick={toggleExpand}
          className="text-white"
        >
          {isExpanded ? "Lebih Sedikit" : "Selengkapnya"}
        </button>
      )}
    </div>
  );
}
