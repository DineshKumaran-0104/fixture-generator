export function generateKnockoutFixtures(teams) {
  const rounds = {};
  let matchCounter = 1;

  // Round naming
  const getRoundName = (numTeams) => {
    if (numTeams <= 2) return "Final";
    if (numTeams <= 4) return "Semi";
    if (numTeams <= 8) return "Quarter";
    return `Round ${Object.keys(rounds).length + 1}`;
  };

  let currentTeams = [...teams];

  while (currentTeams.length > 1) {
    const matches = [];
    const roundName = getRoundName(currentTeams.length);

    for (let i = 0; i < currentTeams.length; i += 2) {
      if (i + 1 < currentTeams.length) {
        matches.push({
          [`M${matchCounter}`]: `${currentTeams[i]} vs ${currentTeams[i + 1]}`
        });
      } else {
        matches.push({
          [`M${matchCounter}`]: `${currentTeams[i]} gets a BYE`
        });
      }
      matchCounter++;
    }

    rounds[roundName] = matches;

    // Winners placeholder for next round
    currentTeams = matches.map((m) => Object.keys(m)[0]);
  }

  return rounds;
}
