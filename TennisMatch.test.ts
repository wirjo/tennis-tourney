import TennisMatch from './TennisMatch';

describe('Testing a tennis match', () => {

    test('A new match should not be completed and have null scores', () => {
        const tennisMatch = new TennisMatch(1);
        expect(tennisMatch.matchCompleted).toBe(false);
        expect(tennisMatch.getWinner()).toBe(null)
        expect(tennisMatch.setsWon).toStrictEqual([0, 0]);
        expect(tennisMatch.gamesWon).toStrictEqual([0, 0]);
        expect(tennisMatch.matchScore[0]).toStrictEqual([0, 0, 0]);
        expect(tennisMatch.matchScore[1]).toStrictEqual([0, 0, 0]);;
    });

    test('Player opposing ID should be opposit of 0/1', () => {
        const tennisMatch = new TennisMatch(1);
        expect(tennisMatch.getPlayerOpponent(1)).toBe(0);
        expect(tennisMatch.getPlayerOpponent(0)).toBe(1);
    });

    test('Player names should be settable', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.setPlayers('John', 'Adam');
        expect(tennisMatch.players[0]).toBe('John');
        expect(tennisMatch.players[1]).toBe('Adam');
    });

    test('Test that we can find player IDs from their names', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.setPlayers('John', 'Adam');
        expect(tennisMatch.getPlayerIdByName('John')).toBe(0);
        expect(tennisMatch.getPlayerIdByName('Adam')).toBe(1);
        expect(tennisMatch.getPlayerIdByName('Sally')).toBe(null); // if not found
    });

    test('Player 0 scores', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual([15, 0]);
    });

    test('Player 1 scores', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(1);
        expect(tennisMatch.gameScore).toStrictEqual([0, 15]);
    });

    test('Player 1 scores then player 0 scores', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(1);
        expect(tennisMatch.gameScore).toStrictEqual([0, 15]);
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual([15, 15]);

        
    });

    test('Player 1 scores 2 times', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(1);
        tennisMatch.playerScores(1);
        expect(tennisMatch.gameScore).toStrictEqual([0, 30]);
    });

    test('Player 0 scores 3 times', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual([40, 0]);
    });

    test('Player 0 scores 4 times amd wins the game', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual([0, 0]); // Score is reset
        expect(tennisMatch.gamesWon).toStrictEqual([1, 0]);
        expect(tennisMatch.matchScore[0]).toStrictEqual([1, 0, 0]); // First game first set won

        expect(tennisMatch.matchCompleted).toBe(false); // Match is not complete
        expect(tennisMatch.getWinner()).toBe(null); // There is no match winner yet
    });

    test('Player 0 scores 5 times amd game score resets', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual([15, 0]); // Score is reset
        expect(tennisMatch.gamesWon).toStrictEqual([1, 0]); // 1-0 Games won
        expect(tennisMatch.matchScore[0]).toStrictEqual([1, 0, 0]); // First game first set won
    });

    test('Test deuce/advantage battle', () => {
        const tennisMatch = new TennisMatch(1);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(0);
        tennisMatch.playerScores(1);
        tennisMatch.playerScores(1);
        tennisMatch.playerScores(1);
        expect(tennisMatch.gameScore).toStrictEqual(["Deuce", "Deuce"]);
        tennisMatch.playerScores(1);
        expect(tennisMatch.gameScore).toStrictEqual(["Deuce", "Advantage"]); 
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual(["Deuce", "Deuce"]); 
        tennisMatch.playerScores(0);
        expect(tennisMatch.gameScore).toStrictEqual(["Advantage", "Deuce"]); 
        tennisMatch.playerScores(0);

        expect(tennisMatch.gameScore).toStrictEqual([0, 0]); // Score is reset
        expect(tennisMatch.gamesWon).toStrictEqual([1, 0]);
        expect(tennisMatch.matchScore[0]).toStrictEqual([1, 0, 0]); // First game first set won
    });

    test('Test that a set is won after winning 6 games', () => {
        const tennisMatch = new TennisMatch(1);
        const setsToWin = 1;
        const gamesToWin = 6;
        const pointsToWinGame = 4;

        for(let i=1; i <= gamesToWin * pointsToWinGame; i++) {
            tennisMatch.playerScores(0);
        }

        expect(tennisMatch.gameScore).toStrictEqual([0, 0]);
        expect(tennisMatch.gamesWon).toStrictEqual([gamesToWin * setsToWin, 0]);
        expect(tennisMatch.matchScore[0]).toStrictEqual([gamesToWin, 0, 0]); 
        expect(tennisMatch.setsWon).toStrictEqual([setsToWin,0]);
        expect(tennisMatch.currentSet).toBe(1); // 2nd set (starts at 0)
    });

    test('Test that a match is won after winning 2 sets and completes', () => {
        const tennisMatch = new TennisMatch(1);
        const player = 1;
        const setsToWin = 2;
        const gamesToWin = 6;
        const pointsToWinGame = 4;

        for(let i=1; i <= setsToWin * gamesToWin * pointsToWinGame; i++) {
            tennisMatch.playerScores(player);
        }

        expect(tennisMatch.gameScore).toStrictEqual([0, 0]);
        expect(tennisMatch.gamesWon).toStrictEqual([0, gamesToWin * setsToWin]);
        expect(tennisMatch.matchScore[player]).toStrictEqual([gamesToWin, gamesToWin, 0]); 
        expect(tennisMatch.setsWon).toStrictEqual([0,setsToWin]);
        expect(tennisMatch.getWinner()).toBe(1);
        expect(tennisMatch.matchCompleted).toBe(true);
        expect(tennisMatch.playerScores(0)).toBe(null); // Assumption: any additional points are ignored
    });

    test('Test that a match can go to 3 sets and completes', () => {
        const tennisMatch = new TennisMatch(1);
        const setsToWin = 1;
        const gamesToWin = 6;
        const pointsToWinGame = 4;

        // Player 0 wins first set
        for(let i=1; i <= setsToWin * gamesToWin * pointsToWinGame; i++) {
            tennisMatch.playerScores(0);
        }

        // Player 1 wins second set 
        for(let i=1; i <= setsToWin * gamesToWin * pointsToWinGame; i++) {
            tennisMatch.playerScores(1);
        }

        // Expect to be tied 1 to 1
        expect(tennisMatch.setsWon).toStrictEqual([1,1]);
        expect(tennisMatch.currentSet).toBe(2); // 3rd set (starts at 0)

        // Player 1 wins third set 
        for(let i=1; i <= setsToWin * gamesToWin * pointsToWinGame; i++) {
            tennisMatch.playerScores(1);
        }

        
        expect(tennisMatch.setsWon).toStrictEqual([1,2]);
        expect(tennisMatch.matchScore[0]).toStrictEqual([6, 0, 0]); 
        expect(tennisMatch.matchScore[1]).toStrictEqual([0, 6, 6]); 
        expect(tennisMatch.gamesWon).toStrictEqual([6,12]); 
        expect(tennisMatch.matchCompleted).toBe(true);
        expect(tennisMatch.getWinner()).toBe(1);
        expect(tennisMatch.playerScores(0)).toBe(null); // Assumption: any additional points are ignored
    });

    test('Test that games won/lost for players are calculated correctly', () => {      
        const tennisMatch = new TennisMatch(1);
        tennisMatch.setPlayers('John', 'Adam');
        const p0GamesWon = 3;
        const p1GamesWon = 5;
        const pointsToWinGame = 4;
        const totalGames = p0GamesWon + p1GamesWon;
        const p0GamesLost = totalGames - p0GamesWon;
        const p1GamesLost = totalGames - p1GamesWon;

        for(let i=1; i<=p0GamesWon*pointsToWinGame; i++) 
            tennisMatch.playerScores(0);

        for(let i=1; i<=p1GamesWon*pointsToWinGame; i++) 
            tennisMatch.playerScores(1);

        expect(tennisMatch.getGamesScoreByPlayerName('John')).toStrictEqual([p0GamesWon, p0GamesLost]);
        expect(tennisMatch.getGamesScoreByPlayerName('Adam')).toStrictEqual([p1GamesWon, p1GamesLost]);
        expect(tennisMatch.getGamesScoreByPlayerName('Sally')).toBe(null);
    });

})
