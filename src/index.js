import "./styles.css";

const chessboard = document.querySelector("#chessboard");

const CHESSBOARD_SIZE = 8;

// Ensure bottom left corner coordinates are (0,0)
let rankNumber = 1;
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
  rankNumber++;
}
