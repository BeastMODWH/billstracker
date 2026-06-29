const categoryConfig: Record<string, { color: string; emoji: string }> = {
  Water:         { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', emoji: '💧' },
  'Council Tax': { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', emoji: '🏛️' },
  Energy:        { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', emoji: '⚡' },
  Internet:      { color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', emoji: '📡' },
  Insurance:     { color: 'bg-green-500/20 text-green-300 border-green-500/30', emoji: '🛡️' },
  Mobile:        { color: 'bg-pink-500/20 text-pink-300 border-pink-500/30', emoji: '📱' },
  'TV Licence':  { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', emoji: '📺' },
  'Car Insurance': { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', emoji: '🚗' },
'Car Tax':       { color: 'bg-red-500/20 text-red-300 border-red-500/30', emoji: '📋' },
'School':        { color: 'bg-green-500/20 text-green-300 border-green-500/30', emoji: '🏫' },
'Madrasa':       { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', emoji: '🕌' },
  Other:         { color: 'bg-slate-500/20 text-slate-300 border-slate-500/30', emoji: '📄' },
};

export function CategoryBadge({ category }: { category: string }) {
  const cfg = categoryConfig[category] ?? categoryConfig.Other;
  return (
    <span className={`badge border ${cfg.color}`}>
      {cfg.emoji} {category}
    </span>
  );
}

export function categoryEmoji(cat: string) {
  return categoryConfig[cat]?.emoji ?? '📄';
}
