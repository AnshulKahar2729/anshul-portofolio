import { Code2, Coffee, Rocket, Zap, Bug, Terminal, GitBranch, Cpu } from "lucide-react";

const PLACEHOLDER_CONFIGS = [
  { icon: Code2, gradient: "from-blue-500 to-cyan-500", text: "Code or Die" },
  { icon: Coffee, gradient: "from-amber-500 to-orange-500", text: "Fueled by ☕" },
  { icon: Rocket, gradient: "from-purple-500 to-pink-500", text: "Deploy!" },
  { icon: Zap, gradient: "from-yellow-500 to-red-500", text: "Fast AF" },
  { icon: Bug, gradient: "from-green-500 to-emerald-500", text: "It's a Feature" },
  { icon: Terminal, gradient: "from-slate-500 to-zinc-500", text: "sudo read" },
  { icon: GitBranch, gradient: "from-indigo-500 to-blue-500", text: "Merge Conflict" },
  { icon: Cpu, gradient: "from-red-500 to-pink-500", text: "01001000 01101001" },
];

interface ArticlePlaceholderProps {
  title: string;
}

export function ArticlePlaceholder({ title }: ArticlePlaceholderProps) {
  // Use title to consistently pick the same placeholder for the same article
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const config = PLACEHOLDER_CONFIGS[hash % PLACEHOLDER_CONFIGS.length];
  const Icon = config.icon;

  return (
    <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center space-y-3">
        <Icon className="h-16 w-16 text-white mx-auto animate-pulse" />
        <p className="text-white font-bold text-lg px-4">{config.text}</p>
      </div>
      {/* Animated circles */}
      <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/10 animate-ping" />
      <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white/10 animate-pulse" />
    </div>
  );
}
