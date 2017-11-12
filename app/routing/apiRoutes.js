const path = require("path");
const friends = require("../data/friends");




module.exports = function (app) {

    // displays JSON of all the friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        //for some reason "scores" property is "scores[]" and I can't figure out exactly why...
        const newUserSubmission = req.body.scores;
        const scoreComparisonArray = [];
        const friendCount = 0;
        //index position for best match comparison 
        let bestScoreMatch = 0;
        //goes through all the current friends 
        for (let i = 0; i < friends.length; i++) {
            let scoresDiff = 0;
            //goes through scores to compare friends
            for (let j = 0; j < newUserSubmission.length; j++) {
                scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newUserSubmission[j])));

            }
            //pushes each comparison into the scoresComparisonArray 
            scoreComparisonArray.push(scoresDiff);
        }
        //Go through all the comparisons and find the one w/ the least difference aka the best match
        for (let i = 0; i < scoreComparisonArray.length; i++) {
            if (scoreComparisonArray[i] <= scoreComparisonArray[bestScoreMatch]) {
                bestScoreMatch = i;
            }
        }

        //pick the best match w/ friend
        const bestMatchPick = friends[bestScoreMatch];
        res.json(bestMatchPick);

        //submits user info into friends array w/ the friend objects
        friends.push(req.body);


    });
};