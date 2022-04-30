import './style.scss';

class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      textarea: null,
      keyboardContainer: null,
      keys: [],
    };
  }

  init() {
    this.elements.main = document.createElement('main');
    this.elements.main.classList.add('main');
    this.elements.main.classList.add('main-container');

    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.classList.add('textarea');
    this.elements.textarea.setAttribute('autofocus', 'autofocus');
    this.elements.textarea.setAttribute('rows', '10');

    this.elements.keyboardContainer = document.createElement('div');
    this.elements.keyboardContainer.classList.add('keyboard');
  }

  createKeys() {
    const keyboardFragment = document.createDocumentFragment();
    const keyLayout = [
      'backticks', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'leftshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'uparrow', 'rightshift',
      'leftctrl', 'leftalt', 'spacebar', 'rightalt', 'leftarrow', 'downarrow', 'rightarrow', 'rightctrl',
    ];

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');

      keyboardFragment.append(keyElement);
    });
    return keyboardFragment;
  }

  render() {
    document.body.prepend(this.elements.main);
    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keyboardContainer);
    this.elements.keyboardContainer.appendChild(this.createKeys());
  }
}

console.log('Virtual Keyboard task started');

const kb = new Keyboard();
kb.init();
kb.render();
