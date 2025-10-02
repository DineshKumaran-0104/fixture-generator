function run(teamsArr=[]){
    let fixtureDetails = {};
    let byefixtureArr = [];
    let power = fixtureFoBye(fixtureDetails, byefixtureArr, teamsArr);
    //console.log("teamsArr : "+ teamsArr);
    //console.log("byeFixture : "+byefixtureArr);
    let stageRound = 1;
    let stageMatches = {};
    while (power > 1){
        let stagename = getStageName(power);
        // console.log("power : "+power);
        // console.log("stageName : "+stagename);
        //console.log("byeArr : "+byefixtureArr);
        //console.log("teamArr : "+teamsArr);
        let innerLoop = power/2;
        //console.log("innerLoop : " + innerLoop);
        for(let i=0; i<innerLoop; i++){
            let match;
            if(!teamsArr || !teamsArr.length){
                teamsArr = Object.keys(stageMatches);
                // console.log("next stage teamsArr build : "+Object.keys(stageMatches));
                // console.log("next stage teamsArr : "+ teamsArr);
                stageMatches = {};
            }
            if(byefixtureArr && byefixtureArr.length){
                match = [byefixtureArr[0] , teamsArr[0]]
                teamsArr.shift();
                byefixtureArr.shift();
            } else {
                match = [teamsArr[0], teamsArr[1]];
                //console.log("innerLoop teamArr : "+teamsArr);
                teamsArr.splice(0,2); //remov e first two element
            }
            if(stagename == 'R'){
                stageMatches[stagename+stageRound+'M'+(i+1)] =  match;
            } else{
                // for Q, S and F stages
                stageMatches[stagename+stageRound] =  match;
                stageRound ++;
            }
            //console.log("Stage name : "+(stagename+stageRound) + " matchs : "+(match));
        }
        if(stagename == 'R'){
            fixtureDetails[stagename+stageRound] = stageMatches;
        } else {
            fixtureDetails[stagename] = stageMatches;
        }
        stageRound = 1;
        power = innerLoop;
        //console.log("final stageMatches : "+ Object.keys(stageMatches));
        //console.log("power : "+power);
    }
    console.log(fixtureDetails);
    return fixtureDetails;
}

function fixtureFoBye(fixtureDetails, byefixtureArr, teamsArr){
    let byeRoundCount = 500;
    let bye = {};
    let power = 1;
    for(let i=0; i<100; i++){
        power = 2**i;
        let diff = teamsArr.length - power;
        if(diff < 0){
            power = 2**(i-1);
            break;
        }
        if(diff == 0){
            break;
        }
        // if(byeRoundCount == diff){
        //     break;
        // } else if(byeRoundCount < diff){
        //     power = 2 ** (i-1);
        //     break;
        // }
        byeRoundCount = diff;
    }
    byeRoundCount = Math.abs(byeRoundCount);
    if(power == teamsArr.length){
        //console.log("power : "+power)
        return power;
    }
    console.log("byeRoundCount : "+byeRoundCount);
    console.log("power : "+power)
    for(let i=0; i<byeRoundCount; i++){
        byefixtureArr.push("B"+(i+1));
        bye["B"+(i+1)] = [teamsArr[i], teamsArr[i+1]];

        teamsArr.splice(0,2); //remove first two element
        console.log("teamsArr bye after remove : "+teamsArr);
    }
    console.log("teamsArr bye final : "+teamsArr);
    fixtureDetails.bye = bye;
    return power;
}

function getStageName(power){
    let stagename;
    if(power == 8){
        stagename = 'Q';
    } else if(power == 4) {
        stagename = 'S';
    } else if(power == 2) {
        stagename = 'F'
    } else {
        stagename = 'R'
    }
    return stagename;
}

run(generateTeams());

function generateTeams(count){
    if(!count){
        count = 32;
    }
    let teams = [];
    let i = 1;
    while(i <= count){
        teams.push("team"+i);
        i++;
    }
    //console.log("Teams "+ teams);
    return teams;
}