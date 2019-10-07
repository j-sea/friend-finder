// Import our friends data for the lifetime of this server runtime
var friends = require('../../data/friends');

// Export our callback function used for our friends POST route
module.exports = function (req, res) {
    // Set up an object for our survey taker to hold their data
    var surveyTaker = {
        name: req.body.name,
        photo: req.body.photo,
        scores: [],
    };

    // Iterate through all of the survey taker's scores, storing them
    for (let i = 1; i <= 10; i++) {
        const score = req.body['q' + i];
        surveyTaker.scores.push(score);
    }

    // Set up variables to keep track of our best matches
    var lowestFriendScore = Number.MAX_SAFE_INTEGER;
    var lowestFriendIndexes = [];
    var bestMatch;

    // Iterate through all of the friends stored on our server
    friends.forEach(function (friend, friendIndex) {

        // Set up a variable to keep track of the difference in scores between this friend and our survey taker
        var friendScore = 0;
        friend.scores.forEach(function (score, scoreIndex) {

            // Calculate the absolute difference between scores for this potential friend and the survey taker
            var currentScore = surveyTaker.scores[scoreIndex] - score;
            if (currentScore < 0) currentScore = -currentScore;

            // Accumulate a score sum to later determine the smallest difference
            friendScore += currentScore;
        });

        // If the current match is smaller than the lowest stored score, update the lowest score and clear the matches
        if (friendScore < lowestFriendScore) {
            lowestFriendScore = friendScore;
            lowestFriendIndexes = [];
        }

        // If this friend score is equal to the lowest score, let's add them to our matches
        if (friendScore === lowestFriendScore) {
            lowestFriendIndexes.push(friendIndex);
        }
    });

    // If we have more than one best match, let's return the one with the lowest single-answer difference
    if (lowestFriendIndexes.length > 1) {

        // Get the highest difference of each match
        var highestSingleDifferences = [];
        lowestFriendIndexes.forEach(function (friendIndex, arrIndex) {
            highestSingleDifferences.push(Number.MIN_SAFE_INTEGER);
            friends[friendIndex].scores.forEach(function (score, scoreIndex) {

                var scoreDifference = surveyTaker.scores[scoreIndex] - score;
                if (scoreDifference < 0) scoreDifference = -scoreDifference;

                if (scoreDifference > highestSingleDifferences[arrIndex]) {
                    highestSingleDifferences[arrIndex] = scoreDifference;
                }
            });
        });

        // Get the lowest highest difference of each match
        var lowestSingleDifference = Number.MAX_SAFE_INTEGER;
        var lowestSingleDifferenceIndex = -1;
        highestSingleDifferences.forEach(function (difference, index) {
            if (difference < lowestSingleDifference) {

                lowestSingleDifference = difference;
                lowestSingleDifferenceIndex = index;
            }
        });

        // Store the closest best match possible
        bestMatch = friends[lowestFriendIndexes[lowestSingleDifferenceIndex]];
    }
    // If we only have one best match, store that one as our best match
    else {
        bestMatch = friends[lowestFriendIndexes[0]];
    }

    // Store our survey taker in the friends array now
    friends.push(surveyTaker);

    // Return the best match
    return res.json(bestMatch);
};