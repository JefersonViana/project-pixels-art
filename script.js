const body = document.querySelector('body');
const title = document.createElement('h1');
const header = document.createElement('header');
const section = document.createElement('section');
const section_1 = document.createElement('section');
const section_2 = document.createElement('section');
section_2.className = 'config'
const button = document.createElement('button');
title.innerText = 'Pixels Art';
title.id = 'title';

section.id = 'color-palette';
body.appendChild(header);
header.appendChild(title)
header.appendChild(section)
section.appendChild(section_1)
header.appendChild(section_2)
button.innerText = 'Cores aleatórias';
button.id = 'button-random-color';

const input = document.createElement('input');
input.id = 'board-size';
input.type = 'number';
input.min = 5;
input.value = 5;
const buttonInput = document.createElement('button');
buttonInput.id = 'generate-board';
buttonInput.innerText = 'Criar matriz';
section_2.appendChild(input);
section_2.appendChild(buttonInput);

const buttonClear = document.createElement('button');
buttonClear.id = 'clear-board';
buttonClear.innerText = 'Limpar matriz';
section_2.appendChild(buttonClear);

for (let index = 0; index < 5; index += 1) {
  const div = document.createElement('div');
  div.className = 'color';
  section_1.appendChild(div);
}
section.appendChild(button)

const frame = document.createElement('section');
frame.id = 'pixel-board';
body.appendChild(frame);

const matrix = (quantidade) => {
  for (let index = 0; index < quantidade; index += 1) {
    const lines = document.createElement('div');
    lines.className = 'inline';
    lines.style.backgroundColor = 'transparent';
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
let fourthColorCreated = 'white';
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
  const clickReceiver = document.querySelectorAll('.color').length - 1;
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
  const listColors = ['black', firstColorCreated, secondColorCreated, thirdColorCreated, 'white'];
  const listDivsChildren = section_1.children;
  for (let i = 0; i < listDivsChildren.length; i++) {
    if (target === listDivsChildren[i]) {
      target.className = selectedCor;
      selectedColor = listColors[i];
    }
  }
};

const remetente = (event) => {
  const alvo = event.target;
  const listDivsChildren = section_1.children;
  for (let i = 0; i < listDivsChildren.length; i++) {
    listDivsChildren[i].className = 'color';
  }
  identifyingTheTarget(alvo);
};

const inputText = document.querySelector('#board-size');

const saveLocalStoragePixels = () => {
  localStorage.setItem('pixelBoard', frame.innerHTML);
};

section_1.addEventListener('click', remetente);

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
    recreateLines.style.backgroundColor = 'transparent';
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
