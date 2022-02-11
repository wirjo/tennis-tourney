"use strict";
exports.__esModule = true;
var TennisMatch = /** @class */ (function () {
    function TennisMatch(_matchId) {
        var _this = this;
        this.matchId = 0;
        this.players = ['', ''];
        this.winner = '';
        this.gameScore = [0, 0];
        this.matchScore = {
            0: [0, 0, 0],
            1: [0, 0, 0]
        };
        this.setsWon = [0, 0];
        this.gamesWon = [0, 0];
        this.currentSet = 0;
        this.matchCompleted = false;
        this.setPlayers = function (_playerA, _playerB) {
            _this.players[0] = _playerA;
            _this.players[1] = _playerB;
        };
        this.playerScores = function (_player) {
            if (_this.matchCompleted)
                return null;
            var _opponent = _player ? 0 : 1;
            if (_this.gameScore[_player] === 0) {
                _this.gameScore[_player] = 15;
            }
            else if (_this.gameScore[_player] === 15) {
                _this.gameScore[_player] = 30;
            }
            else if (_this.gameScore[_player] === 30) {
                if (_this.gameScore[_opponent] === 40) {
                    _this.gameScore[_player] = "Deuce";
                    _this.gameScore[_opponent] = "Deuce";
                }
                else {
                    _this.gameScore[_player] = 40;
                }
            }
            else if (_this.gameScore[_player] == 40) {
                _this.winGame(_player);
            }
            else if (_this.gameScore[_opponent] === "Advantage") { // If opponent has Advantage, then go back to deuce
                _this.gameScore[_player] = "Deuce";
                _this.gameScore[_opponent] = "Deuce";
            }
            else if (_this.gameScore[_player] == "Deuce") { // If currently Deuce, then current player has Advantage
                _this.gameScore[_player] = "Advantage";
            }
            else if (_this.gameScore[_player] == "Advantage") {
                _this.winGame(_player);
            }
            return _this.gameScore;
        };
        this.winGame = function (_player) {
            _this.resetGameScore();
            var setScore = _this.matchScore[_player][_this.currentSet]++;
            _this.gamesWon[_player]++;
            if (setScore == 5) {
                _this.currentSet++;
                _this.setsWon[_player]++;
                if (_this.setsWon[_player] == 2) {
                    _this.matchCompleted = true;
                }
            }
        };
        this.resetGameScore = function () {
            _this.gameScore = [0, 0];
        };
        this.getWinner = function () {
            if (_this.matchCompleted)
                return _this.setsWon[0] > _this.setsWon[1] ? 0 : 1;
            else
                return null;
        };
        this.getPlayerOpponent = function (playerId) {
            return playerId === 1 ? 0 : 1;
        };
        this.getPlayerIdByName = function (playerName) {
            var players = _this.players;
            var playerId = Object.keys(players).find(function (id) { return players[parseInt(id)] === playerName; });
            if (typeof playerId !== 'undefined')
                return parseInt(playerId);
            else
                return null;
        };
        this.getGamesScoreByPlayerName = function (playerName) {
            // Find Player ID by name
            var playerId = _this.getPlayerIdByName(playerName);
            // Return null if cannot find player
            if (playerId === null)
                return null;
            var gamesWon = _this.gamesWon;
            // Otherwise, get the number of games won and defeated
            var gamesWonByPlayer = gamesWon[playerId];
            var totalGamesPlayed = gamesWon[0] + gamesWon[1];
            var gamesLostByPlayer = totalGamesPlayed - gamesWonByPlayer;
            return [gamesWonByPlayer, gamesLostByPlayer];
        };
        this.matchId = _matchId;
    }
    return TennisMatch;
}());
exports["default"] = TennisMatch;
