import { generateKnockoutFixtures } from "./utils/KnockoutGeneratorNew";

export default function KnockoutBracketNew({ participantstDetails }) {

    let teams = [];
    for(let i; i<22; i++){
        teams.push(i);
    }
    const fixtures = generateKnockoutFixtures(teams);
    console.log(fixtures)
}