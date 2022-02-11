import TennisTournament from './TennisTournament';
import TennisMatch from './TennisMatch';

describe('Testing a tennis tournament', () => {

    const sampleTennisMatchA = () : TennisMatch => {
        const tennisMatch = new TennisMatch(101);
        
        tennisMatch.setPlayers("John", "Adam");

        const gamesToWin = 6;
        const pointsToWinGame = 4;

        // Player 0 wins first set
        for(let i=1; i <=  gamesToWin * pointsToWinGame; i++) 
            tennisMatch.playerScores(0);

        // Player 1 wins second and third sets
        for(let i=1; i <= 2 * gamesToWin * pointsToWinGame; i++) 
            tennisMatch.playerScores(1);

        return tennisMatch;
    }

    const sampleTennisMatchB = () : TennisMatch => {
        const tennisMatch = new TennisMatch(102);
        
        tennisMatch.setPlayers("John", "Sally");

        const gamesToWin = 6;
        const pointsToWinGame = 4;

        // Player 0 wins first set
        for(let i=1; i <=  gamesToWin * pointsToWinGame; i++) 
            tennisMatch.playerScores(0);

        // Player 1 wins second and third sets
        for(let i=1; i <= 2 * gamesToWin * pointsToWinGame; i++) 
            tennisMatch.playerScores(1);

        return tennisMatch;
    }

    test('A tournament can have multiple matches with different numeric IDs', () => {
        const tennisTournament = new TennisTournament();
        const tennisMatchA = new TennisMatch(13);
        const tennisMatchB = new TennisMatch(27);
        tennisTournament.addMatch(tennisMatchA);
        tennisTournament.addMatch(tennisMatchB);
        expect(tennisTournament.getMatchById(13).matchId).toBe(13);
        expect(tennisTournament.getMatchById(27).matchId).toBe(27);
        expect(tennisTournament.getMatchById(404)).toBe(undefined); // If match cannot be found
    });

    test('Should return match results for a sample match', () => {
        const tennisTournament = new TennisTournament();
        const tennisMatch : TennisMatch = sampleTennisMatchA();
        tennisTournament.addMatch(tennisMatch);
        expect(tennisTournament.getMatchResultsByMatchId(101)).toBe("Adam defeated John\n2 sets to 1");
        expect(tennisTournament.getMatchResultsByMatchId(404)).toBe(null); // If match cannot be found
    });

    test('Should return game results for players for sample match', () => {
        const tennisTournament = new TennisTournament();
        const tennisMatch : TennisMatch = sampleTennisMatchA();
        tennisTournament.addMatch(tennisMatch);
        expect(tennisTournament.getGamesResultsByPlayerName("John")).toBe(`6 12`);
        expect(tennisTournament.getGamesResultsByPlayerName("Adam")).toBe(`12 6`);
        expect(tennisTournament.getGamesResultsByPlayerName("Sally")).toBe(null);
    });

    test('Should return aggregate game results for players for multiple matches', () => {
        const tennisTournament = new TennisTournament();
        const tennisMatchA : TennisMatch = sampleTennisMatchA();
        const tennisMatchB : TennisMatch = sampleTennisMatchB();
        tennisTournament.addMatch(tennisMatchA);
        tennisTournament.addMatch(tennisMatchB);
        expect(tennisTournament.getGamesResultsByPlayerName("John")).toBe(`12 24`);
        expect(tennisTournament.getGamesResultsByPlayerName("Adam")).toBe(`12 6`);
        expect(tennisTournament.getGamesResultsByPlayerName("Sally")).toBe(`12 6`);
    });

});