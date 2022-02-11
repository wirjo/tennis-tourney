type TennisGameScore = 0 | 15 | 30 | 40 | "Deuce" | "Advantage";

interface TennisMatchScore { 
    [key: number] : [number, number, number]
}

export default class TennisMatch {
    matchId: number = 0; 
    players : [string, string] = ['', ''];
    winner: string = '';
    gameScore : [TennisGameScore, TennisGameScore] = [0, 0];
    matchScore : TennisMatchScore = {
        0 : [0, 0, 0],
        1 : [0, 0, 0]
    };
    setsWon : [number, number] = [0 ,0];
    gamesWon : [number, number] = [0, 0];
    currentSet : number = 0;
    matchCompleted : boolean = false;

    constructor(_matchId : number) {
        this.matchId = _matchId;
    }

    setPlayers = (_playerA : string, _playerB : string) => {
        this.players[0] = _playerA;
        this.players[1] = _playerB;
    }

    playerScores = (_player : number) : [TennisGameScore, TennisGameScore] | null => {
        if ( this.matchCompleted ) 
            return null;

        const _opponent = _player ? 0 : 1;

        if ( this.gameScore[_player] === 0 ) {
            this.gameScore[_player] = 15;
        } else if ( this.gameScore[_player] === 15 ) {
            this.gameScore[_player] = 30;
        } else if ( this.gameScore[_player] === 30 ) {
            if ( this.gameScore[_opponent] === 40 ) { 
                this.gameScore[_player] = "Deuce";
                this.gameScore[_opponent] = "Deuce";
            } else {
                this.gameScore[_player] = 40;
            }
        } else if ( this.gameScore[_player] == 40 ) {
            this.winGame(_player);
        } else if ( this.gameScore[_opponent] === "Advantage" ) { // If opponent has Advantage, then go back to deuce
            this.gameScore[_player] = "Deuce";
            this.gameScore[_opponent] = "Deuce";
        } else if ( this.gameScore[_player] == "Deuce" ) {  // If currently Deuce, then current player has Advantage
            this.gameScore[_player] = "Advantage"; 
        } else if (this.gameScore[_player] == "Advantage" ) {
            this.winGame(_player);
        }

        return this.gameScore;
    }

    winGame = (_player : number) => {
        this.resetGameScore();
        const setScore = this.matchScore[_player][this.currentSet]++;
        this.gamesWon[_player]++;

        if ( setScore == 5 ) {
            this.currentSet++;
            this.setsWon[_player]++;

            if ( this.setsWon[_player] == 2 ) {
                this.matchCompleted = true;
            }
        }
    }

    resetGameScore = () => {
        this.gameScore = [0, 0];
    }

    getWinner = () : number | null => {
        if ( this.matchCompleted )
            return this.setsWon[0] > this.setsWon[1] ? 0 : 1;
        else 
            return null;
    }

    getPlayerOpponent = (playerId : number) : number => {    
        return playerId === 1 ? 0 : 1;
    }

    getPlayerIdByName = (playerName : string) : number | null => {
        const { players } = this;
        const playerId = Object.keys(players).find((id) => players[parseInt(id)] === playerName);

        if ( typeof playerId !== 'undefined' )
            return parseInt(playerId);
        else 
            return null;
    }

    getGamesScoreByPlayerName = (playerName : string) : [number, number] | null => {
        // Find Player ID by name
        const playerId = this.getPlayerIdByName(playerName);

        // Return null if cannot find player
        if ( playerId === null  )
            return null;

        const { gamesWon } = this;

        // Otherwise, get the number of games won and defeated
        const gamesWonByPlayer = gamesWon[playerId]; 
        const totalGamesPlayed = gamesWon[0] + gamesWon[1]
        const gamesLostByPlayer = totalGamesPlayed - gamesWonByPlayer;
        return [gamesWonByPlayer, gamesLostByPlayer];
    }

}