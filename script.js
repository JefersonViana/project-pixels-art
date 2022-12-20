const body = document.querySelector('body');
const titulo = document.createElement('h1');
body.appendChild(titulo);
titulo.innerText = 'Paleta de Cores';
titulo.id = 'title';

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

const pixelFrame = (quantidade) => {
  for (let index = 0; index < quantidade; index += 1) {
    const pixelInline = document.createElement('div');
    pixelInline.className = 'inline';
    pixelInline.style.backgroundColor = 'white';
    for (let index1 = 0; index1 < quantidade; index1 += 1) {
      const pixelBlock = document.createElement('div');
      pixelBlock.className = 'pixel';
      pixelBlock.style.backgroundColor = 'white';
      pixelInline.appendChild(pixelBlock);
    }
    frame.appendChild(pixelInline);
  }
};

const saveLocalStorage = () => {
  localStorage.setItem('colorPalette', section.innerHTML);
};

pixelFrame(5);
let corGenerate1 = 'yellow';
let corGenerate2 = 'blue';
let corGenerate3 = 'red';
let corGenerate = '#';
function randomColors() {
  const string = '0123456789ABCDEF';
  const newColor = document.querySelectorAll('.color').length;
  for (let index = 1; index < newColor; index += 1) {
    const colorDiv = document.querySelectorAll('.color')[index];
    for (let index1 = 0; index1 < 6; index1 += 1) {
      corGenerate += string[Math.floor(Math.random() * 16)];
      colorDiv.style.background = corGenerate;
    }
    if (index === 1) {
      corGenerate1 = corGenerate;
    } else if (index === 2) {
      corGenerate2 = corGenerate;
    } else {
      corGenerate3 = corGenerate;
    }
    saveLocalStorage();
    corGenerate = '#';
  }
}

button.addEventListener('click', randomColors);

const selectedCor = 'color selected';
const colorBlack = document.getElementsByClassName('color')[0];
colorBlack.className = selectedCor;

let selectedColor = 'black';

const remetente = (event) => {
  const alvo = event.target;
  if (alvo === section.firstChild) {
    alvo.className = selectedCor;
    section.firstChild.nextSibling.className = 'color';
    section.firstChild.nextSibling.nextSibling.className = 'color';
    section.firstChild.nextSibling.nextSibling.nextSibling.className = 'color';
    selectedColor = 'black';
  }
  if (alvo === section.firstChild.nextSibling) {
    alvo.className = selectedCor;
    section.firstChild.className = 'color';
    section.firstChild.nextSibling.nextSibling.className = 'color';
    section.firstChild.nextSibling.nextSibling.nextSibling.className = 'color';
    selectedColor = corGenerate1;
  }
  if (alvo === section.firstChild.nextSibling.nextSibling) {
    alvo.className = selectedCor;
    section.firstChild.className = 'color';
    section.firstChild.nextSibling.className = 'color';
    section.firstChild.nextSibling.nextSibling.nextSibling.className = 'color';
    selectedColor = corGenerate2;
  }
  if (alvo === section.firstChild.nextSibling.nextSibling.nextSibling) {
    alvo.className = selectedCor;
    section.firstChild.className = 'color';
    section.firstChild.nextSibling.className = 'color';
    section.firstChild.nextSibling.nextSibling.className = 'color';
    selectedColor = corGenerate3;
  }
};

const inputText = document.querySelector('#board-size');

const saveLocalStoragePixels = () => {
  localStorage.setItem('pixelBoard', frame.innerHTML);
};

section.addEventListener('click', remetente);

frame.addEventListener('click', (event) => {
  const selecionado = event.target;
  selecionado.style.backgroundColor = selectedColor;
  saveLocalStoragePixels();
});

buttonClear.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
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

window.onload = () => {
  if (localStorage.getItem('colorPalette') === null) {
    saveLocalStorage();
  } else {
    reloadColors();
  }
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

const pixelFrame1 = (number) => {
  for (let index = 0; index < number; index += 1) {
    const Linha = document.createElement('div');
    Linha.className = 'inline';
    Linha.style.backgroundColor = 'white';
    for (let index1 = 0; index1 < number; index1 += 1) {
      const cell = document.createElement('div');
      cell.className = 'pixel';
      cell.style.backgroundColor = 'white';
      Linha.appendChild(cell);
    }
    frame.appendChild(Linha);
  }
};

const boardSize = () => {
  if (inputText.value > 0) {
    const teste = document.getElementById('pixel-board');
    let cansado = teste.lastElementChild;
    for (let index = 0; index < 5; index += 1) {
      teste.removeChild(cansado);
      cansado = teste.lastElementChild;
    }
    if (inputText.value <= 5) {
      pixelFrame1(5);
    }
    if (inputText.value > 5 && inputText.value <= 50) {
      pixelFrame1(inputText.value);
    }
    if (inputText.value > 50) {
      pixelFrame1(50);
    }
  } else {
    alert('Board inválido!');
  }
  saveLocalStorageBoard();
  saveLocalStorage();
  saveLocalStoragePixels();
};

buttonInput.addEventListener('click', boardSize);
