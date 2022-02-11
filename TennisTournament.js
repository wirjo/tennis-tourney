"use strict";
exports.__esModule = true;
var TennisTournament = /** @class */ (function () {
    function TennisTournament() {
        var _this = this;
        this.matches = [];
        this.addMatch = function (match) {
            _this.matches[match.matchId] = match;
        };
        this.getMatchById = function (matchId) {
            return _this.matches[matchId];
        };
        this.getMatchResultsByMatchId = function (matchId) {
            var match = _this.getMatchById(matchId);
            // Cannot find match
            if (typeof match === 'undefined')
                return null;
            // Cannot find a winner
            var winner = match.getWinner();
            if (winner === null)
                return null;
            var loser = match.getPlayerOpponent(winner);
            var players = match.players, setsWon = match.setsWon;
            return "".concat(players[winner], " defeated ").concat(players[loser], "\n").concat(setsWon[winner], " sets to ").concat(setsWon[loser]);
        };
        this.getGamesResultsByPlayerName = function (playerName) {
            var matches = _this.matches;
            var gamesWonByPlayer = 0;
            var gamesLostByPlayer = 0;
            matches.forEach(function (match) {
                var gamesScore = match.getGamesScoreByPlayerName(playerName);
                if (gamesScore !== null) {
                    gamesWonByPlayer += gamesScore[0];
                    gamesLostByPlayer += gamesScore[1];
                }
            });
            if (gamesWonByPlayer + gamesLostByPlayer > 0)
                return "".concat(gamesWonByPlayer, " ").concat(gamesLostByPlayer);
            else
                return null;
        };
    }
    return TennisTournament;
}());
exports["default"] = TennisTournament;
