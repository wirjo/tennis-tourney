import TennisMatch from './TennisMatch';

export default class TennisTournament {
    
    matches : TennisMatch[] = [];

    addMatch = (match : TennisMatch) => {
        this.matches[match.matchId] = match;
    }

    getMatchById = (matchId : number) : TennisMatch => {
        return this.matches[matchId];
    }

    getMatchResultsByMatchId = (matchId : number) : string | null => {
        const match = this.getMatchById(matchId);

        // Cannot find match
        if ( typeof match === 'undefined' ) 
            return null;

        // Cannot find a winner
        const winner = match.getWinner();

        if ( winner === null )
            return null;

        const loser = match.getPlayerOpponent(winner);
        const { players, setsWon } = match;
        return `${players[winner]} defeated ${players[loser]}\n${setsWon[winner]} sets to ${setsWon[loser]}`;
    }

    getGamesResultsByPlayerName = (playerName : string) : string | null  => {
        const { matches } = this;
        let gamesWonByPlayer : number = 0;
        let gamesLostByPlayer : number = 0;

        matches.forEach((match : TennisMatch) => {
            const gamesScore = match.getGamesScoreByPlayerName(playerName);
            if ( gamesScore !== null ) {
                gamesWonByPlayer += gamesScore[0];
                gamesLostByPlayer += gamesScore[1];
            }
        });

        if ( gamesWonByPlayer + gamesLostByPlayer > 0 ) 
            return `${gamesWonByPlayer} ${gamesLostByPlayer}`;
        else
            return null;
    }

}