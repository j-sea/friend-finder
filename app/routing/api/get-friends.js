// Export our callback function used for our friends GET route
module.exports = function (req, res) {
    // Return all of our friends as a JSON object
    return res.json(require('../../data/friends'));
};