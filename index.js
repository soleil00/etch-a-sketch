const pad = document.querySelector(".sketchpad");
const gridSizeBox = document.querySelector(".gridSize");
const changeGridSizeBtn = document.querySelector("#gridBtn");
const randomColorBtn = document.querySelector("#randomColorBtn");
const clearBtn = document.querySelector("#clearBtn");

let gridNum = 5;
let squareColor = "purple";
let randColorBtnStatus = "off";

gridSizeBox.textContent = `Current grid size: ${gridNum} x ${gridNum}`;

function removeAllChildNodes(pad) {
  while (pad.firstChild) {
    pad.removeChild(pad.firstChild);
  }
}

function clearPad() {
  const cleanSquare = Array.from(document.querySelectorAll('.column'));
  cleanSquare.forEach(square => square.style.backgroundColor = "rgb(180, 204, 204)");
}

function randColor() {
  const R = Math.floor((Math.random() * 255) + 1);
  const G = Math.floor((Math.random() * 255) + 1);
  const B = Math.floor((Math.random() * 255) + 1);
  return `rgb(${R}, ${G}, ${B})`;
}

function addSquares() {
  const row = document.createElement("div");
  row.classList.add("row");
  pad.appendChild(row);
  for (let i = 0; i < gridNum; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    row.appendChild(column);

    column.addEventListener("mouseenter", function (event) {
      if (randColorBtnStatus === "off") {
        event.target.style.backgroundColor = squareColor;
      } else {
        event.target.style.backgroundColor = randColor();
      }
    });
  }
}

changeGridSizeBtn.addEventListener("click", function () {
  let userNum = window.prompt("Please type desired squares per side (MAX: 80)", "80");
  if (userNum == null || userNum <= 0 || userNum > 80 || isNaN(userNum)) {
    alert("Please type a number between 1 and 80");
    return;
  } else {
    gridNum = userNum;
    removeAllChildNodes(pad);
    padFill(gridNum);
    gridSizeBox.textContent = `Current grid size: ${gridNum} x ${gridNum}`;
  }
});

clearBtn.addEventListener("click", function () {
  clearPad();
});

randomColorBtn.addEventListener("click", function () {
  const onOff = document.querySelector("#onOff");
  if (randColorBtnStatus === "off") {
    randColorBtnStatus = "on";
    onOff.style.color = "#03ff03";
  } else if (randColorBtnStatus === "on") {
    randColorBtnStatus = "off";
    onOff.style.color = "black";
  }
});

function padFill(num) {
  for (let i = 0; i < num; i++) {
    addSquares();
  }
}

padFill(gridNum);
