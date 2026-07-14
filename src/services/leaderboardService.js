const LEADERBOARD_KEY = "word_game_leaderboard";

export const getLeaderboard = () => {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveScore = (score, wordsCount, playerName) => {
  if (score === 0) return;

  const currentLeaderboard = getLeaderboard();
  const newEntry = {
    id: Date.now(),
    score,
    wordsCount,
    playerName: playerName || "Anónimo",
    date: new Date().toLocaleDateString(),
  };

  const updatedLeaderboard = [...currentLeaderboard, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
  return updatedLeaderboard;
};