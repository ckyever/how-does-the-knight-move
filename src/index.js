import "./styles.css";

const chessboard = document.querySelector("#chessboard");

const CHESSBOARD_SIZE = 8;

// Ensure bottom left corner coordinates are (0,0)
for (let y = CHESSBOARD_SIZE - 1; y >= 0; y--) {
  for (let x = 0; x < CHESSBOARD_SIZE; x++) {
    const square = document.createElement("div");
    square.classList = "square";

    if ((x + y) % 2 == 0) {
      square.classList += " black";
    } else {
      square.classList += " white";
    }

    square.dataset.x = x;
    square.dataset.y = y;
    chessboard.appendChild(square);
  }
}
