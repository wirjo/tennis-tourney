"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var TennisMatch_1 = require("./TennisMatch");
var TennisTournament_1 = require("./TennisTournament");
// Read command line arguments
var args = process.argv.slice(2);
// Select file to process
// console.log('Processing file ' + args[0]);
var data = (0, fs_1.readFileSync)(args[0], 'utf-8');
// Process file
var tournament = new TennisTournament_1["default"]();
var match;
data.split(/\r?\n/).forEach(function (line) {
    if (line.includes('Match: ')) {
        var matchId = parseInt(line.replace('Match: ', ''));
        match = new TennisMatch_1["default"](matchId);
        tournament.addMatch(match);
    }
    else if (line.includes(' vs ')) {
        var players = line.split(' vs ');
        match.setPlayers(players[0], players[1]);
    }
    else if (line === '0' || line === '1') {
        match.playerScores(parseInt(line));
    }
});
// Determine query
var query = args[1];
var results;
// Queries available
var queryScoreMatch = 'Score Match';
var queryGamesPlayer = 'Games Player';
if (query.indexOf(queryScoreMatch) === 0) {
    var matchId = parseInt(query.substring(queryScoreMatch.length + 1));
    results = tournament.getMatchResultsByMatchId(matchId);
    // Translate to friendly error
    if (results === null)
        results = 'Match not found';
}
else if (query.indexOf(queryGamesPlayer) === 0) {
    var playerName = query.substring(queryGamesPlayer.length + 1);
    results = tournament.getGamesResultsByPlayerName(playerName);
    // Translate to friendly error
    if (results === null)
        results = 'Player not found';
}
else {
    results = 'Query not found';
}
console.log(results);
