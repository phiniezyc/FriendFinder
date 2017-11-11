//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 


// 6. Determine the user's most compatible friend using the following as a guide:

//    * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
//    * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
//      * Example: 
//        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//        * Total Difference: **2 + 1 + 2 =** **_5_**
//    * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on. 
//    * The closest match will be the user with the least amount of difference.

// 7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
//    * The modal should display both the name and picture of the closest match. 

//userData.scores ?


const path = require("path");
const friends = require("../data/friends");







const friend1 = friends[0].scores; // gives us the first user's score and so forth
const friend2 = friends[1].scores;
const friend3 = friends[2].scores;
const friend4 = friends[3].scores;
const friend5 = friends[4].scores;
const friend6 = friends[5].scores;
const friend7 = friends[6].scores;
const friend8 = friends[7].scores;
const friend9 = friends[8].scores;
const friend10 = friends[9].scores;












module.exports = function (app) {

    // displays JSON of all the friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        //posts the user survey results to friends in JSON format
        //friends.push(req.body);
        //res.json(true);

        var userSubmission = req.body;

        var newUserSubmission = req.body;
        var scoreComparisonArray = [];
        var friendCount = 0;
        //index position for best match comparison 
        var bestScoreMatch = 0;
        //goes through all the current friends 
        for (var i = 0; i < friends.length; i++) {
            var scoresDiff = 0;
            //goes through scores to compare friends
            for (var j = 0; j < newUserSubmission.length; j++) {
                scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newUserSubmission[j])));
            }

            //pushes each comparison into the scoresComparisonArray 
            scoreComparisonArray.push(scoresDiff);
        }
        //Go through all the comparisons and find the one w/ the least difference aka the best match
        for (var i = 0; i < scoreComparisonArray.length; i++) {
            if (scoreComparisonArray[i] <= scoreComparisonArray[bestScoreMatch]) {
                bestScoreMatch = i;
            }
        }

        //pick the best match w/ friend
        var bestMatchPick = friends[bestScoreMatch];
        res.json(bestMatchPick);

        //submits user info into friends array w/ the friend objects
        friends.push(req.body);


    });
};