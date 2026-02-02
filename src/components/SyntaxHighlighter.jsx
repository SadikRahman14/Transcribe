import React from 'react';

const KEYWORDS = new Set([
  "int", "char", "float", "double", "void", "return", "if", "else", "while", "for", 
  "do", "switch", "case", "break", "continue", "const", "static", "class", "struct", 
  "public", "private", "protected", "try", "catch", "throw", "new", "delete", 
  "using", "namespace", "#include", "true", "false", "async", "await", "function", 
  "var", "let", "const", "import", "from", "export", "default", "cout", "cin", "endl"
]);

const TYPES = new Set([
  "string", "vector", "iostream", "console", "log", "map", "set", "list", "Array", "Object"
]);

export default function SyntaxHighlighter({ code, className = "", baseTextColor = "text-slate-300" }) {
  
  // STEP 1: Split by Strings first (matches "anything inside quotes")
  // The regex /(".+?")/g separates string literals from the rest of the code
  const segments = code.split(/(".+?")/g);

  return (
    <span className={className}>
      {segments.map((segment, i) => {
        
        // CHECK: Is this segment a String? (Starts and ends with quotes)
        if (segment.startsWith('"') && segment.endsWith('"')) {
            // COLOR FOR STRINGS (e.g., Green)
            return <span key={i} className="text-green-400">{segment}</span>;
        }

        // STEP 2: If not a string, process normal code (Keywords, Types, Numbers)
        const parts = segment.split(/([a-zA-Z0-9_#]+)/g);

        return parts.map((part, j) => {
            // Combine keys to ensure uniqueness
            const key = `${i}-${j}`;

            if (KEYWORDS.has(part)) {
                return <span key={key} className="text-pink-400 font-bold">{part}</span>;
            }
            if (TYPES.has(part)) {
                return <span key={key} className="text-yellow-300">{part}</span>;
            }
            if (!isNaN(parseFloat(part)) && isFinite(part)) {
                return <span key={key} className="text-orange-400">{part}</span>;
            }
            
            // Default text color
            return <span key={key} className={baseTextColor}>{part}</span>;
        });
      })}
    </span>
  );
}