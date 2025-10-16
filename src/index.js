import "./styles.css";
import { getShortestKnightPath } from "./knight.js";
import knightPiece from "./assets/white-knight.svg";

const chessboard = document.querySelector("#chessboard");
const CHESSBOARD_SIZE = 8;

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

// Handle selecting a target square and move the knight there
chessboard.addEventListener("click", (event) => {
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;

  if (x != null && y != null) {
    console.log(`Clicked on (${x}, ${y})`);
    const path = getShortestKnightPath(knightPosition, [x, y]);

    // Loop through each position in path
    // Move to each
  }
});

function moveKnight(knight, newPosition) {
  if (knight == null) {
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

  // Immediately snap it back visually
  const deltaX = firstPosition.left - lastPosition.left;
  const deltaY = firstPosition.top - lastPosition.top;
  knight.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  knight.style.transition = "none"; // disable transition for the snap

  // Animate the transform back to the target position
  requestAnimationFrame(() => {
    knight.style.transition = "transform 0.7s ease-out";
    knight.style.transform = "none";
  });
}
