export function calculateWPM(correctChars, elapsedSeconds) {
  if (elapsedSeconds === 0) return 0;
  const minutes = elapsedSeconds / 60;
  return Math.round(correctChars / 5 / minutes);
}

export function calculateAccuracy(correct, total) {
  if (total === 0) return 100;
  return Math.round((correct / total) * 100);
}

export function calculatePerKeyAccuracy(keystrokes) {
  const keyStats = {};
  for (const ks of keystrokes) {
    if (ks.expected === ' ') continue;
    if (!keyStats[ks.expected]) {
      keyStats[ks.expected] = { correct: 0, total: 0 };
    }
    keyStats[ks.expected].total += 1;
    if (ks.correct) keyStats[ks.expected].correct += 1;
  }
  return Object.entries(keyStats).map(([key, { correct, total }]) => ({
    key,
    accuracy: calculateAccuracy(correct, total),
    correct,
    total,
  }));
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
