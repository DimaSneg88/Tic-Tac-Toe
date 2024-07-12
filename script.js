const items = document.querySelectorAll(".tic__item");
const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const scoreDraft = document.querySelector("#score-draft");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close__modal");
const resultRestart = document.querySelector(".result__restart");
const resultText = document.querySelector(".result__text");
const winItems = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]; // набор выигрышных комбинаций

let player = "x";
let gameEnd = false;

items.forEach((item) => {
  item.onclick = function () {
    handleClick(item);
  };
});

function handleClick(item) {
  if (item.innerHTML == "" && !gameEnd) {
    item.innerHTML = player;
    checkWin();
    checkDraft();

    if (player == "x") {
      item.classList.add("x");
      player = "o";
    } else {
      item.classList.add("o");
      player = "x";
    }
  }
}

function checkWin() {
  winItems.forEach((winItem) => {
    let id1 = winItem[0];
    let id2 = winItem[1];
    let id3 = winItem[2];
    let item1 = document.getElementById(id1);
    let item2 = document.getElementById(id2);
    let item3 = document.getElementById(id3);

    if (
      item1.innerHTML == player &&
      item2.innerHTML == player &&
      item3.innerHTML == player
    ) {
      gameEnd = true;
      item1.classList.add("win");
      item2.classList.add("win");
      item3.classList.add("win");
      openModal(player);
    }
  });
}

function checkDraft() {
  let draft = true;
  items.forEach((item) => {
    if (item.innerHTML == "") {
      draft = false;
    }
  });
  if (draft) {
    gameEnd = true;
    openModal();
  }
}

function openModal(player) {
  modal.classList.add("modal-active");
  if (player) {
    resultText.innerHTML = `player ${player} win!`;
    if (player == "x") {
      scoreX.innerHTML = +scoreX.innerHTML + 1;
    } else {
      scoreO.innerHTML = +scoreO.innerHTML + 1;
    }
  } else {
    resultText.innerHTML = "Draft!";
    scoreDraft.innerHTML = +scoreDraft.innerHTML + 1;
  }
}

closeModal.onclick = closeMdl;
function closeMdl() {
  modal.classList.remove("modal-active");
}

resultRestart.onclick = startNewGame;
function startNewGame() {
  gameEnd = false;
  items.forEach((item) => {
    item.innerHTML = null;
    item.classList.remove("win", "o", "x");
  });
  closeMdl();
}
