const body = document.querySelector('body');
const title = document.createElement('h1');
body.appendChild(title);
title.innerText = 'Paleta de Cores';
title.id = 'title';

const section = document.createElement('section');
section.id = 'color-palette';
body.appendChild(section);
const button = document.createElement('button');
body.appendChild(button);
button.innerText = 'Cores aleatórias';
button.id = 'button-random-color';

const input = document.createElement('input');
input.id = 'board-size';
input.type = 'number';
input.min = 1;
input.value = 0;
const buttonInput = document.createElement('button');
buttonInput.id = 'generate-board';
buttonInput.innerText = 'VQV';
body.appendChild(input);
body.appendChild(buttonInput);

const buttonClear = document.createElement('button');
buttonClear.id = 'clear-board';
buttonClear.innerText = 'Limpar';
body.appendChild(buttonClear);

for (let index = 0; index < 4; index += 1) {
  const div = document.createElement('div');
  div.className = 'color';
  section.appendChild(div);
}

const frame = document.createElement('section');
frame.id = 'pixel-board';
body.appendChild(frame);

const matrix = (quantidade) => {
  for (let index = 0; index < quantidade; index += 1) {
    const lines = document.createElement('div');
    lines.className = 'inline';
    lines.style.backgroundColor = 'white';
    for (let index1 = 0; index1 < quantidade; index1 += 1) {
      const pixels = document.createElement('div');
      pixels.className = 'pixel';
      pixels.style.backgroundColor = 'white';
      lines.appendChild(pixels);
    }
    frame.appendChild(lines);
  }
};

const saveLocalStorage = () => {
  localStorage.setItem('colorPalette', section.innerHTML);
};

matrix(5);
let firstColorCreated = 'yellow';
let secondColorCreated = 'blue';
let thirdColorCreated = 'red';
let createdColor = '#';
let counter = 0;

const applyingColor = () => {
  if (counter === 1) {
    firstColorCreated = createdColor;
  } else if (counter === 2) {
    secondColorCreated = createdColor;
  } else {
    thirdColorCreated = createdColor;
  }
};

function randomColors() {
  const string = '0123456789ABCDEF';
  const clickReceiver = document.querySelectorAll('.color').length;
  for (let index = 1; index < clickReceiver; index += 1) {
    const colorDiv = document.querySelectorAll('.color')[index];
    for (let index1 = 0; index1 < 6; index1 += 1) {
      createdColor += string[Math.floor(Math.random() * 16)];
      colorDiv.style.background = createdColor;
      counter = index;
    }
    saveLocalStorage();
    applyingColor();
    createdColor = '#';
  }
}

button.addEventListener('click', randomColors);

const selectedCor = 'color selected';
const colorBlack = document.getElementsByClassName('color')[0];
colorBlack.className = selectedCor;

let selectedColor = 'black';

const identifyingTheTarget = (param) => {
  const target = param;
  if (target === section.firstChild) {
    target.className = selectedCor;
    selectedColor = 'black';
  }
  if (target === section.firstChild.nextSibling) {
    target.className = selectedCor;
    selectedColor = firstColorCreated;
  }
  if (target === section.firstChild.nextSibling.nextSibling) {
    target.className = selectedCor;
    selectedColor = secondColorCreated;
  }
  if (target === section.firstChild.nextSibling.nextSibling.nextSibling) {
    target.className = selectedCor;
    selectedColor = thirdColorCreated;
  }
};

const remetente = (event) => {
  const alvo = event.target;
  section.firstChild.className = 'color';
  section.firstChild.nextSibling.className = 'color';
  section.firstChild.nextSibling.nextSibling.className = 'color';
  section.firstChild.nextSibling.nextSibling.nextSibling.className = 'color';
  identifyingTheTarget(alvo);
};

const inputText = document.querySelector('#board-size');

const saveLocalStoragePixels = () => {
  localStorage.setItem('pixelBoard', frame.innerHTML);
};

section.addEventListener('click', remetente);

frame.addEventListener('click', (event) => {
  if (event.target.className !== 'inline') {
    const selecionado = event.target;
    selecionado.style.backgroundColor = selectedColor;
    saveLocalStoragePixels();
  }
});

buttonClear.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

const reloadPixels = () => {
  frame.innerHTML = localStorage.getItem('pixelBoard');
};

const reloadColors = () => {
  section.innerHTML = localStorage.getItem('colorPalette');
};

const saveLocalStorageBoard = () => {
  localStorage.setItem('boardSize', inputText.value);
};

const reloadBoard = () => {
  frame.innerHTML = localStorage.getItem('boardSize');
};

const verification = () => {
  if (localStorage.getItem('pixelBoard') === null) {
    saveLocalStoragePixels();
  } else {
    reloadPixels();
  }
  if (localStorage.getItem('boardSize') === null) {
    saveLocalStorageBoard();
  } else {
    reloadBoard();
    reloadPixels();
  }
};

window.onload = () => {
  if (localStorage.getItem('colorPalette') === null) {
    saveLocalStorage();
  } else {
    reloadColors();
  }
  verification();
};

const recreatePixels = (number) => {
  frame.innerHTML = '';
  for (let index = 0; index < number; index += 1) {
    const recreateLines = document.createElement('div');
    recreateLines.className = 'inline';
    recreateLines.style.backgroundColor = 'white';
    for (let index1 = 0; index1 < number; index1 += 1) {
      const recreateCells = document.createElement('div');
      recreateCells.className = 'pixel';
      recreateCells.style.backgroundColor = 'white';
      recreateLines.appendChild(recreateCells);
    }
    frame.appendChild(recreateLines);
  }
};

const verificationOnInput = () => {
  if (inputText.value <= 5) {
    recreatePixels(5);
  }
  if (inputText.value > 5 && inputText.value <= 50) {
    recreatePixels(inputText.value);
  }
  if (inputText.value > 50) {
    recreatePixels(50);
  }
};

const boardSize = () => {
  if (inputText.value > 0) {
    verificationOnInput();
  } else {
    alert('Board inválido!');
  }
  saveLocalStorageBoard();
  saveLocalStorage();
  saveLocalStoragePixels();
};

buttonInput.addEventListener('click', boardSize);
