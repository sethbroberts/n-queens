// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //var thisRow = this.get(rowIndex);
      var result = false;
      var sum = 0;
      //do something
      for (var i=0; i<this.attributes.n; i++) {
        sum = sum + this.attributes[rowIndex][i];
      }
      if (sum > 1) {
        result = true;
      }
      return result; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i=0; i<this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var result = false;
      var sum = 0;
      
      for(var i=0; i<this.attributes.n; i++){
        sum = sum + this.attributes[i][colIndex];
      }

      if (sum > 1) {
        result = true;
      }
      return result; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for(var i=0; i<this.attributes.n; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var result = false;

      var sum1 = 0;
      //iterate i goes from 0 to 3
      for (var i=0; i<this.attributes.n; i++) {
        //if majorDiagonalColumnIndexAtFirstRow+i > n
        // if (majorDiagonalColumnIndexAtFirstRow+i >= this.attributes.n) {
        //   //break
        //   break;
        // }

        //CHECK FIRST ELEMENT INDEX
        if (i < 0 || i > this.attributes.n-1) {
          continue;
        }

        //CHECK SECOND ELEMENT INDEX
        if (majorDiagonalColumnIndexAtFirstRow+i < 0 ||
          majorDiagonalColumnIndexAtFirstRow+i > this.attributes.n-1) {
          continue;
        }

        //add to sum1 if necessary, sum1 = sum1 + this.attributes[x][y]
        sum1 = sum1 + this.attributes[i][majorDiagonalColumnIndexAtFirstRow+i];    
      }
      //declare a variable sum2
      var sum2 =0;
      for(var j=0; j<this.attributes.n; j++){
        // if(majorDiagonalColumnIndexAtFirstRow+j > this.attributes.n-1) {
        //   break;
        // }

        //add constraints to element indices
        //in this case, j should be ok
        //add constraint for majorDiagonalColumnIndexAtFirstRow+j
        //above 'break' should take care of case of this being too big

        //CHECK FIRST ELEMENT INDEX
        if (majorDiagonalColumnIndexAtFirstRow+j < 0 ||
          majorDiagonalColumnIndexAtFirstRow+j > this.attributes.n-1) {
          continue;
        }

        //CHECK SECOND ELEMENT INDEX
        if (j < 0 || j > this.attributes.n-1) {
          continue;
        }

        sum2 = sum2 + this.attributes[majorDiagonalColumnIndexAtFirstRow+j][j];
      }

          /*
                      j
                      0   1   2   3
              p   3   30  41  52  63
                  2   20  31  42  53
                  1   10  21  32  43
                  0   00  11  22  33
          */

      if(sum1 > 1 || sum2 > 1){
        result = true;
      }

      return result; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var result = false;

      //looping over all possible majorDiagonalColumnIndexAtFirstRow values
      //check each for major diagonal conflict
      //reset result if necessary
      for (var i=0; i<this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          result = true;
        }
      }
      return result; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var result = false;
      var sum1 = 0;
      var sum2 = 0;
      for (var i=0; i<this.attributes.n; i++) {
        // if (minorDiagonalColumnIndexAtFirstRow-i < 0) {
        //   break;
        // }

        //CHECK FIRST ELEMENT INDEX
        if (i < 0 || i > this.attributes.n-1) {
          continue;
        }

        //CHECK SECOND ELEMENT INDEX
        if (minorDiagonalColumnIndexAtFirstRow-i < 0 ||
          minorDiagonalColumnIndexAtFirstRow-i > this.attributes.n-1) {
          continue;
        }

        sum1 = sum1 + this.attributes[i][minorDiagonalColumnIndexAtFirstRow-i];
      }
      for (var j=0; j<this.attributes.n; j++) {

        // if ( (this.attributes.n-1)-minorDiagonalColumnIndexAtFirstRow + j > 3){
        //   break;
        // }

        //CHECK FIRST ELEMENT INDEX
        if (this.attributes.n-1-minorDiagonalColumnIndexAtFirstRow+j < 0 ||
          this.attributes.n-1-minorDiagonalColumnIndexAtFirstRow+j > this.attributes.n-1) {
          continue;
        }

        //CHECK SECOND ELEMENT INDEX
        if (this.attributes.n-1-j < 0 || 
          this.attributes.n-1-j > this.attributes.n-1) {
          continue;
        }

        sum2 = sum2 + this.attributes[this.attributes.n-1-minorDiagonalColumnIndexAtFirstRow+j][this.attributes.n-1-j];


          // (4-1)-p+i, (4-1)-i
          // (this.attributes.n-1)-p+j, (this.attributes.n-1)-j
          // (this.attributes.n-1)-minorDiagonal< ColumnInexAtFirstRoi <3        // 
          /*
              (4-1)-p+j, (4-1)-j
                      j
                      0   1   2   3
              p   3   03  12  21  30
                  2   13  22  31  40
                  1   23  32  41  50
                  0   33  42  51  60
          */
      }
      if(sum1 > 1 || sum2 > 1){
        result = true;
      }
      return result; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var result = false;

      for(var i=0; i<this.attributes.n;i++){
        if(this.hasMinorDiagonalConflictAt(i)){
          result = true;
        }
      }

      return result; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
