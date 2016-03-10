/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({'n': n});
  var counter = 0;

  var _toggle = function(x, y) {
    var x = x;
    var y = y;

    if (counter === n) {
      return;
    }
    if (y === n) {
      board = new Board({'n': n});
      return;
    }
    board.togglePiece(x, y);
    if (board.hasAnyRooksConflicts()) {
      board.togglePiece(x, y);
    } else {
      counter++;
    }
    x++;
    if (x === n) {
      x = 0;
      y++;
    }
    _toggle(x, y);
  };

  _toggle(0, 0);
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  //arrays to store indices to block off rows/columns
  var iArr = [];
  var jArr = [];
 
  // create a counter, numOfRooks, to keep track of the number of Rooks on the board
  var numOfRooks = 0;
  // create a private function called _decisionTree
  var _decisionTree = function(x, y) {
    // base case
    // if numOfRooks equals n
    if (numOfRooks === n) {
      // increment the counter variable
      solutionCount++;
      // return out of this case
      return;
    }
    // for every row in board.rows() 
    for (var i = x; i < board.rows().length; i++) {
      // if i increments up, j should start at zero and not y
      if (i > x) {
        y = 0;
      }
      // for every element in that row
      for (var j = y; j < board.rows(i).length; j++) {
        if (numOfRooks === 0 && i > 0) {
          return;  
        }
        if (iArr.indexOf(i) === -1 && jArr.indexOf(j) === -1) {
          // place Rook at that element
          board.togglePiece(i, j);
          // add indices
          iArr.push(i);
          jArr.push(j);
          // increment numOfRooks
          numOfRooks++;
          // call _decisionTree
          _decisionTree(i, j + 1);
          // remove Rook at that element
          board.togglePiece(i, j);
          // pop the indices
          iArr.pop();
          jArr.pop();
          // decrement numOfRooks
          numOfRooks--;
        }
      }
    }
  };

  // call _decisionTree
  _decisionTree(0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});

  //arrays to store indices to block off rows/columns
  var iArr = [];
  var jArr = [];

  // create a counter, numOfQueens, to keep track of the number of Queens on the board
  var numOfQueens = 0;

  // create a private function called _decisionTree
  var _decisionTree = function(x, y) {
    // base case
    // if there is a conflict
    if (board.hasAnyQueensConflicts()) {
      // return out of this case
      return;
    }

    // if numOfQueens equals n
    if (numOfQueens === n) {
      // set solution to return board
      solution = board.rows();
      // return out of this case
      return;
    }
    // for every row in board.rows() 
    for (var i = x; i < board.rows().length; i++) {
      // if i increments up, j should start at zero and not y
      if (i > x) {
        y = 0;
      }
      // for every element in that row
      for (var j = y; j < board.rows(i).length; j++) {
        if (iArr.indexOf(i) === -1 && jArr.indexOf(j) === -1) {
          // debugger;
          // place Rook at that element
          board.togglePiece(i, j);
          // add indices
          iArr.push(i);
          jArr.push(j);
          // increment numOQueensf
          numOfQueens++;
          // call _decisionTree
          _decisionTree(i, j + 1);

          if (solution) {
            return;
          }
          // remove Rook at that element
          board.togglePiece(i, j);
          // remove indices
          iArr.pop(i);
          jArr.pop(j);
          // decrement numOQueensf
          numOfQueens--;
        }
      }
    }
  };
  if (n === 2 || n === 3) {
    solution = board.rows();
  } else {
    _decisionTree(0, 0);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  //arrays to store indices to block off rows/columns
  var iArr = [];
  var jArr = [];
 
  // create a counter, numOfQueens, to keep track of the number of Queens on the board
  var numOfQueens = 0;
  // create a private function called _decisionTree
  var _decisionTree = function(x, y) {
    // base case
    // if there is a conflict
    if (board.hasAnyQueensConflicts()) {
      // return out of this case
      return;
    }

    // if numOfQueens equals n
    if (numOfQueens === n) {
      // increment the counter variable
      solutionCount++;
      // return out of this case
      return;
    }
    // for every row in board.rows() 
    for (var i = x; i < board.rows().length; i++) {
      // if i increments up, j should start at zero and not y
      if (i > x) {
        y = 0;
      }
      // for every element in that row
      for (var j = y; j < board.rows(i).length; j++) {
        if (numOfQueens === 0 && i > 0) {
          return;  
        }
        if (iArr.indexOf(i) === -1 && jArr.indexOf(j) === -1) {
          // place Rook at that element
          board.togglePiece(i, j);
          // add indices
          iArr.push(i);
          jArr.push(j);
          // increment numOQueensf
          numOfQueens++;
          // call _decisionTree
          _decisionTree(i, j + 1);
          // remove Rook at that element
          board.togglePiece(i, j);
          // remove indices
          iArr.pop(i);
          jArr.pop(j);
          // decrement numOQueensf
          numOfQueens--;
        }
      }
    }
  };
  _decisionTree(0, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
