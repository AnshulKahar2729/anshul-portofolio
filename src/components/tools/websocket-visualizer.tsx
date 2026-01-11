"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Send, Trash2, Wifi, WifiOff, ArrowDown, ArrowUp } from "lucide-react";

interface Message {
  id: string;
  type: "sent" | "received";
  content: string;
  timestamp: Date;
}

export function WebSocketVisualizer() {
  const [url, setUrl] = useState("wss://echo.websocket.org");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connect = () => {
    try {
      const ws = new WebSocket(url);
      
      ws.onopen = () => {
        setConnected(true);
        setError(null);
        addMessage("received", "Connected to WebSocket server");
      };

      ws.onmessage = (event) => {
        addMessage("received", event.data);
      };

      ws.onerror = () => {
        setError("WebSocket connection error");
        setConnected(false);
      };

      ws.onclose = () => {
        setConnected(false);
        addMessage("received", "Disconnected from server");
      };

      wsRef.current = ws;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect");
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setConnected(false);
    }
  };

  const sendMessage = () => {
    if (!wsRef.current || !connected || !inputMessage.trim()) return;

    wsRef.current.send(inputMessage);
    addMessage("sent", inputMessage);
    setInputMessage("");
  };

  const addMessage = (type: "sent" | "received", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm">
            <Radio className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">WebSocket Visualizer</h3>
            <p className="text-sm text-muted-foreground">Test and visualize WebSocket connections</p>
          </div>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
            connected
              ? "bg-green-500/20 text-green-500"
              : "bg-gray-500/20 text-gray-500"
          }`}
        >
          {connected ? (
            <>
              <Wifi className="h-4 w-4" />
              Connected
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              Disconnected
            </>
          )}
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="wss://echo.websocket.org"
            disabled={connected}
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          />
          <motion.button
            onClick={connected ? disconnect : connect}
            className={`px-6 py-3 rounded-xl font-medium backdrop-blur-xl border transition-all ${
              connected
                ? "bg-red-500/20 border-red-500/30 text-red-500 hover:bg-red-500/30"
                : "bg-green-500/20 border-green-500/30 text-green-500 hover:bg-green-500/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {connected ? "Disconnect" : "Connect"}
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}

        <div className="h-[400px] p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm overflow-y-auto space-y-3">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.type === "sent" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start gap-3 ${
                  message.type === "sent" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    message.type === "sent"
                      ? "bg-blue-500/20"
                      : "bg-green-500/20"
                  }`}
                >
                  {message.type === "sent" ? (
                    <ArrowUp className="h-4 w-4 text-blue-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.type === "sent"
                        ? "ml-auto bg-blue-500/10 border border-blue-500/20"
                        : "bg-green-500/10 border border-green-500/20"
                    }`}
                  >
                    <p className="text-sm text-foreground break-words font-mono">
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground px-3">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
          
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Radio className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No messages yet. Connect and start chatting!</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            disabled={!connected}
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          />
          <motion.button
            onClick={sendMessage}
            disabled={!connected || !inputMessage.trim()}
            className="px-6 py-3 rounded-xl font-medium backdrop-blur-xl border border-primary/30 bg-primary/20 text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: connected && inputMessage.trim() ? 1.05 : 1 }}
            whileTap={{ scale: connected && inputMessage.trim() ? 0.95 : 1 }}
          >
            <Send className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={clearMessages}
            disabled={messages.length === 0}
            className="px-4 py-3 rounded-xl font-medium backdrop-blur-xl border border-white/10 hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: messages.length > 0 ? 1.05 : 1 }}
            whileTap={{ scale: messages.length > 0 ? 0.95 : 1 }}
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
