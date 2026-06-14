export interface Game {
  id: string;
  title: string;
  img: string;
  url: string;
  description: string;
  difficulty: '容易' | '普通' | '挑战' | '极富挑战';
  playCount: number;
  rating: number; // e.g. 4.8 / 5.0
  iconName: string; // Lucide icon identifier
  colorTheme: {
    bg: string;       // e.g., 'bg-amber-50/60'
    border: string;   // e.g., 'border-amber-100'
    text: string;     // e.g., 'text-amber-700'
    accent: string;   // e.g., 'bg-amber-100'
    badge: string;    // e.g., 'text-amber-800'
    darkText: string; // e.g., 'text-amber-900'
    iconBg: string;   // e.g. 'bg-amber-100/50'
  };
  details: {
    guide: string;    // Actionable instructions
    objective: string; // Goal of the game
    skills: string[]; // Skills trained
  };
}

export interface CategoryGroup {
  category: string;
  games: Game[];
}
