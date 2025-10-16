import "./styles.css";
import { getShortestKnightPath } from "./knight.js";
import knightPiece from "./assets/white-knight.svg";
import chessMoveAudio from "./assets/chess_move.wav";
import { convertPositionToChessNotation, delay } from "./utility.js";

const chessboard = document.querySelector("#chessboard");
const CHESSBOARD_SIZE = 8;
const moveSound = new Audio(chessMoveAudio);

// Ensure bottom left corner coordinates are (0,0)
let rankNumber = 8;
for (let y = CHESSBOARD_SIZE - 1; y >= 0; y--) {
  let fileLetter = "`"; // The character just before "a"
  for (let x = 0; x < CHESSBOARD_SIZE; x++) {
    const square = document.createElement("div");
    square.classList = "square";

    if ((x + y) % 2 == 0) {
      square.classList += " black";
    } else {
      square.classList += " white";
    }

    fileLetter = String.fromCharCode(fileLetter.charCodeAt(0) + 1);
    square.dataset.x = x;
    square.dataset.y = y;

    // Only add board coordinates to the first file and first rank
    if (y === 0) {
      const fileLabel = document.createElement("span");
      fileLabel.classList = "label file";
      fileLabel.textContent = fileLetter;
      square.appendChild(fileLabel);
    }
    if (x === 0) {
      const rankLabel = document.createElement("span");
      rankLabel.classList = "label rank";
      rankLabel.textContent = rankNumber;
      square.appendChild(rankLabel);
    }

    chessboard.appendChild(square);
  }
  rankNumber--;
}

// Create the knight and place on the board
let knightPosition = [4, 4];
const knight = document.createElement("img");
knight.id = "knight";
knight.src = knightPiece;
const defaultSquare = document.querySelector(
  `[data-x="${knightPosition[0]}"][data-y="${knightPosition[1]}"`,
);
defaultSquare.appendChild(knight);

const moveList = document.getElementById("moves");
const notation = convertPositionToChessNotation(knightPosition);
const move = generateMoveElement(0, notation);
moveList.append(move);

let isAnimating = false;
chessboard.addEventListener("click", async (event) => {
  // Prevent new moves while animating
  if (isAnimating) {
    return;
  }
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;

  if (x != null && y != null) {
    const path = getShortestKnightPath(knightPosition, [x, y]);
    const finalSquare = document.querySelector(`[data-x="${x}"][data-y="${y}"`);
    finalSquare.classList.add("destination");

    // Add first current position as move 0
    moveList.innerText = "";
    let notation = convertPositionToChessNotation(knightPosition);
    let move = generateMoveElement(0, notation);
    moveList.append(move);

    isAnimating = true;
    for (let index = 1; index < path.length; index++) {
      notation = convertPositionToChessNotation(path[index]);
      move = generateMoveElement(index, notation);
      moveList.append(move);
      await moveKnight(knight, path[index]);
      moveSound.play();
      await delay(300);
    }
    isAnimating = false;
    finalSquare.classList.remove("destination");
  }
});

function moveKnight(knight, newPosition) {
  return new Promise((resolve) => {
    if (knight == null) {
      resolve();
      return;
    }

    // Get current position
    const firstPosition = knight.getBoundingClientRect();

    // Get target position and move knight
    knightPosition = newPosition;
    const targetSquare = document.querySelector(
      `[data-x="${knightPosition[0]}"][data-y="${knightPosition[1]}"`,
    );
    targetSquare.appendChild(knight);
    const lastPosition = knight.getBoundingClientRect();

    // Check if there's actually a move (prevents issues with same-square clicks)
    const deltaX = firstPosition.left - lastPosition.left;
    const deltaY = firstPosition.top - lastPosition.top;

    if (deltaX === 0 && deltaY === 0) {
      resolve();
      return;
    }

    // Immediately snap it back visually
    knight.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    knight.style.transition = "none";

    // Force a reflow to ensure the transform is applied
    knight.offsetHeight;

    // Animate the transform back to the target position
    requestAnimationFrame(() => {
      knight.style.transition = "transform 0.7s ease-out";
      knight.style.transform = "none";

      // Wait for animation to finish
      knight.addEventListener("transitionend", function handler(e) {
        // Only respond to transform transitions on this element
        if (e.propertyName === "transform" && e.target === knight) {
          knight.removeEventListener("transitionend", handler);
          resolve();
        }
      });
    });
  });
}

function generateMoveElement(moveNumber, notation) {
  const move = document.createElement("div");
  move.classList = "move";

  const moveNumberText = document.createElement("span");
  moveNumberText.classList = "move-number";
  moveNumberText.textContent = moveNumber + ".";

  const notationText = document.createElement("span");
  notationText.classList = "notation";
  notationText.textContent = notation;

  move.appendChild(moveNumberText);
  move.appendChild(notationText);
  return move;
}
