import { readFileSync } from 'fs';
import TennisMatch from './TennisMatch';
import TennisTournament from './TennisTournament';

// Read command line arguments
const args : string[] = process.argv.slice(2);

// Select file to process
// console.log('Processing file ' + args[0]);
const data = readFileSync(args[0], 'utf-8');

// Process file
let tournament = new TennisTournament();
let match : TennisMatch;

data.split(/\r?\n/).forEach(line =>  {

    if ( line.includes('Match: ') ) {
        let matchId = parseInt(line.replace('Match: ', ''));
        match = new TennisMatch(matchId);
        tournament.addMatch(match);
    } else if ( line.includes(' vs ') ) {
        let players = line.split(' vs ');
        match.setPlayers(players[0], players[1]);
    } else if ( line === '0' || line === '1' ) {
        match.playerScores(parseInt(line));
    }

});

// Determine query
const query = args[1];
let results;

// Queries available
const queryScoreMatch = 'Score Match';
const queryGamesPlayer = 'Games Player';

if ( query.indexOf(queryScoreMatch) === 0 ) {
    const matchId = parseInt(query.substring(queryScoreMatch.length + 1));
    results = tournament.getMatchResultsByMatchId(matchId);
    // Translate to friendly error
    if ( results === null )
        results = 'Match not found';
} else if ( query.indexOf(queryGamesPlayer) === 0 ) {
    const playerName = query.substring(queryGamesPlayer.length + 1);
    results = tournament.getGamesResultsByPlayerName(playerName);
    // Translate to friendly error
    if ( results === null )
        results = 'Player not found';
} else {
    results = 'Query not found';
}

console.log(results);