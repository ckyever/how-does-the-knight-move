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

const MAX_FILE_AND_RANK = 7; // Where first file/rank is 0

function isAValidPosition([x, y]) {
  return x >= 0 && x <= MAX_FILE_AND_RANK && y >= 0 && y <= MAX_FILE_AND_RANK;
}
