import { useState, useEffect, useRef } from 'react';

export const useTypingGame = (selectedSnippet) => {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [status, setStatus] = useState('idle'); 
    const inputRef = useRef(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const INDENT_SIZE = 4;
    const INDENT_STRING = ' '.repeat(INDENT_SIZE); 

    useEffect(() => {
        resetGame();
    }, [selectedSnippet]);

    useEffect(() => {
        let interval;
        if (status === 'typing' && startTime) {
            interval = setInterval(() => {
                const elapsedMin = (Date.now() - startTime) / 60000;
                const words = userInput.length / 5; 
                setWpm(Math.round(words / elapsedMin) || 0);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status, startTime, userInput]);

    const resetGame = () => {
        setUserInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setStatus('idle');
        setAnalysisResult(null);
        if (inputRef.current) inputRef.current.focus();
    };

    const handleChange = (e, isStrictMode = false) => {
        const value = e.target.value;
        const code = selectedSnippet.code;
        
        if (status === 'idle' && value.length > 0) {
            setStartTime(Date.now());
            setStatus('typing');
        }

        if (isStrictMode) {
            if (value.length < userInput.length) {
                setUserInput(value); 
                return;
            }
            const currentIndex = value.length - 1;
            if (value[currentIndex] !== code[currentIndex]) {
                 return; 
            }
        }
        setUserInput(value);
    };

    const handleKeyDown = (e, isStrictMode) => {
        const { key } = e;
        const target = e.target;
        const { selectionStart, selectionEnd, value } = target;

        // 1. TAB KEY
        if (key === 'Tab') {
            e.preventDefault();
            const newValue = value.substring(0, selectionStart) + INDENT_STRING + value.substring(selectionEnd);
            setUserInput(newValue);
            setTimeout(() => {
                target.selectionStart = target.selectionEnd = selectionStart + INDENT_SIZE;
            }, 0);
        }

        // 2. ENTER KEY
        if (key === 'Enter') {
            e.preventDefault();
            const currentLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
            const currentLine = value.substring(currentLineStart, selectionStart);
            const match = currentLine.match(/^\s*/);
            const currentIndent = match ? match[0] : '';
            
            const charBefore = value[selectionStart - 1];
            const charAfter = value[selectionEnd];

            // A. Between Brackets
            if ((charBefore === '{' && charAfter === '}') ||
                (charBefore === '(' && charAfter === ')') ||
                (charBefore === '[' && charAfter === ']')) {
                
                const newText = '\n' + currentIndent + INDENT_STRING + '\n' + currentIndent;
                const newValue = value.substring(0, selectionStart) + newText + value.substring(selectionEnd);
                setUserInput(newValue);
                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = selectionStart + 1 + currentIndent.length + INDENT_SIZE;
                }, 0);
                return;
            }

            // B. Normal Smart Indent
            const trimmedLine = currentLine.trim();
            let shouldIndent = false;
            const lastChar = trimmedLine[trimmedLine.length - 1];

            if (['{', '(', '[', ':'].includes(lastChar)) shouldIndent = true;
            
            const controlKeywords = ['if', 'for', 'while', 'else', 'elif'];
            const startsWithControl = controlKeywords.some(kw => trimmedLine.startsWith(kw));
            if (startsWithControl && lastChar !== ';' && lastChar !== '}') shouldIndent = true;

            const extraIndent = shouldIndent ? INDENT_STRING : ''; 
            const newValue = value.substring(0, selectionStart) + '\n' + currentIndent + extraIndent + value.substring(selectionEnd);
            setUserInput(newValue);
            setTimeout(() => {
                target.selectionStart = target.selectionEnd = selectionStart + 1 + currentIndent.length + extraIndent.length;
            }, 0);
        }

        // 3. AUTO-CLOSE
        const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
        if (pairs[key]) {
            e.preventDefault();
            const newValue = value.substring(0, selectionStart) + key + pairs[key] + value.substring(selectionEnd);
            setUserInput(newValue);
            setTimeout(() => {
                target.selectionStart = target.selectionEnd = selectionStart + 1;
            }, 0);
        }
        
        // 4. OVERWRITE CLOSER
        const closers = [')', '}', ']', '"', "'"];
        if (closers.includes(key) && value[selectionStart] === key) {
             e.preventDefault();
             setTimeout(() => {
                target.selectionStart = target.selectionEnd = selectionStart + 1;
            }, 0);
        }
    };

    // --- FIX IS HERE ---
    const calculateStats = () => {
        const codeLines = selectedSnippet.code.split('\n');
        const typedLines = userInput.split('\n');
        
        const detailedErrors = [];
        let totalMistakes = 0;
        
        // Helper: removes all spaces/tabs to ignore formatting differences
        const clean = (str) => (str || '').replace(/\s+/g, '');

        // We loop through the lines of the original code
        for (let i = 0; i < codeLines.length; i++) {
            const expectedLine = codeLines[i];
            const typedLine = typedLines[i] || ""; // Handle missing lines

            const cleanExpected = clean(expectedLine);
            const cleanTyped = clean(typedLine);

            // Compare the "cleaned" versions
            if (cleanExpected !== cleanTyped) {
                // 1. Log the visual error (One card per line)
                detailedErrors.push({
                    line: i + 1,
                    expected: expectedLine.trim(), // Show the clean version in the UI
                    actual: typedLine.trim() || "Missing Line"
                });

                // 2. Calculate accuracy score
                // We count how many characters are different to keep the % accurate
                let lineMistakes = 0;
                const maxLength = Math.max(cleanExpected.length, cleanTyped.length);
                for (let k = 0; k < maxLength; k++) {
                     if (cleanExpected[k] !== cleanTyped[k]) {
                         lineMistakes++;
                     }
                }
                totalMistakes += lineMistakes;
            }
        }

        // --- Standard Scoring Logic ---
        const codeTotalLength = selectedSnippet.code.replace(/\s+/g, '').length;
        const finalAccuracy = Math.max(0, Math.round(((codeTotalLength - totalMistakes) / codeTotalLength) * 100));

        const timeInMinutes = (Date.now() - startTime) / 60000;
        const finalWpm = timeInMinutes > 0 ? Math.round((userInput.length / 5) / timeInMinutes) : 0;

        setAccuracy(finalAccuracy);
        setWpm(finalWpm);
        setStatus('completed');

        setAnalysisResult({
            totalChars: selectedSnippet.code.length,
            typedChars: userInput.length,
            errors: detailedErrors, // Now contains 1 clean error per bad line
            warnings: [],
            accuracy: finalAccuracy
        });

        return true;
    };

    return {
        userInput, wpm, accuracy, status, inputRef, analysisResult,
        handleChange, handleKeyDown, calculateStats, resetGame
    };
};