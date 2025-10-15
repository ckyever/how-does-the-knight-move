/*

PLANNING:

isAValidMove(x, y) 
  return true/false if move is valid
  i.e. x and y are between 0-7 (inclusive)

getKnightMoves({x, y}) 
  return array of valid moves
  [{2, 5}, {4, 5}, ...]

getKnightPath({x, y})
  create an adjacency list
  call getKnightMoves
  for each knight move
  also call getknightmoves
  check if move is our target 
  if it is return all moves in this edge list

*/

/*
  Chessboard positions are indicated using [x, y] coordinates starting from the bottom left corner
*/

const MAX_FILE_AND_RANK = 7; // Where first file/rank is 0

function isAValidPosition([x, y]) {
  return x >= 0 && x <= MAX_FILE_AND_RANK && y >= 0 && y <= MAX_FILE_AND_RANK;
}

function getKnightMoves([startingX, startingY]) {
  const moves = [];

  // Possible vertical moves
  moves.push([startingX + 1, startingY + 2]);
  moves.push([startingX - 1, startingY + 2]);
  moves.push([startingX + 1, startingY - 2]);
  moves.push([startingX - 1, startingY - 2]);

  // Possible horizontal moves
  moves.push([startingX + 2, startingY + 1]);
  moves.push([startingX - 2, startingY + 1]);
  moves.push([startingX + 2, startingY - 1]);
  moves.push([startingX - 2, startingY - 1]);

  // We mutate the array instead of filter for memory reasons
  for (let i = 0; i < moves.length; i++) {
    if (!isAValidPosition(moves[i])) {
      moves.splice(i, 1);
      i--;
    }
  }

  return moves;
}
