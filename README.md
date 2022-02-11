# Tennis Score App Overview

As per instructions from `challenge/README.md`, this is a demonstrative TypeScript application to process a text input file and provide results for a tennis tournament. The application has two classes `TennisMatch` and `TennisTournament` (which can have multiple matches) which handles the scoring logic. The command line input query is processed via `index.ts` (see example queries below).

## Getting Started

1. Install packages using `yarn install`
2. Compile and test using `yarn compile; yarn test`
3. Run queries by adding `filename` and `query` arguments to `node index.js` for example:

```
node index.js ./full_tournament.txt "Score Match 01";
node index.js ./full_tournament.txt "Score Match 02";
node index.js ./full_tournament.txt "Games Player Person A";
node index.js ./full_tournament.txt "Games Player Person B";
node index.js ./full_tournament.txt "Games Player Person C";
```

## Assumptions

The application made a number of assumptions and can be made more robust to cater for edge cases. This may include, but not limited to:

* Additional validation of command line inputs (e.g. can provide friendlier warnings, errors, etc)
* Additional validation of input file with warnings/errors (e.g. can validate each line and display a friendly warning if format is incorrect, trim() sanitization, etc)
* Handling status/cases for where points tallied do not total what is required to be a completed match (e.g. say if match is suspended mid-way through from rain for example, or if there is erroneous points data)
* Handling status/cases where points tallied is above a completed match (e.g. instead it can be invalid data vs. how it's currently handled where extraneous points are ignored)
* Scalability/performance: may need to query database vs. using arrays, may require procesing of live stream of data for live matches, etc