"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Info, X } from "lucide-react";

interface Match {
  text: string;
  index: number;
  groups?: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

  const flagOptions = [
    { value: "g", label: "Global", description: "Find all matches" },
    { value: "i", label: "Case Insensitive", description: "Ignore case" },
    { value: "m", label: "Multiline", description: "^ and $ match line starts/ends" },
    { value: "s", label: "Dot All", description: ". matches newlines" },
  ];

  const examples = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", test: "test@example.com" },
    { name: "Phone", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", test: "(123) 456-7890" },
    { name: "URL", pattern: "https?://[^\\s]+", test: "https://example.com" },
    { name: "Hex Color", pattern: "#[0-9A-Fa-f]{6}", test: "#FF5733" },
  ];

  useMemo(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches: Match[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(foundMatches);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  const loadExample = (example: typeof examples[0]) => {
    setPattern(example.pattern);
    setTestString(example.test);
  };

  const highlightMatches = () => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${i}`}>
            {testString.slice(lastIndex, match.index)}
          </span>
        );
      }
      parts.push(
        <motion.span
          key={`match-${i}`}
          initial={{ backgroundColor: "rgba(34, 197, 94, 0)" }}
          animate={{ backgroundColor: "rgba(34, 197, 94, 0.3)" }}
          className="rounded px-1 font-bold text-green-400"
        >
          {match.text}
        </motion.span>
      );
      lastIndex = match.index + match.text.length;
    });

    if (lastIndex < testString.length) {
      parts.push(
        <span key="text-end">{testString.slice(lastIndex)}</span>
      );
    }

    return parts;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
            <Code2 className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Regex Tester</h3>
            <p className="text-sm text-muted-foreground">Test and visualize regular expressions</p>
          </div>
        </div>
        
        {matches.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-500/20 text-green-500"
          >
            <Sparkles className="h-4 w-4" />
            {matches.length} {matches.length === 1 ? "match" : "matches"}
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            Pattern
            <span className="text-xs text-muted-foreground">(Regular Expression)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your regex pattern"
              className="w-full px-4 pl-8 py-3 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/{flags}</span>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              {error}
            </motion.p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {flagOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => toggleFlag(option.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                flags.includes(option.value)
                  ? "bg-primary/20 border-primary/30 text-primary"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={option.description}
            >
              {option.label}
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against your regex"
            className="w-full h-32 p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {testString && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Result</label>
            <div className="p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm min-h-[100px]">
              <pre className="text-foreground font-mono text-sm whitespace-pre-wrap break-words">
                {highlightMatches()}
              </pre>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Quick Examples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <motion.button
                key={example.name}
                onClick={() => loadExample(example)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
