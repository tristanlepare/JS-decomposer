var app = {
  // defining the starting coordinates
  coordinates: {
    x: 0,
    y: 0,
    endx: Math.round(Math.random() * 3),
    endy: Math.round(Math.random() * 5),
    startx: Math.round(Math.random() * 3),
    starty: Math.round(Math.random() * 5),
  },
  // keep the previous orientation
  orientation: "right",

  init: function() {
    console.log("init");
    app.coordinates["x"] = app.coordinates["startx"];
    app.coordinates["y"] = app.coordinates["starty"];
    app.drawBoard();

    // Event listeners
    let button = document.getElementById("launchScript");
    button.addEventListener("click", app.handleLaunchScriptButton);
  },
  handleLaunchScriptButton: function() {
    // TODO
    //console.log("click");
    // TODO : get all lines as an array
    let rawText = document.getElementById("userCode").value;
    var codeLines = rawText.split("\n");
    //console.log(codeLines);

    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },

  drawBoard: function() {
    // get the reference of the board
    let board = document.getElementById("board");

    // emptying the board first
    board.innerHTML = "";

    // creates a <table> element and a <tbody> element
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");

    // creating all cells

    for (let i = 0; i < 4; i++) {
      // creates a table row
      let row = document.createElement("tr");

      for (let j = 0; j < 6; j++) {
        // Create a <td> and put the <td> at the end of the table row
        let cell = document.createElement("td");
        cell.classList.add("cell");
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      row.classList.add("cellRow");
      tableBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    table.appendChild(tableBody);
    // appends <table> into <body>
    board.appendChild(table);

    // get the first cell and add the cellStart class
    let firstCell = document.getElementsByClassName("cellRow")[
      app.coordinates["startx"]
    ].cells[app.coordinates["starty"]];
    //console.log(firstCell);
    firstCell.classList.add("cellStart");

    // get the last cell and add the cellEnd class
    let lastCell = document.getElementsByClassName("cellRow")[
      app.coordinates["endx"]
    ].cells[app.coordinates["endy"]];
    //console.log(lastCell);
    lastCell.classList.add("cellEnd");

    // defining the current cell
    var currentCell = document.getElementsByClassName("cellRow")[
      app.coordinates["x"]
    ].cells[app.coordinates["y"]];
    //console.log(currentCell);
    currentCell.classList.add("cellCurrent");
    currentCell.classList.add("cellCurrent-" + app.orientation);
  },

  moveForward: function(codeLines, index) {
    // selecting the current cell
    let currentCell = document.getElementsByClassName("cellRow")[
      app.coordinates["x"]
    ].cells[app.coordinates["y"]];
    // check the direction of the cursor
    // change coordinates accordingly
    //console.log("current cell:" + currentCell);
    //console.log("MoveF CDL :" + codeLines);
    if (currentCell.classList.contains("cellCurrent-right")) {
      if (app.coordinates["y"] < 5) {
        app.coordinates["y"]++;
      } else {
        //console.log("MoveF CDL :" + codeLines);
        index = codeLines.length;
        alert("Tu sors!");
        //console.log(codeLines);
        return index;
      }
      //console.log("y++");
    } else if (currentCell.classList.contains("cellCurrent-top")) {
      if (app.coordinates["x"] > 0) {
        app.coordinates["x"]--;
      } else {
        //console.log("MoveF CDL :" + codeLines);
        index = codeLines.length;
        alert("Tu sors!");
        return index;
      }
      //console.log("x--");
    } else if (currentCell.classList.contains("cellCurrent-bottom")) {
      if (app.coordinates["x"] < 3) {
        app.coordinates["x"]++;
      } else {
        //console.log("MoveF CDL :" + codeLines);
        index = codeLines.length;
        alert("Tu sors!");
        return index;
      }
      //console.log("x++");
    } else if (currentCell.classList.contains("cellCurrent-left")) {
      if (app.coordinates["y"] > 0) {
        app.coordinates["y"]--;
      } else {
        //console.log("MoveF CDL :" + codeLines);
        index = codeLines.length;
        alert("Tu sors!");
        return index;
      }
      //console.log("y--");
    } else {
      //console.log("ça bug ici !");
    }
    app.drawBoard();
  },

  turnRight: function() {
    let currentCell = document.getElementsByClassName("cellRow")[
      app.coordinates["x"]
    ].cells[app.coordinates["y"]];
    if (currentCell.classList.contains("cellCurrent-right")) {
      currentCell.classList.remove("cellCurrent-right");
      app.orientation = "bottom";
      currentCell.classList.add("cellCurrent-bottom");
    } else if (currentCell.classList.contains("cellCurrent-top")) {
      currentCell.classList.remove("cellCurrent-top");
      app.orientation = "right";
      currentCell.classList.add("cellCurrent-right");
    } else if (currentCell.classList.contains("cellCurrent-bottom")) {
      currentCell.classList.remove("cellCurrent-bottom");
      app.orientation = "left";
      currentCell.classList.add("cellCurrent-left");
    } else if (currentCell.classList.contains("cellCurrent-left")) {
      currentCell.classList.remove("cellCurrent-left");
      app.orientation = "top";
      currentCell.classList.add("cellCurrent-top");
    }
    return app.orientation;
  },
  turnLeft: function() {
    let currentCell = document.getElementsByClassName("cellRow")[
      app.coordinates["x"]
    ].cells[app.coordinates["y"]];
    if (currentCell.classList.contains("cellCurrent-right")) {
      currentCell.classList.remove("cellCurrent-right");
      app.orientation = "top";
      currentCell.classList.add("cellCurrent-top");
    } else if (currentCell.classList.contains("cellCurrent-top")) {
      currentCell.classList.remove("cellCurrent-top");
      app.orientation = "left";
      currentCell.classList.add("cellCurrent-left");
    } else if (currentCell.classList.contains("cellCurrent-bottom")) {
      currentCell.classList.remove("cellCurrent-bottom");
      app.orientation = "right";
      currentCell.classList.add("cellCurrent-right");
    } else if (currentCell.classList.contains("cellCurrent-left")) {
      currentCell.classList.remove("cellCurrent-left");
      app.orientation = "bottom";
      currentCell.classList.add("cellCurrent-bottom");
    }
    return app.orientation;
  },

  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
    let currentLine = codeLines[index];
    //console.log("currentLine: " + currentLine);
    //console.log("codeLines:" + codeLines);
    //console.log("index:" + index);
    // moving depending on the instruction
    if (currentLine == "turn left") {
      app.turnLeft();
      //console.log("turn left");
    } else if (currentLine == "turn right") {
      app.turnRight();
      //console.log("turn right");
    } else if (currentLine == "move forward") {
      //console.log("CDL index: " + index);
      app.moveForward(codeLines);
      //console.log("codeLineLoop: move forward");
    } else {
      //console.log("CDLloop:" + codeLines);
      //console.log("CDL index: " + index);
      index = codeLines.length;
      alert("Erreur de saisie !");
    }
    // Increment
    index++;
    //console.log("index= " + index);
    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function() {
    // TODO display if the game is won or not
    if (
      app.coordinates["x"] === app.coordinates["endx"] &&
      app.coordinates["y"] === app.coordinates["endy"]
    ) {
      alert("YOU WIN!");
    } else {
      alert("YOU LOSE!");
    }
  }
};

document.addEventListener("DOMContentLoaded", app.init);
