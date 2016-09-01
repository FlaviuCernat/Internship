
var row = 0, col = 5, i;
var color = ["blue", "red", "rgb(0, 255, 0)", "yellow", "orange", "rgb(204, 0, 153)", "#00e4e4"];
var colorIndex = getRandomInt(0, 6);
var time = 100;
function draw(row, col) {
  return document.getElementById("row-" + row + "-col-" + col);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play() {
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

  var gameOver = setInterval(gameLogic, time);

  function gameLogic() {

    var firstRowFull = [];

    blockOnTop(firstRowFull);

    if (firstRowFull[0] && row === 0) {  //daca primul si ultimul rand sunt ocupate => game over
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

  for (i = 1; i <= 10; i++) { // creez un array sa stiu daca vreun element de pe primul rand e ocupat
    firstRowFull.push(document.getElementById("row-1-col-"+i).hasAttribute("style"));
  }

  for (i = 0; i < 10; i++) {
    if (firstRowFull[i] === true) //daca am vreun element de pe primul rand ocupat, il pun primul
      firstRowFull[0] = firstRowFull[i];
  }
}

function squareMovement() {

  window.onkeydown = function(e) {

    if (row < 15) {
      var haveBlockDown = document.getElementById("row-" + (row + 1) + "-col-" + col).hasAttribute("style");
    }

    if ((col > 1  && row > 0)) {
      var haveBlockLeft = document.getElementById("row-" + row + "-col-" + (col - 1)).hasAttribute("style");
    }

    if (col < 10 && row > 0) {
      var haveBlockRight = document.getElementById("row-" + row + "-col-" + (col + 1)).hasAttribute("style");
    }

    if (e.keyCode === 37 && col > 1  && haveBlockLeft === false) {
      col --;
      draw(row, col).style.backgroundColor = color[colorIndex];
      draw(row + 1, col).style.backgroundColor = color[colorIndex];
      draw(row + 1, col+1).style.backgroundColor = color[colorIndex];
      draw(row, col +2).style = null;
      draw(row + 1, col + 2).style = null;
      // for (i = 1; i < 15; i++) {
      //   for (j = 1; j < 10; j++) {
      //     if(draw(i, j).hasAttribute("style")) {
      //       draw(i, j-1).style.backgroundColor = color[colorIndex];
      //       draw(i, j).style = null;
      //     }
      //   }
      // }
    }

    if (e.keyCode === 39 && col < 10 && haveBlockRight === false) {
      col++;
      document.getElementById("row-" + row + "-col-" + col).style.backgroundColor = color[colorIndex];
      document.getElementById("row-" + row + "-col-" + (col - 1)).style = null;
    }

    if (e.keyCode === 40 && row < 15 && haveBlockDown === false) {
      row++;
      document.getElementById("row-" + row + "-col-" + col).style.backgroundColor = color[colorIndex];
      if ((row - 1) > 0)
        document.getElementById("row-" + (row - 1) + "-col-" + col).style = null;
    }
  };
 }

 function NextBlockNotOccupied() {
  if (row < 15) {
    var nextBlock = document.getElementById("row-" + (row + 1) + "-col-" + col).hasAttribute("style");
  }

  if (row < 14) {
    var secondNextBlock = document.getElementById("row-" + (row + 2) + "-col-" + col).hasAttribute("style");
  }

   if (nextBlock && secondNextBlock) {
     row = 16;
   } else {
     row++;
   }
   return nextBlock;
   return secondNextBlock;
 }

 function blockDownNewSquare()  {
     if (row === 16) {
     row = 0;
     col = 5;
     colorIndex = getRandomInt(0, 6);
   }
 }

 function blockMovingDown()  {
     if (row < 15) {
       square();
       if ((row - 1) > 0) {
         var deleteBlock = draw(row-1, col);
         deleteBlock.style = null;
         draw(row-1, col+1).style = null;
       }

      //  var createBlock = document.getElementById("row-"+ row + "-col-" + col);
      //  createBlock.style.backgroundColor = color[colorIndex];

     }
   }


function clearFullRow() {

 var bottomRow = [];
 for (j = 1; j <= 10; j++) {
  bottomRow.push(document.getElementById("row-15-col-"+j).hasAttribute("style"));
 }
 bottomRow.sort(); //imi ordonez valorile de true si false, iar daca primul e true
                  //  inseamna ca toate sunt true, deci randul e plin
 if (bottomRow[0])
   for (var jj = 1; jj <= 10; jj++) {
     document.getElementById("row-15" + "-col-" + jj).style = null;
   }

 if (bottomRow[0]) {
   for (i = 15; i > 0; i--)
     for (j = 1; j < 10; j++) {
       var currentBlock = document.getElementById("row-" + i + "-col-" + j);
       if(currentBlock.hasAttribute("style")) {
         document.getElementById("row-" + (i + 1) + "-col-" + j).style.backgroundColor = currentBlock.style.backgroundColor;
         if((i - 1) > 0)
           currentBlock.style = null;
       }
     }
   }
 }

function square(nextBlock, secondNextBlock) {

  if(nextBlock === false && secondNextBlock) {
    draw(row, col+1).style.backgroundColor = currentBlock.style.backgroundColor;
    draw(row, col).style.backgroundColor = currentBlock.style.backgroundColor;

  } else {
    var currentBlock = draw(row, col);
    currentBlock.style.backgroundColor = color[colorIndex];
    draw(row, col+1).style.backgroundColor = currentBlock.style.backgroundColor;
    draw(row+1, col).style.backgroundColor = currentBlock.style.backgroundColor;
    draw(row+1, col+1).style.backgroundColor = currentBlock.style.backgroundColor;


  }
}
