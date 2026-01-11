"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileJson, Check, X, Copy, RotateCcw } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (value: string) => {
    setInput(value);
    
    if (!value.trim()) {
      setOutput("");
      setIsValid(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Invalid JSON");
      setIsValid(false);
    }
  };

  const copyToClipboard = async () => {
    if (output && isValid) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const minifyJson = () => {
    if (isValid && output) {
      try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        setOutput(minified);
      } catch {
        // Handle error silently
      }
    }
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setIsValid(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm">
            <FileJson className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">JSON Formatter</h3>
            <p className="text-sm text-muted-foreground">Format, validate, and beautify JSON</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isValid !== null && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                isValid
                  ? "bg-green-500/20 text-green-500"
                  : "bg-red-500/20 text-red-500"
              }`}
            >
              {isValid ? (
                <>
                  <Check className="h-4 w-4" />
                  Valid
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  Invalid
                </>
              )}
            </motion.div>
          )}
          
          {isValid && (
            <>
              <motion.button
                onClick={minifyJson}
                className="px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-xl border border-white/10 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Minify
              </motion.button>
              <motion.button
                onClick={copyToClipboard}
                className="px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-xl border border-white/10 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </>
          )}
          
          <motion.button
            onClick={reset}
            className="px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-xl border border-white/10 hover:bg-white/5 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Input</label>
          <textarea
            value={input}
            onChange={(e) => formatJson(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="w-full h-[400px] p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Output</label>
          <div
            className={`w-full h-[400px] p-4 rounded-xl border backdrop-blur-sm font-mono text-sm overflow-auto ${
              isValid === null
                ? "border-white/10 bg-black/20"
                : isValid
                ? "border-green-500/30 bg-green-500/5"
                : "border-red-500/30 bg-red-500/5"
            }`}
          >
            {output ? (
              <pre className="text-foreground whitespace-pre-wrap break-words">
                {output}
              </pre>
            ) : (
              <p className="text-muted-foreground">Formatted JSON will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
