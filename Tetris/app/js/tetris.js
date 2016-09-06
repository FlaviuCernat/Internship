
var row = 0, col = 5, i;
var color = ["blue", "red", "rgb(0, 255, 0)", "yellow", "orange", "rgb(204, 0, 153)", "#00e4e4"];
var colorIndex = getRandomInt(0, 6);
var time = 200;
var gameOver

function draw(row, col) {
  return document.getElementById("row-" + row + "-col-" + col);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play() {
  clearInterval(gameOver);
  var tableGame = document.getElementById("table_game");
  var tableData = tableGame.getElementsByTagName("TD");
  var i;
  for (i = 0; i < tableData.length; i++) {
      tableData[i].style = null;
  }
  row = 0;
  col = 5;
  tetrisGame();
}

function tetrisGame() {

  gameOver = setInterval(gameLogic, time);

  function gameLogic() {

    var firstRowFull = [];

    blockOnTop(firstRowFull);

    //daca primul si ultimul rand sunt ocupate => game over

    if (firstRowFull[0] && row === 0) {
      clearInterval(gameOver);
      alert("GAME OVER");

    } else {

      squareMovement();

      NextBlockNotOccupied();

      blockMovingDown();

      blockDownNewSquare();

      clearFullRow();
    }
  }
}

function blockOnTop(firstRowFull) {

  // creez un array sa stiu daca vreun element de pe primul rand e ocupat

  for (i = 1; i <= 10; i++) {
    firstRowFull.push(draw(1, i).hasAttribute("style"));
  }

  for (i = 0; i < 10; i++) {

    //daca am vreun element de pe primul rand ocupat, il pun primul

    if (firstRowFull[i] === true)
      firstRowFull[0] = firstRowFull[i];
  }
}

function squareMovement() {

  window.onkeydown = function(e) {

    if (row < 15) {
      var haveBlockDown = draw(row + 1, col).hasAttribute("style");
    }

    if ((col > 1  && row > 0)) {
      var haveBlockLeft = draw(row, col - 1).hasAttribute("style");
    }

    if (col < 10 && row > 0) {
      var haveBlockRight = draw(row, col + 1).hasAttribute("style");
    }

    if (e.keyCode === 37 && col > 1  && haveBlockLeft === false) {
      col --;
      draw(row, col).style.backgroundColor = color[colorIndex];
      draw(row, col + 1).style = null;
    }

    if (e.keyCode === 39 && col < 10 && haveBlockRight === false) {
      col++;
      draw(row, col).style.backgroundColor = color[colorIndex];
      draw(row, col - 1).style = null;
    }

    if (e.keyCode === 40 && row < 15 && haveBlockDown === false) {
      row++;
      draw(row, col).style.backgroundColor = color[colorIndex];
      if ((row - 1) > 0)
        draw(row - 1, col).style = null;
    }
  };
 }

 function NextBlockNotOccupied() {
  if (row < 15) {
    var nextBlock = draw(row + 1, col).hasAttribute("style");
  }

   if (nextBlock) {
     row = 16;
   } else {
     row++;
   }
   return nextBlock;
 }

 function blockDownNewSquare()  {
     if (row === 16) {
     row = 0;
     col = 5;
     colorIndex = getRandomInt(0, 6);
   }
 }

 function blockMovingDown()  {
     if (row < 16) {
       var currentBlock = draw(row, col);
       currentBlock.style.backgroundColor = color[colorIndex];
       if ((row - 1) > 0) {
         var deleteBlock = draw(row - 1, col);
         deleteBlock.style = null;
       }
     }
   }


function clearFullRow() {

 var bottomRow = [];
 for (j = 1; j <= 10; j++) {
  bottomRow.push(draw(15, j).hasAttribute("style"));
 }
 bottomRow.sort();

  //imi ordonez valorile de true si false, iar daca primul e true
  //  inseamna ca toate sunt true, deci randul e plin

 if (bottomRow[0])
   for (var jj = 1; jj <= 10; jj++) {
     draw(15, jj).style = null;
   }

 if (bottomRow[0]) {
   for (i = 15; i > 0; i--)
     for (j = 1; j < 10; j++) {
       var currentBlock = draw(i, j);
       if(currentBlock.hasAttribute("style")) {
         draw(i + 1, j).style.backgroundColor = currentBlock.style.backgroundColor;
         if((i - 1) > 0) {
           currentBlock.style = null;
         }
       }
     }
   }
 }

function square(nextBlock, secondNextBlock) {

  // if(nextBlock === false && secondNextBlock) {
  //   draw(row, col+1).style.backgroundColor = currentBlock.style.backgroundColor;
  //   draw(row, col).style.backgroundColor = currentBlock.style.backgroundColor;
  //
  // } else {

    // draw(row, col+1).style.backgroundColor = currentBlock.style.backgroundColor;
    // draw(row+1, col).style.backgroundColor = currentBlock.style.backgroundColor;
    // draw(row+1, col+1).style.backgroundColor = currentBlock.style.backgroundColor;
  // }
}
