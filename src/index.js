class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      description: null,
      textarea: null,
      keyboard: null,
      keysCountainer: null,
      keys: [],
    };

    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };

    this.propert = {
      value: '',
      capsLock: false,
    };
  }

  init() {
    // Create elements
    this.elements.main = document.createElement('div');
    this.elements.description = document.createElement('div');

    this.elements.textarea = document.createElement('div');
    const text = document.createElement('textarea');

    this.elements.keyboard = document.createElement('div');
    this.elements.keysCountainer = document.createElement('div');

    // Add classes
    this.elements.main.classList.add('main');
    this.elements.description.classList.add('description');
    this.elements.keyboard.classList.add('wrapper');
    this.elements.keysContainer.classList.add('keyboard-container');

    // this.elements.keys = this.elements.keysCountainer.querySelectorAll('.keyboard-key');

    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.description);
    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keyboard);

    this.elements.description.appendChild(text);
    this.elements.keyboard.appendChild(this.elements.keysCountainer);
    this.elements.keysCountainer.appendChild(this.createKeys());
  }

  createKeys() {
    const fragment = document.createDocumentFragment();

    // prettier-ignore
    const keysLayout = this.properties.language === 'ru' ? [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'delete',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'home', '←', '↓', '→', 'end',
    ] : [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'delete',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'home', '←', '↓', '→', 'end',
    ];

    // Creates HTML for an icon
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keysLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      keyElement.classList.add('key');
      keyElement.setAttribute('type', 'button');

      const insertLineBreak = ['backspace', 'delete', 'enter', 'rshift', 'end'].indexOf(key) !== -1;

      switch (key) {
        case 'backspace':
          keyElement.classList.add('backspace');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            // prettier-ignore
            this.propert.value = this.propert.value.substring(0, this.propert.value.length - 1);
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
    });
    return fragment;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const newKeyboard = new Keyboard();
});
