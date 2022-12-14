const body = document.querySelector('body');
const titulo = document.createElement('h1');
body.appendChild(titulo);
titulo.innerText = 'Paleta de Cores';
titulo.id = 'title';

const section = document.createElement('section');
section.id = 'color-palette'
body.appendChild(section);

for (let index = 0; index < 4; index += 1) {
  const div = document.createElement('div');
  section.appendChild(div);
  div.className = 'color';
}
