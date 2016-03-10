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
 
  // create a counter, numOfRooks, to keep track of the number of Rooks on the board
  var numOfRooks = 0;
  // create a private function called _decisionTree
  var _decisionTree = function(x, y) {
    // base case
    // if there is a conflict
    if (board.hasAnyRooksConflicts()) {
      // return out of this case
      return;
    }

    // if numOfRooks equals n
    if (numOfRooks === n) {
      // increment the counter variable
      solutionCount++;
      // return out of this case
      return;
    }
    // for every row in board.rows() 
    for (var i = x; i < board.rows().length; i++) {
      // for every element in that row
      for (var j = y; j < i.length; j++) {
        // place Rook at that element
        board.togglePiece(i, j);
        // call _decisionTree
        _decisionTree(i , j + 1);
        // remove Rook at that element
        board.togglePiece(i, j);
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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
