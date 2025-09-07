import React from "react";
import { generateLeagueFixtures } from "./utils/fixtureGenerator";

export default function LeagueTable({ teams }) {
  const fixtures = generateLeagueFixtures(teams);

  return (
    <div>
      <h2>League Fixtures</h2>
      {fixtures.map((round, idx) => (
        <div key={idx}>
          <h3>Round {idx + 1}</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Home</th>
                <th>Away</th>
              </tr>
            </thead>
            <tbody>
              {round.map((match, mIdx) => (
                <tr key={mIdx}>
                  <td>{match.home}</td>
                  <td>{match.away}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
