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
}

pixelFrame(5);
let corGenerate1 = 'yellow';
let corGenerate2 = 'blue';
let corGenerate3 = 'red';
function randomColors() {
  const string = '0123456789ABCDEF';
  let corGenerate = '#';
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

const saveLocalStorage = () => {
  localStorage.setItem('colorPalette', section.innerHTML);
}

const reloadColors = () => {
  section.innerHTML = localStorage.getItem('colorPalette');
}

window.onload = () => {
  if (localStorage.getItem('colorPalette') === null) {
    saveLocalStorage();
  } else {
    reloadColors();
  }
}

button.addEventListener('click', randomColors);


const colorBlack = document.getElementsByClassName('color')[0];
colorBlack.className = 'color selected';

let selectedColor = 'black';


const remetente = (event) => {
  let div1 = section.firstChild;
  let div2 = section.firstChild.nextSibling;
  let div3 = section.firstChild.nextSibling.nextSibling;
  let div4 = section.firstChild.nextSibling.nextSibling.nextSibling;
  let alvo = event.target;
  if (alvo === div1) {
    alvo.className = 'color selected';
    div2.className = 'color';
    div3.className = 'color';
    div4.className = 'color';
    selectedColor = 'black';
  }
  if (alvo === div2) {
    alvo.className = 'color selected';
    div1.className = 'color';
    div3.className = 'color';
    div4.className = 'color';
    selectedColor = corGenerate1;
    console.log(selectedColor);
  }
  if (alvo === div3) {
    alvo.className = 'color selected';
    div1.className = 'color';
    div2.className = 'color';
    div4.className = 'color';
    selectedColor = corGenerate2;
    console.log(alvo);
  }
  if (alvo === div4) {
    alvo.className = 'color selected';
    div1.className = 'color';
    div2.className = 'color';
    div3.className = 'color';
    selectedColor = corGenerate3;
    console.log(alvo);
  }
}

section.addEventListener('click', remetente);

frame.addEventListener('click', (event) => {
  event.target.style.backgroundColor = selectedColor ;
})

buttonClear.addEventListener('click', (event) => {
  location.reload();
});