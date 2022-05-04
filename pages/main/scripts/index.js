// import { KEYS } from './keys.js';
import { Header } from './header.js';
import { Main } from './main.js';

class Page {
  constructor() {
    this.header = null;
    this.main = null;
    // this.renderPage();
    this.keyDown = null;
    this.notRender = null;
  }

  /**
  * Создание секции body
  */
  renderPage() {
    const body = document.querySelector('body');

    this.header = new Header(body);
    this.main = new Main(body);
    // listener для нажатия кнопоки
    body.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = document.querySelector(`.key[data-code="${e.code}"]`);
      if (key) {
        this.main.keyboard.highLightButton(key);
        this.main.keyboard.writeKey(key);
        if (e.code === 'ControlLeft') {
          this.keyDown = 'ControlLeft';
        } else if (this.keyDown === 'ControlLeft' && e.code === 'AltLeft') {
          // переключение клавиатуры
          const doc = document.body.main;
          this.main.keyboard.changeLanguage(doc, this.main.keyboard.language, this.notRender);
          this.notRender = 1;
          this.main.keyboard.highLightButton(document.querySelector(`.key[data-code="${e.code}"]`));
          this.main.keyboard.highLightButton(document.querySelector(`.key[data-code="${this.keyDown}"]`));
        } else if (key.dataset.code === 'ShiftRight' || key.dataset.code === 'ShiftLeft') {
          // управление регистром
          this.main.keyboard.renderKeyboard(this.main.keyboard.blockNode, null, 'UP', this.main.keyboard.capsLockOn);
        } else if (key.dataset.code === 'CapsLock') {
          if (this.main.keyboard.capsLockOn === null) {
            this.main.keyboard.capsLockOn = true;
          } else {
            this.main.keyboard.capsLockOn = null;
          }
          const node = this.main.keyboard.blockNode;
          this.main.keyboard.renderKeyboard(node, null, null, this.main.keyboard.capsLockOn);
        }
      }
    });
    // listener для отжатия кнопоки
    body.addEventListener('keyup', (e) => {
      const key = document.querySelector(`.key[data-code="${e.code}"]`);
      if (key) {
        this.main.keyboard.highLightButtonOff(key);
        if (e.code === 'ControlLeft') {
          this.keyDown = null;
          this.notRender = null;
        }
        if (e.code === 'AltLeft') {
          this.notRender = null;
        }
        // управление регистром
        if (key.dataset.code === 'ShiftRight' || key.dataset.code === 'ShiftLeft') {
          this.main.keyboard.renderKeyboard(this.main.keyboard.blockNode, null, 'DOWN', this.main.keyboard.capsLockOn);
        }
      }
    });
  }
}

const page = new Page();
page.renderPage();
