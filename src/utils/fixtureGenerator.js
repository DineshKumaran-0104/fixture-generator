export function generateLeagueFixtures(teams) {
    let fixtures = [];
    const totalRounds = teams.length - 1;
    const matchesPerRound = teams.length / 2;
  
    let rotatedTeams = [...teams];
  
    for (let round = 0; round < totalRounds; round++) {
      let roundMatches = [];
      for (let i = 0; i < matchesPerRound; i++) {
        const home = rotatedTeams[i];
        const away = rotatedTeams[rotatedTeams.length - 1 - i];
        roundMatches.push({ round: round + 1, home, away });
      }
      fixtures.push(roundMatches);
  
      // rotate (except first team)
      rotatedTeams.splice(1, 0, rotatedTeams.pop());
    }
  
    return fixtures;
  }