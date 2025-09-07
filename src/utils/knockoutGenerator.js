/**
 * Generate Knockout Fixtures
 * @param {string[]} teams - list of team names
 * @returns {Array<{round: string, matches: {home: string, away: string | null}[]}>}
 */
 export function generateKnockoutFixtures(teams) {
    if (!teams || teams.length < 2) return [];
  
    const fixtures = [];
    let roundTeams = [...teams];
  
    // Shuffle for fairness (optional)
    // roundTeams = roundTeams.sort(() => Math.random() - 0.5);
  
    // Keep making rounds until 1 winner
    let roundNumber = 1;
    while (roundTeams.length > 1) {
      const nextRoundTeams = [];
      const matches = [];
  
      // If odd number, give a bye to the last team
      if (roundTeams.length % 2 !== 0) {
        matches.push({ home: roundTeams[roundTeams.length - 1], away: null }); // bye
        nextRoundTeams.push(roundTeams[roundTeams.length - 1]);
        roundTeams = roundTeams.slice(0, -1);
      }
  
      // Pair up teams
      for (let i = 0; i < roundTeams.length; i += 2) {
        const home = roundTeams[i];
        const away = roundTeams[i + 1];
        matches.push({ home, away });
        // Winner placeholder → advance to next round
        nextRoundTeams.push(`Winner of ${home} vs ${away}`);
      }
  
      fixtures.push({
        round: `Round ${roundNumber}`,
        matches,
      });
  
      roundTeams = nextRoundTeams;
      roundNumber++;
    }
  
    return fixtures;
  }
  