// utils/knockoutGenerator.js
export function generateKnockoutFixtures(teams) {
  let numTeams = teams.length;
  let rounds = [];
  let roundNumber = 1;

  // First round pairings (with byes if odd)
  let matches = [];
  for (let i = 0; i < numTeams; i += 2) {
    if (i + 1 < numTeams) {
      matches.push({
        home: teams[i],
        away: teams[i + 1],
      });
    } else {
      matches.push({
        home: teams[i],
        away: null, // bye
      });
    }
  }
  rounds.push({ round: `Round ${roundNumber}`, matches });

  // Generate subsequent rounds
  let currentRoundTeams = matches.map((m) => ({
    name: m.away ? `${m.home.name}/${m.away.name}` : m.home.name,
  }));

  while (currentRoundTeams.length > 1) {
    roundNumber++;
    matches = [];
    for (let i = 0; i < currentRoundTeams.length; i += 2) {
      if (i + 1 < currentRoundTeams.length) {
        matches.push({
          home: currentRoundTeams[i],
          away: currentRoundTeams[i + 1],
        });
      } else {
        matches.push({
          home: currentRoundTeams[i],
          away: null,
        });
      }
    }
    rounds.push({ round: `Round ${roundNumber}`, matches });
    currentRoundTeams = matches.map((m) => ({
      name: m.away ? `${m.home.name}/${m.away.name}` : m.home.name,
    }));
  }

  return rounds;
}
