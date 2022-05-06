class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      description: null,
      textarea: null,
      text: null,
      keyboard: null,
      keysCountainer: null,
      codes: null,
      keys: [],
    };

    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };

    this.propert = {
      value: '',
      capsLock: false,
      lang: localStorage.getItem('lang'),
    };
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
    p2.textContent = 'To change the language press: Shift-Alt';

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

    // prettier-ignore
    this.codes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'Done', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'Home', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

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
            this.propert.value = this.propert.value.substring(0, 0);
            this.triggerEvent('oninput');
          });
          break;

        case 'caps':
          keyElement.classList.add('caps');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('capslock-active', this.propert.capsLock);
          });
          break;

        case 'enter':
          keyElement.classList.add('enter');
          keyElement.innerHTML = createIconHTML('keyboard_return');

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
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.propert.value += ' ';
            this.triggerEvent('oninput');
          });
          break;

        case 'done':
          keyElement.classList.add('done-key');
          keyElement.innerHTML = createIconHTML('check_circle');

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

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'object') {
      this.elements.text.value = this.propert.value;
      //  console.log('test1', this.propert.value);
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

  window.addEventListener('keydown', (event) => {
    const keysVirt = document.querySelectorAll('.key');
    const dataAttrs = document.querySelectorAll('[data-code]');
    const textareaEl = document.getElementsByTagName('textarea');

    const key = event.code;
    textareaEl[0].focus();

    dataAttrs.forEach((elem, i) => {
      if (elem.dataset.code === key) {
        keysVirt[i].classList.add('active-key');

        switch (elem.dataset.code) {
          case 'Backspace':
            // prettier-ignore
            // newKeyboard.propert.value = newKeyboard.propert.value.length - 1;
            break;

          default:
            break;
        }

        if (keysVirt[i].textContent.length === 1) {
          newKeyboard.propert.value += keysVirt[i].textContent;
          // console.log('test2', newKeyboard.propert.value);
        }
        setTimeout(() => {
          keysVirt[i].classList.remove('active-key');
        }, 300);
      }
    });
  });
});
