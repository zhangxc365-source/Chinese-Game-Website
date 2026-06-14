import React from 'react';
import {
  Volume2,
  Sparkles,
  Mic,
  Award,
  Compass,
  Workflow,
  Shuffle,
  Search,
  Link,
  PenTool,
  Puzzle,
  History,
  Star,
  Flame,
  BookOpen,
  ChevronRight,
  Play,
  X,
  ExternalLink,
  Eye,
  Users,
  Gamepad2,
  CheckCircle2,
  RotateCcw,
  Info,
  Sparkle,
  SearchCheck,
  TrendingUp,
  Sliders,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Volume2,
  Sparkles,
  Mic,
  Award,
  Compass,
  Workflow,
  Shuffle,
  Search,
  Link,
  PenTool,
  Puzzle,
  History,
  Star,
  Flame,
  BookOpen,
  ChevronRight,
  Play,
  X,
  ExternalLink,
  Eye,
  Users,
  Gamepad2,
  CheckCircle2,
  RotateCcw,
  Info,
  Sparkle,
  SearchCheck,
  TrendingUp,
  Sliders,
  ChevronDown,
  ArrowRight
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 20 }: LucideIconProps) {
  const IconComponent = iconMap[name] || Gamepad2;
  return <IconComponent className={className} size={size} />;
}
