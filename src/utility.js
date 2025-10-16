export function convertPositionToChessNotation([x, y]) {
  const fileLetter = String.fromCharCode("a".charCodeAt(0) + x);
  return `${fileLetter}${y + 1}`;
}

export function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
