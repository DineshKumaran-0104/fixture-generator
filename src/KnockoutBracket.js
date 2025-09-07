import React from "react";
import { generateKnockoutFixtures } from "./utils/knockoutGenerator";

export default function KnockoutBracket({ teams }) {
  const fixtures = generateKnockoutFixtures(teams);
  console.log(fixtures);

  return (
    <div>
      <h2>Knockout Bracket</h2>
      {fixtures.map((round, rIdx) => (
        <div key={rIdx} style={{ marginBottom: "20px" }}>
          <h3>{round.round}</h3>
          <ul>
            {round.matches.map((m, idx) => (
              <li key={idx}>
                {m.away
                  ? `${m.home.name} vs ${m.away.name}`
                  : `${m.home.name} gets a BYE`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
