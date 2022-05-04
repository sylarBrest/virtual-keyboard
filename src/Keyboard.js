export default class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      textarea: null,
      keyboardContainer: null,
      keys: [],
    };
    this.properties = {
      value: '',
      isCapsLock: false,
      lang: 'en',
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
    this.elements.keys = this.elements.keyboardContainer.querySelectorAll('.key');
    this.elements.keys.forEach((key) => key.addEventListener('click', () => console.log('qqq')));
  }

  createKeys() {
    const keyboardFragment = document.createDocumentFragment();
    const keyLayout = [
      'backtick', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'leftshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'uparrow', 'rightshift',
      'leftctrl', 'win', 'leftalt', 'spacebar', 'rightalt', 'leftarrow', 'downarrow', 'rightarrow', 'rightctrl',
    ];

    const iconForKey = (iconName) => `<span class="material-icons">${iconName}</span>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      let content;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('key');
      keyElement.textContent = key.toLowerCase();
      keyElement.innerHTML = '';
      switch (key) {
        // Buttons with words on it
        case 'del':
          keyElement.classList.add('text');
          keyElement.innerHTML = 'del';
          break;
        case 'leftctrl':
        case 'rightctrl':
          keyElement.classList.add('text');
          keyElement.textContent = 'ctrl';
          break;
        case 'leftalt':
        case 'rightalt':
          keyElement.classList.add('text');
          keyElement.textContent = 'alt';
          break;
        // Normal buttons with icons
        case 'backtick':
          keyElement.textContent = '`';
          break;
        case 'tab':
          keyElement.innerHTML = iconForKey('keyboard_tab');
          content = '\t';
          break;
        case 'win':
          keyElement.innerHTML = iconForKey('window');
          break;
        case 'uparrow':
          keyElement.innerHTML = iconForKey('keyboard_arrow_up');
          break;
        case 'leftarrow':
          keyElement.innerHTML = iconForKey('keyboard_arrow_left');
          break;
        case 'downarrow':
          keyElement.innerHTML = iconForKey('keyboard_arrow_down');
          break;
        case 'rightarrow':
          keyElement.innerHTML = iconForKey('keyboard_arrow_right');
          break;
        // Wide keys with icons
        case 'backspace':
          keyElement.classList.add('wide');
          keyElement.innerHTML = iconForKey('keyboard_backspace');
          break;
        case 'capslock':
          keyElement.classList.add('wide');
          keyElement.innerHTML = iconForKey('keyboard_capslock');
          keyElement.addEventListener('click', () => this.capsLockOn());
          break;
        case 'enter':
          keyElement.classList.add('wide');
          keyElement.innerHTML = iconForKey('keyboard_return');
          content = '\n';
          break;
        case 'leftshift':
        case 'rightshift':
          keyElement.classList.add('wide');
          keyElement.innerHTML = iconForKey('publish');
          break;
          // Ultrawide (spacebar)
        case 'spacebar':
          keyElement.classList.add('ultrawide');
          keyElement.innerHTML = iconForKey('space_bar');
          content = ' ';
          break;
        default:
          keyElement.classList.add('symbol');
          keyElement.innerHTML = key;
          content = keyElement.innerHTML;
          this.properties.value += (this.properties.isCapsLock) ? key.toUpperCase() : key.toLowerCase();
          break;
      }
      keyElement.addEventListener('click', () => this.mouseClick(content));

      keyboardFragment.append(keyElement);
    });
    return keyboardFragment;
  }

  mouseClick(content) {
    const con = (this.properties.isCapsLock) ? content.toUpperCase() : content;
    this.elements.textarea.textContent += con || '';
    this.elements.textarea.focus();
    this.elements.textarea.selectionStart = this.elements.textarea.value.length;
  }

  capsLockOn() {
    this.properties.isCapsLock = !this.properties.isCapsLock;
    const keys = this.elements.keyboardContainer.querySelectorAll('.symbol');
    /* eslint-disable no-return-assign, no-param-reassign */
    keys.forEach((key) => (key.textContent = this.properties.isCapsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()));
    /* eslint-enable no-return-assign, no-param-reassign */
  }

  render() {
    document.body.prepend(this.elements.main);
    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keyboardContainer);
    this.elements.keyboardContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keyboardContainer.querySelectorAll('.key');
  }

  toString() {
    return this.elements.keys;
  }
}
