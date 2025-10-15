import { MoveList } from "./MoveList.js";

/*
  Chessboard positions are indicated using [x, y] coordinates starting from the bottom left corner
*/

const MAX_FILE_AND_RANK = 7; // Last file and rank starting from 0

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

// Note: There may be several shortest knight paths but this will return the first one it finds
export function getShortestKnightPath(startingPosition, targetPosition) {
  if (!isAValidPosition(startingPosition)) {
    throw new Error("Starting position is not valid");
  }
  if (!isAValidPosition(targetPosition)) {
    throw new Error("Target position is not valid");
  }

  // Queue will contain the move lists to explore
  const firstMove = new MoveList([startingPosition]);
  const queue = [firstMove];

  let currentMoveList;
  while ((currentMoveList = queue.shift())) {
    const nextPossibleMoves = getKnightMoves(
      currentMoveList.getCurrentPosition(),
    );
    for (let i = 0; i < nextPossibleMoves.length; i++) {
      const newMoveList = new MoveList([...currentMoveList.moveList]);
      const isUniqueMove = newMoveList.addMove(nextPossibleMoves[i]);
      if (!isUniqueMove) {
        // Ignore this move list because it is a loop
        continue;
      }

      if (
        newMoveList.getCurrentPosition().toString() ===
        targetPosition.toString()
      ) {
        // There will always be a solution so this is the only return
        return newMoveList.moveList;
      } else {
        queue.push(newMoveList);
      }
    }
  }
}
