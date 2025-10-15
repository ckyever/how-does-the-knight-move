export class MoveList {
  constructor(moveList) {
    this.moveList = moveList;
  }

  getCurrentPosition() {
    return this.moveList[this.moveList.length - 1];
  }

  addMove(move) {
    // We need to convert arrays into strings to compare them
    const moveAlreadyMade = this.moveList
      .map(JSON.stringify)
      .includes(JSON.stringify(move));

    if (moveAlreadyMade) {
      return false;
    } else {
      this.moveList.push(move);
      return true;
    }
  }

  toString() {
    let string = "[";
    this.moveList.forEach((move) => {
      string += `${move[0]}, ${move[1]} -> `;
    });
    return string.slice(0, string.length - 4) + "]";
  }
}
