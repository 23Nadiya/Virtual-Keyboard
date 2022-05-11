class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      description: null,
      textarea: null,
      text: '',
      keyboard: null,
      keysCountainer: null,
      cursorPos: 0,
      keys: [],
    };

    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };

    this.propert = {
      value: '',
      shift: false,
      capsLock: false,
      lang: localStorage.getItem('lang'),
    };

    this.shiftRowSym = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
    this.shiftRow = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
    // prettier-ignore
    this.codes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'Done', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'Home', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
  }

  init() {
    // Create elements
    this.elements.main = document.createElement('div');
    this.elements.description = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    this.elements.textarea = document.createElement('div');
    this.elements.text = document.createElement('textarea');

    this.elements.keyboard = document.createElement('div');
    this.elements.keysCountainer = document.createElement('div');

    // Add classes
    this.elements.main.classList.add('main');
    this.elements.description.classList.add('description');
    this.elements.textarea.classList.add('textarea');
    this.elements.keyboard.classList.add('wrapper');
    this.elements.keysCountainer.classList.add('keyboard');

    document.body.appendChild(this.elements.main);
    document.body.appendChild(this.elements.description);

    p1.textContent = 'Made on Windows';
    p2.textContent = 'To change the language press: LeftShift-LeftAlt';

    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keyboard);

    this.elements.description.appendChild(p1);
    this.elements.description.appendChild(p2);
    this.elements.textarea.appendChild(this.elements.text);
    this.elements.keyboard.appendChild(this.elements.keysCountainer);
    this.elements.keysCountainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysCountainer.querySelectorAll('.key');
  }

  createKeys() {
    const fragment = document.createDocumentFragment();

    // prettier-ignore
    const keysLayout = this.propert.lang === 'ru' ? [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'delete',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'done', 'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'home', '←', '↓', '→',
    ] : [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'delete',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'done', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'home', '←', '↓', '→',
    ];

    // Creates HTML for an icon
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keysLayout.forEach((key, i) => {
      const keyElement = document.createElement('button');

      keyElement.classList.add('key');
      keyElement.setAttribute('type', 'button');

      keyElement.dataset.code = this.codes[keysLayout.indexOf(key, i)];

      const insertLineBreak = ['backspace', 'delete', 'enter', 'rshift'].indexOf(key) !== -1;
      // prettier-ignore
      const functionKey = ['`', 'tab', 'caps', 'done', 'shift', 'ctrl', 'backspace', 'delete', 'rshift', 'win', 'alt', 'home'].indexOf(key) !== -1;
      const arrows = ['↑', '←', '↓', '→'].indexOf(key) !== -1;
      const addWidth = ['delete', 'rshift'].indexOf(key) !== -1;

      switch (key) {
        case 'shift':
          keyElement.classList.add('function-key');
          keyElement.innerHTML = 'shift';

          this.pressedShift();
          break;

        case 'backspace':
          keyElement.classList.add('backspace');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            // prettier-ignore
            this.propert.value = this.propert.value.substring(0, this.propert.value.length - 1);
            this.triggerEvent('oninput');
          });
          break;

        case 'delete':
          keyElement.classList.add('delete');
          keyElement.innerHTML = 'delete';
          keyElement.addEventListener('click', () => {
            const cursorEnd = this.elements.text.selectionEnd;
            const arr = this.propert.value.split('');
            arr.splice(cursorEnd, 1);
            this.propert.value = arr.join('');
            this.triggerEvent('oninput');
          });
          break;

        case 'caps':
          keyElement.classList.add('caps');
          keyElement.innerHTML = 'caps';

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('capslock-active', this.propert.capsLock);
          });
          break;

        case 'enter':
          keyElement.classList.add('enter');
          keyElement.innerHTML = 'enter';

          keyElement.addEventListener('click', () => {
            this.propert.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'tab':
          keyElement.classList.add('tab');
          keyElement.innerHTML = 'tab';

          keyElement.addEventListener('click', () => {
            this.propert.value += '\t';
            this.triggerEvent('oninput');
          });
          break;

        case 'space':
          keyElement.classList.add('space');
          keyElement.innerHTML = 'space';

          keyElement.addEventListener('click', () => {
            this.propert.value += ' ';
            this.triggerEvent('oninput');
          });
          break;

        case 'ctrl':
          keyElement.innerHTML = 'ctrl';
          keyElement.addEventListener('click', () => {
            this.propert.value += '';
            this.triggerEvent('oninput');
          });
          break;

        case 'win':
          keyElement.innerHTML = 'win';
          keyElement.addEventListener('click', () => {
            this.propert.value += '';
            this.triggerEvent('oninput');
          });
          break;

        case 'alt':
          keyElement.innerHTML = 'alt';
          keyElement.addEventListener('click', () => {
            this.propert.value += '';
            this.triggerEvent('oninput');
          });
          break;

        case 'home':
          keyElement.innerHTML = 'home';
          keyElement.addEventListener('click', () => {
            this.propert.value += '';
            this.triggerEvent('oninput');
          });
          break;

        case 'rshift':
          keyElement.innerHTML = 'rshift';
          keyElement.addEventListener('click', () => {
            this.propert.value += '';
            this.pressedShift();
            this.triggerEvent('oninput');
          });
          break;

        case 'done':
          keyElement.classList.add('done');
          keyElement.innerHTML = 'done';

          keyElement.addEventListener('click', () => {
            this.close();
            this.triggerEvent('onclose');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.propert.value += this.propert.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }

      if (functionKey) {
        keyElement.classList.add('function-key');
      }

      if (arrows) {
        keyElement.classList.add('arrow');
      }

      if (addWidth) {
        keyElement.classList.add('ch-dwidth');
      }
    });
    return fragment;
  }

  changeLang() {
    // prettier-ignore
    const langs = this.propert.lang === 'ru' ? [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'delete',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'done', 'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'home', '←', '↓', '→',
    ] : [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'delete',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'done', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'home', '←', '↓', '→',
    ];

    const keys = document.querySelectorAll('.key');

    keys.forEach((key, i) => {
      const changedKey = key;

      if (key.textContent !== 'backspace') {
        changedKey.innerHTML = langs[i];
      }
    });
    localStorage.setItem('lang', this.propert.lang);
  }

  pressedShift() {
    this.propert.shift = true;
  }

  unpressedShift() {
    this.propert.shift = false;
  }

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'object') {
      this.elements.text.value = this.propert.value;
      this.elements.cursorPos = this.propert.value.length;
      // let cursorStart = this.elements.text.selectionStart;
      // let cursorEnd = this.elements.text.selectionEnd;
      this.elements.text.focus();
    }
  }

  toggleCapsLock() {
    this.propert.capsLock = !this.propert.capsLock;

    for (let i = 0; i < this.elements.keys.length; i += 1) {
      if (this.elements.keys[i].childElementCount === 0) {
        this.elements.keys[i].textContent = this.propert.capsLock
          ? this.elements.keys[i].textContent.toUpperCase()
          : this.elements.keys[i].textContent.toLowerCase();
      }
    }
  }

  open(initialValue, oninput, onclose) {
    this.propert.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.keysCountainer.classList.remove('keyboard-hidden');
  }

  close() {
    this.propert.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.keysCountainer.classList.add('keyboard-hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const newKeyboard = new Keyboard();
  newKeyboard.init();

  document.addEventListener('mouseup', () => {
    if (newKeyboard.propert.shift) {
      newKeyboard.unpressedShift();
    }
  });

  window.addEventListener('keydown', (event) => {
    const keysVirt = document.querySelectorAll('.key');
    const dataAttrs = document.querySelectorAll('[data-code]');
    const textareaEl = document.getElementsByTagName('textarea');

    const key = event.code;
    textareaEl[0].focus();

    if (key === 'Delete') {
      const cursorEnd = newKeyboard.elements.text.selectionEnd;
      const arr = newKeyboard.propert.value.split('');
      arr.splice(cursorEnd, 1);
      newKeyboard.propert.value = arr.join('');
      newKeyboard.triggerEvent('oninput');
    } else if (key === 'Enter') {
      newKeyboard.propert.value += '\n';
    }

    if (event.shiftKey && event.altKey) {
      if (newKeyboard.propert.lang === 'en') {
        newKeyboard.propert.lang = 'ru';
        newKeyboard.changeLang();
      } else {
        newKeyboard.propert.lang = 'en';
        newKeyboard.changeLang();
      }
    }

    if (key === 'CapsLock') {
      if (newKeyboard.propert.capsLock === false) {
        newKeyboard.propert.capsLock = true;
        keysVirt.forEach((elem) => {
          const value = elem;
          if (elem.textContent !== 'backspace') {
            value.innerHTML = elem.textContent.toUpperCase();
          }
        });
      } else {
        newKeyboard.propert.capsLock = false;
        keysVirt.forEach((elem) => {
          const value = elem;
          if (elem.textContent !== 'backspace') {
            value.innerHTML = elem.textContent.toLowerCase();
          }
        });
      }
    }

    dataAttrs.forEach((elem, i) => {
      if (elem.dataset.code === key) {
        keysVirt[i].classList.add('active-key');

        if (keysVirt[i].textContent.length === 1) {
          newKeyboard.propert.value += keysVirt[i].textContent;
        }
        setTimeout(() => {
          keysVirt[i].classList.remove('active-key');
        }, 300);
      }
    });
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
      newKeyboard.unpressedShift();
    }
  });
});
