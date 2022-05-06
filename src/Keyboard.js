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
      isShiftPressed: false,
      lang: 'en',
      cursorPosition: 0,
    };
    this.layouts = {
      en: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
        'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
        'leftshift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'uparrow', 'rightshift',
        'leftctrl', 'win', 'leftalt', 'spacebar', 'rightalt', 'leftarrow', 'downarrow', 'rightarrow', 'rightctrl',
      ],
      enShift: [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
        'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'del',
        'capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
        'leftshift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'uparrow', 'rightshift',
        'leftctrl', 'win', 'leftalt', 'spacebar', 'rightalt', 'leftarrow', 'downarrow', 'rightarrow', 'rightctrl',
      ],
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
    this.elements.textarea.setAttribute('cols', '62');

    this.elements.keyboardContainer = document.createElement('div');
    this.elements.keyboardContainer.classList.add('keyboard');
    this.elements.keys = this.elements.keyboardContainer.querySelectorAll('.key');

    this.render();
  }

  createKeys() {
    const keyboardFragment = document.createDocumentFragment();
    const keyLayout = this.layouts.en;

    const iconForKey = (iconName) => `<span class="material-icons">${iconName}</span>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('key');

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
          keyElement.classList.add('symbol');
          keyElement.textContent = '`';
          break;
        case 'tab':
          keyElement.innerHTML = iconForKey('keyboard_tab');
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
          break;
        case 'enter':
          keyElement.classList.add('wide');
          keyElement.innerHTML = iconForKey('keyboard_return');
          break;
        case 'leftshift':
        case 'rightshift':
          keyElement.classList.add('wide');
          keyElement.classList.add('shift');
          keyElement.innerHTML = iconForKey('publish');
          break;
          // Ultrawide (spacebar)
        case 'spacebar':
          keyElement.classList.add('ultrawide');
          keyElement.innerHTML = iconForKey('space_bar');
          break;
        default:
          keyElement.classList.add('symbol');
          keyElement.innerHTML = key;
          break;
      }
      keyElement.setAttribute('data-key', key);

      keyElement.addEventListener('click', (event) => this.mouseClick(event));

      keyboardFragment.append(keyElement);
    });
    return keyboardFragment;
  }

  chooseSymbol(symbol) {
    let res = (this.properties.isCapsLock)
      ? symbol.toUpperCase()
      : symbol;
    if (this.properties.isShiftPressed) {
      res = this.layouts.enShift[this.layouts.en.indexOf(symbol)];
    }
    return (this.properties.isCapsLock && this.properties.isShiftPressed) ? res.toLowerCase() : res;
  }

  reLoadKeys(nodes) {
    nodes.forEach((key) => {
      const el = key;
      el.textContent = this.chooseSymbol(el.dataset.key);
    });
  }

  mouseClick(event) {
    const content = event.currentTarget.dataset.key;
    const textArea = this.elements.textarea;
    let cursorPosition = textArea.selectionStart + 1;
    let [value, start, end] = [
      this.chooseSymbol(content),
      textArea.selectionStart,
      textArea.selectionEnd,
    ];
    switch (content) {
      case 'del':
        [value, end] = ['', textArea.selectionEnd + 1];
        break;
      case 'backspace':
        [value, start] = ['', textArea.selectionStart - 1];
        break;
      case 'enter':
        value = '\n';
        break;
      case 'tab':
        value = '\t';
        break;
      case 'spacebar':
        value = ' ';
        break;
      case 'capslock':
        event.currentTarget.classList.toggle('pressed');
        [value, cursorPosition] = ['', textArea.selectionStart];
        this.capsLockOn();
        break;
      case 'rightshift':
      case 'leftshift':
        [value, cursorPosition] = ['', textArea.selectionStart];
        this.shiftKeyOn(event.currentTarget);
        break;
      case 'leftctrl':
      case 'rightctrl':
      case 'leftalt':
      case 'rightalt':
      case 'win':
        [value, cursorPosition] = ['', textArea.selectionStart];
        break;
      case 'uparrow':
        value = '∧';
        break;
      case 'downarrow':
        value = '∨';
        break;
      case 'leftarrow':
        value = '<';
        break;
      case 'rightarrow':
        value = '>';
        break;
      default:
        break;
    }
    if (start >= 0) textArea.setRangeText(value, start, end);
    if (content === 'del' || content === 'backspace') {
      cursorPosition = textArea.selectionStart;
    }

    this.elements.textarea.focus();
    this.elements.textarea.selectionStart = cursorPosition;
  }

  capsLockOn() {
    this.properties.isCapsLock = !this.properties.isCapsLock;
    const keys = this.elements.keyboardContainer.querySelectorAll('.symbol');
    this.reLoadKeys(keys);
  }

  shiftKeyOn(node) {
    this.properties.isShiftPressed = !this.properties.isShiftPressed;
    const shifts = this.elements.keyboardContainer.querySelectorAll('.shift');
    const keys = this.elements.keyboardContainer.querySelectorAll('.symbol');
    if (this.properties.isShiftPressed) {
      node.classList.add('pressed');
    } else {
      shifts.forEach((key) => key.classList.remove('pressed'));
    }
    this.reLoadKeys(keys);
  }

  render() {
    document.body.prepend(this.elements.main);
    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keyboardContainer);
    this.elements.keyboardContainer.appendChild(this.createKeys());
  }

  toString() {
    return this.properties;
  }
}
