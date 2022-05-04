import { KEYS } from './keys.js';
import { Key } from './key.js';

export class Keyboard {
  constructor(blockNode, textArea) {
    this.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'ENG';
    if (this.language === 'null') {
      this.language = 'ENG';
    }
    this.keys = [];
    this.blockNode = null;
    this.ruEnSwitchInfo = null;
    this.textArea = textArea;
    this.capsLockOn = null;

    this.renderKeyboard(blockNode, this.language);
    blockNode.addEventListener('click', (e) => {
      const { target } = e;
      if (target.classList.contains('key')) {
        this.changeLanguage(blockNode, target.innerText);
      }
    });
    // listener on mousedown
    blockNode.addEventListener('mousedown', (e) => {
      const { target } = e;
      this.highLightButton(target);
      // отрисовка нажатой кнопки в textArea
      this.writeKey(target);
      // управление регистром
      if (target.dataset.code === 'ShiftRight' || target.dataset.code === 'ShiftLeft') {
        this.renderKeyboard(this.blockNode, null, 'UP', this.capsLockOn);
      }
      if (target.dataset.code === 'CapsLock') {
        if (this.capsLockOn === null) {
          this.capsLockOn = true;
        } else {
          this.capsLockOn = null;
        }
        this.renderKeyboard(this.blockNode, null, null, this.capsLockOn);
      }
    });
    // выключение эфекта нажатия listener on mouseup
    blockNode.addEventListener('mouseup', (e) => {
      const { target } = e;
      this.highLightButtonOff(target);
      // управление регистром
      if (target.dataset.code === 'ShiftRight' || target.dataset.code === 'ShiftLeft') {
        this.renderKeyboard(this.blockNode, null, 'DOWN', this.capsLockOn);
      }
    });
    // выключение эфекта нажатия listener on mouseout, если нажали и переместили курср с кнопки
    blockNode.addEventListener('mouseout', (e) => {
      const { target } = e;
      this.highLightButtonOff(target);
    });
  }

  /**
   * Отрисовка клавиатуры div с классом keyboard
   * @param {*} blockNode нода в которую вложен блок div с классом keyboard
   * @param {*} language язык клавиатуры (RU или ENG)
   * @param {*} shift нажаниие или отжание Shift (UP или DOWN)
   * @param {*} capsOn признак включени CapsLock (true или null)
   */
  renderKeyboard(blockNode, language, shift, capsOn) {
    if (this.blockNode === null) {
      const element = document.createElement('div');
      element.classList.add('keyboard');
      blockNode.append(element);
      this.blockNode = element;
      for (let i = 0; i < KEYS.length; i += 1) {
        const key = new Key(KEYS[i], this.blockNode, language);
        this.keys.push(key);
      }
    } else if (language) {
      // смена языка
      for (let i = 0; i < this.keys.length; i += 1) {
        if (this.keys[i].changeableLanguage) {
          let sign = '';
          if (language === 'ENG') {
            sign = this.keys[i].name_eng;
          } else if (language === 'RU') {
            sign = this.keys[i].name_ru;
          }
          if (sign === undefined) {
            sign = this.keys[i].name;
          }
          this.keys[i].node.innerText = sign;
        }
      }
      // верхний регистр
    } else if (shift === 'UP') {
      // по Shift
      for (let i = 0; i < this.keys.length; i += 1) {
        if (this.keys[i].changeableShit && this.keys[i].code) {
          let sign = '';
          if (this.keys[i].shift) {
            sign = this.keys[i].shift;
          } else if (this.language === 'ENG') {
            sign = this.keys[i].shift_eng;
          } else if (this.language === 'RU') {
            sign = this.keys[i].shift_ru;
          }
          if (sign === undefined) {
            if (capsOn) {
              sign = this.keys[i].node.innerText.toLowerCase();
            } else {
              sign = this.keys[i].node.innerText.toUpperCase();
            }
          }
          this.keys[i].node.innerText = sign;
        }
      }
    } else if (shift === 'DOWN') {
      for (let i = 0; i < this.keys.length; i += 1) {
        if (this.keys[i].changeableShit && this.keys[i].code) {
          let sign = '';
          if (this.keys[i].name) {
            sign = this.keys[i].name;
          } else if (this.language === 'ENG') {
            sign = this.keys[i].name_eng;
            if (capsOn) {
              sign = sign.toUpperCase();
            } else {
              sign = sign.toLowerCase();
            }
          } else if (this.language === 'RU') {
            sign = this.keys[i].name_ru;
            if (capsOn) {
              sign = sign.toUpperCase();
            } else {
              sign = sign.toLowerCase();
            }
          }
          if (sign === undefined) {
            if (capsOn) {
              sign = this.keys[i].node.innerText.toUpperCase();
            } else {
              sign = this.keys[i].node.innerText.toLowerCase();
            }
          }
          this.keys[i].node.innerText = sign;
        }
      }
    } else if (shift === null) {
      for (let i = 0; i < this.keys.length; i += 1) {
        if (this.keys[i].changeableLanguage && this.keys[i].code) {
          if (capsOn) {
            this.keys[i].node.innerText = this.keys[i].node.innerText.toUpperCase();
          } else {
            this.keys[i].node.innerText = this.keys[i].node.innerText.toLowerCase();
          }
        }
      }
    }
  }

  /**
   * включение эфекта нажатия
   * @param {*} key нажатая кнопка
   */
  highLightButton(key) {
    if (key.classList.contains('key')) {
      if (key.dataset.code === 'CapsLock') {
        key.classList.toggle('key-pres');
      } else {
        key.classList.add('key-pres');
      }
    }
  }

  /**
   * выключение эфекта нажатия
   * @param {*} key отжататя кнопка
   */
  highLightButtonOff(key) {
    if (key.classList.contains('key')) {
      if (key.dataset.code !== 'CapsLock') {
        key.classList.remove('key-pres');
      }
    }
  }

  /**
   * отрисовка нажатой кнопки в textArea
   * @param {*} key нажатая кнопка
   */
  writeKey(key) {
    this.textArea.node.focus();
    const textAreaStart = this.textArea.node.selectionStart;
    const subText = this.textArea.node.value.substring(0, textAreaStart);
    const subTextEnd = this.textArea.node.value.substring(textAreaStart);
    const subText1 = this.textArea.node.value.substring(0, textAreaStart - 1);
    if (key.classList.contains('key') && (key.dataset.code !== 'undefined')) {
      if (key.classList.contains('changeableLanguage') || key.classList.contains('changeableShit')) {
        this.textArea.node.value = subText + key.innerText + subTextEnd;
        this.textArea.node.selectionStart = textAreaStart + 1;
        this.textArea.node.selectionEnd = textAreaStart + 1;
      } else if (key.dataset.code.startsWith('Arrow')) {
        this.textArea.node.value = subText + key.innerText + subTextEnd;
        this.textArea.node.selectionStart = textAreaStart + 1;
        this.textArea.node.selectionEnd = textAreaStart + 1;
      } else if (key.dataset.code === 'Backspace' && textAreaStart > 0) {
        this.textArea.node.value = subText1 + subTextEnd;
        this.textArea.node.selectionStart = textAreaStart - 1;
        this.textArea.node.selectionEnd = textAreaStart - 1;
      } else if (key.dataset.code === 'Delete') {
        this.textArea.node.value = subText + this.textArea.node.value.substring(textAreaStart + 1);
        this.textArea.node.selectionStart = textAreaStart;
        this.textArea.node.selectionEnd = textAreaStart;
      } else if (key.dataset.code === 'Tab') {
        this.textArea.node.value = `${subText}\t${subTextEnd}`;
        this.textArea.node.selectionStart = textAreaStart + 1;
        this.textArea.node.selectionEnd = textAreaStart + 1;
      } else if (key.dataset.code === 'Enter') {
        this.textArea.node.value = `${subText}\n${subTextEnd}`;
        this.textArea.node.selectionStart = textAreaStart + 1;
        this.textArea.node.selectionEnd = textAreaStart + 1;
      } else if (key.dataset.code === 'Space') {
        this.textArea.node.value = `${subText} ${subTextEnd}`;
        this.textArea.node.selectionStart = textAreaStart + 1;
        this.textArea.node.selectionEnd = textAreaStart + 1;
      }
    }
  }

  /**
   * переключение клавиатуры
   * @param {*} keyboard нода блока где располагается клавиатура
   * @param {*} language язык клавиатуры (RU или ENG)
   * @param {*} render начальное заполнение или перерисовка
   */
  changeLanguage(keyboard, language, render) {
    if (!render) {
      if (language === 'ENG') {
        this.renderKeyboard(keyboard, 'RU');
        localStorage.setItem('language', 'RU');
        this.language = 'RU';
        this.ruEnSwitchInfo.changeText('RU');
      } else if (language === 'RU') {
        this.renderKeyboard(keyboard, 'ENG');
        localStorage.setItem('language', 'ENG');
        this.language = 'ENG';
        this.ruEnSwitchInfo.changeText('ENG');
      }
    }
  }
}
