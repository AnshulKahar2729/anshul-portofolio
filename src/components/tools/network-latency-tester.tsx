"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Globe, TrendingUp } from "lucide-react";

interface LatencyResult {
  endpoint: string;
  latency: number | null;
  status: "testing" | "success" | "error";
  timestamp: number;
}

const endpoints = [
  { name: "Google DNS", url: "https://dns.google" },
  { name: "Cloudflare", url: "https://cloudflare.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Amazon AWS", url: "https://aws.amazon.com" },
];

export function NetworkLatencyTester() {
  const [results, setResults] = useState<LatencyResult[]>([]);
  const [testing, setTesting] = useState(false);

  const testLatency = async () => {
    setTesting(true);
    setResults([]);

    for (const endpoint of endpoints) {
      setResults((prev) => [
        ...prev,
        {
          endpoint: endpoint.name,
          latency: null,
          status: "testing",
          timestamp: Date.now(),
        },
      ]);

      try {
        const start = performance.now();
        
        // Use a CORS-friendly approach with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch(endpoint.url, {
          method: "HEAD",
          mode: "no-cors",
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        const latency = Math.round(performance.now() - start);

        setResults((prev) =>
          prev.map((r) =>
            r.endpoint === endpoint.name
              ? { ...r, latency, status: "success" }
              : r
          )
        );
      } catch (error) {
        setResults((prev) =>
          prev.map((r) =>
            r.endpoint === endpoint.name
              ? { ...r, latency: null, status: "error" }
              : r
          )
        );
      }

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setTesting(false);
  };

  const getLatencyColor = (latency: number | null) => {
    if (!latency) return "text-muted-foreground";
    if (latency < 50) return "text-green-500";
    if (latency < 150) return "text-yellow-500";
    return "text-red-500";
  };

  const getLatencyLabel = (latency: number | null) => {
    if (!latency) return "N/A";
    if (latency < 50) return "Excellent";
    if (latency < 150) return "Good";
    return "Slow";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Network Latency Tester</h3>
            <p className="text-sm text-muted-foreground">Test your connection speed to popular services</p>
          </div>
        </div>
        <motion.button
          onClick={testLatency}
          disabled={testing}
          className="px-6 py-2.5 rounded-lg font-medium backdrop-blur-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
            borderColor: "rgba(59, 130, 246, 0.3)",
            color: "hsl(var(--foreground))"
          }}
          whileHover={{ scale: testing ? 1 : 1.05 }}
          whileTap={{ scale: testing ? 1 : 0.95 }}
        >
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {testing ? "Testing..." : "Test Now"}
          </span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.endpoint}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{result.endpoint}</p>
                      <p className={`text-sm ${getLatencyColor(result.latency)}`}>
                        {result.status === "testing" && "Testing..."}
                        {result.status === "success" && getLatencyLabel(result.latency)}
                        {result.status === "error" && "Failed"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {result.status === "testing" && (
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="h-2 w-2 rounded-full bg-blue-500"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-sm text-muted-foreground">...</span>
                      </div>
                    )}
                    {result.status === "success" && result.latency !== null && (
                      <div>
                        <p className={`text-2xl font-bold ${getLatencyColor(result.latency)}`}>
                          {result.latency}
                        </p>
                        <p className="text-xs text-muted-foreground">milliseconds</p>
                      </div>
                    )}
                    {result.status === "error" && (
                      <p className="text-sm text-red-500">Error</p>
                    )}
                  </div>
                </div>
                
                {result.status === "success" && result.latency !== null && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((result.latency / 300) * 100, 100)}%` }}
                    className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {results.length === 0 && !testing && (
        <div className="text-center py-12 text-muted-foreground">
          <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Click "Test Now" to measure network latency</p>
        </div>
      )}
    </div>
  );
}
