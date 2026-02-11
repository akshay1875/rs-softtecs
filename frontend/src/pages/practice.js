import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { codeAPI } from '@/utils/api';
import {
  FaPlay, FaCode, FaTerminal, FaExpand, FaCompress,
  FaCopy, FaTrash, FaDownload, FaKeyboard, FaLightbulb,
  FaBars, FaTimes, FaPhone, FaEnvelope
} from 'react-icons/fa';

// Dynamically import Monaco Editor (no SSR)
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// Default code templates for each language
const CODE_TEMPLATES = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python: `# Python Program
print("Hello, World!")`,
  javascript: `// JavaScript Program
console.log("Hello, World!");`,
  typescript: `// TypeScript Program
const greeting: string = "Hello, World!";
console.log(greeting);`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  php: `<?php
echo "Hello, World!\\n";
?>`,
  ruby: `# Ruby Program
puts "Hello, World!"`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  sql: `-- SQL Example
SELECT 'Hello, World!' AS greeting;`,
  bash: `#!/bin/bash
echo "Hello, World!"`,
  swift: `// Swift Program
print("Hello, World!")`,
  kotlin: `fun main() {
    println("Hello, World!")
}`,
};

// Language icons/colors
const LANG_COLORS = {
  c: '#A8B9CC',
  cpp: '#00599C',
  java: '#ED8B00',
  python: '#3776AB',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  csharp: '#68217A',
  php: '#777BB4',
  ruby: '#CC342D',
  go: '#00ADD8',
  rust: '#CE422B',
  sql: '#336791',
  bash: '#4EAA25',
  swift: '#FA7343',
  kotlin: '#7F52FF',
};

export default function PracticeCodePage() {
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(CODE_TEMPLATES['python']);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState('output'); // output | input
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Keyboard shortcut: Ctrl+Enter to run
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [code, selectedLang, input]);

  const fetchLanguages = async () => {
    try {
      const { data } = await codeAPI.getLanguages();
      setLanguages(data.data);
    } catch (error) {
      console.error('Error fetching languages:', error);
      // Fallback languages
      setLanguages([
        { id: 'python', name: 'Python', monacoId: 'python' },
        { id: 'javascript', name: 'JavaScript', monacoId: 'javascript' },
        { id: 'java', name: 'Java', monacoId: 'java' },
        { id: 'c', name: 'C', monacoId: 'c' },
        { id: 'cpp', name: 'C++', monacoId: 'cpp' },
      ]);
    }
  };

  const handleLanguageChange = (langId) => {
    setSelectedLang(langId);
    setCode(CODE_TEMPLATES[langId] || `// ${langId} program\n`);
    setOutput('');
  };

  const runCode = async () => {
    if (isRunning || !code.trim()) return;
    setIsRunning(true);
    setOutput('⏳ Running code...\n');
    setActiveTab('output');

    try {
      const { data } = await codeAPI.execute({
        language: selectedLang,
        code,
        input
      });

      const result = data.data;
      let outputText = '';

      if (result.compileError) {
        outputText += `❌ Compilation Error:\n${result.compileError}\n`;
      }
      if (result.compileOutput) {
        outputText += `📦 Compile Output:\n${result.compileOutput}\n`;
      }
      if (result.output) {
        outputText += result.output;
      }
      if (result.stderr) {
        outputText += `\n⚠️ Stderr:\n${result.stderr}`;
      }
      if (!outputText.trim()) {
        outputText = '(No output)';
      }

      // Add exit code
      if (result.exitCode !== 0) {
        outputText += `\n\n🔴 Exit Code: ${result.exitCode}`;
      }

      setOutput(outputText);
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to execute code. Please try again.';
      setOutput(`❌ Error: ${msg}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const clearOutput = () => setOutput('');

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extensions = {
      c: 'c', cpp: 'cpp', java: 'java', python: 'py', javascript: 'js',
      typescript: 'ts', csharp: 'cs', php: 'php', ruby: 'rb', go: 'go',
      rust: 'rs', sql: 'sql', bash: 'sh', swift: 'swift', kotlin: 'kt'
    };
    const ext = extensions[selectedLang] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `main.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    setCode(CODE_TEMPLATES[selectedLang] || '');
    setOutput('');
    setInput('');
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const currentLang = languages.find(l => l.id === selectedLang);

  return (
    <>
      <Head>
        <title>Code Editor - Practice Coding | RS Softtecs</title>
        <meta name="description" content="Practice coding in C, C++, Java, Python, JavaScript and more. Free online code editor with instant execution." />
      </Head>

      <div ref={containerRef} className={`flex flex-col ${isFullscreen ? 'h-screen' : 'min-h-screen'} bg-gray-900`}>
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between px-4 py-2">
            {/* Left: Logo + Language */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-white hover:text-accent-400 transition-colors">
                <FaCode className="text-accent-400 text-xl" />
                <span className="font-bold text-sm hidden sm:inline">RS Softtecs</span>
              </Link>

              <div className="h-6 w-px bg-gray-600" />

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 pr-8 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{
                    borderLeft: `3px solid ${LANG_COLORS[selectedLang] || '#666'}`
                  }}
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Center: Run Button */}
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-lg font-medium text-sm transition-all ${
                isRunning
                  ? 'bg-gray-600 text-gray-300 cursor-wait'
                  : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20'
              }`}
            >
              <FaPlay className={`text-xs ${isRunning ? 'animate-pulse' : ''}`} />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={copyCode}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Copy Code"
              >
                <FaCopy className="text-sm" />
              </button>
              <button
                onClick={downloadCode}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Download Code"
              >
                <FaDownload className="text-sm" />
              </button>
              <button
                onClick={resetCode}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Reset Code"
              >
                <FaTrash className="text-sm" />
              </button>

              <div className="h-6 w-px bg-gray-600 mx-1" />

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Toggle Theme"
              >
                <FaLightbulb className="text-sm" />
              </button>

              {/* Font Size */}
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-gray-700 text-gray-300 text-xs rounded px-2 py-1 border border-gray-600"
                title="Font Size"
              >
                {[12, 13, 14, 15, 16, 18, 20].map(s => (
                  <option key={s} value={s}>{s}px</option>
                ))}
              </select>

              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <FaCompress className="text-sm" /> : <FaExpand className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Keyboard shortcut hint */}
          <div className="flex items-center justify-between px-4 py-1 bg-gray-850 border-t border-gray-700/50 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaKeyboard />
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-400">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-400">Enter</kbd>
                <span>to Run</span>
              </span>
              <span>
                {currentLang?.name || selectedLang}
              </span>
            </div>
            <Link href="/test-your-skills" className="text-blue-400 hover:text-blue-300 hover:underline">
              Take MCQ Quiz →
            </Link>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Editor Panel */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaCode className="text-blue-400" />
                <span>main.{getExtension(selectedLang)}</span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language={currentLang?.monacoId || selectedLang}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorMount}
                theme={theme}
                options={{
                  fontSize,
                  fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  renderLineHighlight: 'all',
                  bracketPairColorization: { enabled: true },
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
            </div>
          </div>

          {/* Output/Input Panel */}
          <div className="lg:w-[400px] xl:w-[480px] flex flex-col border-t lg:border-t-0 lg:border-l border-gray-700 h-[300px] lg:h-auto">
            {/* Tabs */}
            <div className="flex items-center bg-gray-800/50 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('output')}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'output'
                    ? 'text-green-400 border-green-400'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                <FaTerminal className="text-xs" />
                Output
              </button>
              <button
                onClick={() => setActiveTab('input')}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'input'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                <FaKeyboard className="text-xs" />
                Input
              </button>
              <div className="flex-1" />
              {activeTab === 'output' && output && (
                <button
                  onClick={clearOutput}
                  className="px-3 py-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0 overflow-auto">
              {activeTab === 'output' ? (
                <pre className="p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap break-words h-full">
                  {output || (
                    <span className="text-gray-500 italic">
                      Click &quot;Run Code&quot; or press Ctrl+Enter to see output here...
                    </span>
                  )}
                </pre>
              ) : (
                <div className="p-4 h-full">
                  <label className="block text-xs text-gray-500 mb-2">
                    Standard Input (stdin) — Provide input for your program
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-[calc(100%-2rem)] bg-gray-800 text-gray-300 font-mono text-sm p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="Enter input here (one value per line)..."
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Cards (Scrollable) */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedLang === lang.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:text-gray-300 hover:border-gray-500'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: LANG_COLORS[lang.id] || '#666' }}
                />
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function getExtension(lang) {
  const ext = {
    c: 'c', cpp: 'cpp', java: 'java', python: 'py', javascript: 'js',
    typescript: 'ts', csharp: 'cs', php: 'php', ruby: 'rb', go: 'go',
    rust: 'rs', sql: 'sql', bash: 'sh', swift: 'swift', kotlin: 'kt'
  };
  return ext[lang] || 'txt';
}
