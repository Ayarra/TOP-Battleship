function Gameboard() {
  // Init playing board
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    board.push(row);
    for (let j = 0; j < 10; j++) {
      row.push(0);
    }
  }
  function getBoard() {
    return board;
  }

  function fillBoard(shipCoord, newShip) {
    let i = 0;
    let coord = shipCoord;

    // check for available space
    if (newShip.orientation === "horizontal") {
      if (newShip.length + shipCoord.x > 10) return 0;
    } else if (newShip.orientation === "vertical") {
      if (newShip.length + shipCoord.y > 10) return 0;
    }

    // check for free space
    while (i < newShip.length) {
      if (newShip.orientation === "horizontal") {
        if (board[coord.y][coord.x]) {
          coord.x++;
          return 0;
        }
      }
      if (newShip.orientation === "vertical") {
        if (board[coord.y][coord.x]) {
          coord.y++;
          return 0;
        }
      }
      i++;
    }

    i = 0;

    // fill space
    while (i < newShip.length) {
      if (newShip.orientation === "horizontal") {
        board[shipCoord.y][shipCoord.x++] = 1;
      } else if (newShip.orientation === "vertical")
        board[shipCoord.y++][shipCoord.x] = 1;
      i++;
    }

    return 1;
  }

  function receiveAttack(coordHit) {
    if (board[coordHit.y][coordHit.x] === -1) return 0;
    else board[coordHit.y][coordHit.x] = -1;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === 1) {
          console.log(i, j);
          return 1;
        }
      }
    }
    return -1;
  }

  return { board, getBoard, fillBoard, receiveAttack };
}

module.exports = Gameboard;
