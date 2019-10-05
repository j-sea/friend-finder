var express = require('express');
var router = express.Router();

var friends = require('../data/friends');

router.post('/friends', function (req, res) {
    var name = req.body.name;
    var photo = req.body.photo;

    var answers = [];
    for (let i = 1; i <= 10; i++) {
        const answer = req.body['q' + i];
        answers.push(answer);
    }

    var lowestFriendScore = NUMBER.MAX_SAFE_INTEGER;
    var lowestFriendIndex = -1;

    friends.forEach(function (friend, index) {

        // friend.scores.
    });
});

module.exports = router;