import { Bracket, RoundProps } from "react-brackets";
import { generateKnockoutFixtures } from "./utils/knockoutGenerator";

export default function KnockoutBracket({ teams }) {
  const fixtures = generateKnockoutFixtures(teams);

  // Convert your fixtures into react-brackets format
  const rounds = fixtures.map((round, rIdx) => ({
    title: round.round,
    seeds: round.matches.map((m, idx) => ({
      id: `${rIdx}-${idx}`,
      date: null, // optional
      teams: [
        { name: m.home ? m.home.name : "TBD" },
        { name: m.away ? m.away.name : "BYE" },
      ],
    })),
  }));

  return (
    <div>
      <h2>Knockout Bracket</h2>
      <Bracket rounds={rounds} />
    </div>
  );
}
