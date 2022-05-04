'use strict'
import { KEYS } from './keys.js';

class Page {
	constructor() {
		this.header = null;
		this.main = null;
		this.renderPage();
		this.keyDown = null;
		this.notRender = null;
	}
	/**
	 * Создание секции body
	 */
	renderPage() {
		let body = document.querySelector('body');

		this.header = new Header(body);
		this.main = new Main(body);
		// listener для нажатия кнопоки
		body.addEventListener('keydown', (e) => {
			e.preventDefault();
			let key = document.querySelector(`.key[data-code="${e.code}"]`);
			if (key) {
				this.main.keyboard.highLightButton(key);
				this.main.keyboard.writeKey(key);
				if (e.code === 'ControlLeft') {
					this.keyDown = 'ControlLeft';
				} else if (this.keyDown === 'ControlLeft' && e.code === 'AltLeft') {
					//переключение клавиатуры
					this.main.keyboard.changeLanguage(document.body.main, this.main.keyboard.language, this.notRender);
					this.notRender = 1;
					this.main.keyboard.highLightButton(document.querySelector(`.key[data-code="${e.code}"]`));
					this.main.keyboard.highLightButton(document.querySelector(`.key[data-code="${this.keyDown}"]`));
				} else if (key.dataset.code === 'ShiftRight' || key.dataset.code === 'ShiftLeft') {
					//управление регистром
					this.main.keyboard.renderKeyboard(this.main.keyboard.blockNode, null, 'UP', this.main.keyboard.capsLockOn);
				} else if (key.dataset.code === 'CapsLock') {
					if (this.main.keyboard.capsLockOn === null) {
						this.main.keyboard.capsLockOn = true;
					} else {
						this.main.keyboard.capsLockOn = null;
					}
					this.main.keyboard.renderKeyboard(this.main.keyboard.blockNode, null, null, this.main.keyboard.capsLockOn);
				}
			}
		})
		// listener для отжатия кнопоки
		body.addEventListener('keyup', (e) => {
			//	console.log(e);
			let key = document.querySelector(`.key[data-code="${e.code}"]`);
			if (key) {
				this.main.keyboard.highLightButtonOff(key);
				if (e.code === 'ControlLeft') {
					this.keyDown = null;
					this.notRender = null;
				}
				if (e.code === 'AltLeft') {
					this.notRender = null;
				}
				//управление регистром
				if (key.dataset.code === 'ShiftRight' || key.dataset.code === 'ShiftLeft') {
					this.main.keyboard.renderKeyboard(this.main.keyboard.blockNode, null, 'DOWN', this.main.keyboard.capsLockOn);
				}

			}
		})
	}
}

class Header {
	constructor(blockNode) {
		this.renderHeader(blockNode);
	}
	/**
	 * Создание секции header
	 * @param {*} blockNode нода в которую вложен блок header
	 */
	renderHeader(blockNode) {
		let headerHtml = `<header class="conteiner">
							<h1 class='Head-page'>Virtual Keyboard</h1>
							</header>`;
		blockNode.insertAdjacentHTML('beforeend', headerHtml);
	}
}

class Main {
	constructor(blockNode) {
		this.textArea = null;
		this.keyboard = null;
		this.ruEnSwitchInfo = null;
		this.renderMain(blockNode);
	}
	/**
	 * Создание секции main
	 * @param {*} blockNode нода в которую вложен блок main
	 */
	renderMain(blockNode) {
		let element = document.createElement("main")
		element.classList.add('conteiner');
		blockNode.append(element);
		this.textArea = new TextArea(element);
		this.keyboard = new Keyboard(element, this.textArea);
		this.ruEnSwitchInfo = new RuEnSwitchInfo(element, this.keyboard.language);
		this.keyboard.ruEnSwitchInfo = this.ruEnSwitchInfo;
	}
}

class TextArea {
	constructor(blockNode) {
		this.node = null;
		this.renderTextArea(blockNode);
	}
	/**
	 * Создание секции main textarea
	 * @param {*} blockNode нода в которую вложен блок textarea
	 */
	renderTextArea(blockNode) {
		let textAreaHtml = `<textarea class="display-area" name="display-text" id="display-text" cols="30" rows="10" ></textarea>`;
		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
		this.node = blockNode.querySelector('textarea');
	}
}

class Keyboard {
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
			let target = e.target;
			if (target.classList.contains('key')) {
				this.changeLanguage(blockNode, target.innerText);
			}
		});
		//listener on mousedown
		blockNode.addEventListener('mousedown', (e) => {
			let target = e.target;
			this.highLightButton(target);
			//отрисовка нажатой кнопки в textArea
			this.writeKey(target);
			//управление регистром
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
		//выключение эфекта нажатия listener on mouseup
		blockNode.addEventListener('mouseup', (e) => {
			let target = e.target;
			this.highLightButtonOff(target);
			//управление регистром
			if (target.dataset.code === 'ShiftRight' || target.dataset.code === 'ShiftLeft' /*|| target.dataset.code === 'CapsLock'*/) {
				this.renderKeyboard(this.blockNode, null, 'DOWN', this.capsLockOn)
			};
		});
		//выключение эфекта нажатия listener on mouseout, если нажали и переместили курср с кнопки
		blockNode.addEventListener('mouseout', (e) => {
			let target = e.target;
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
			let element = document.createElement("div")
			element.classList.add('keyboard');
			blockNode.append(element);
			this.blockNode = element;
			for (let i = 0; i < KEYS.length; i++) {
				const key = new Key(KEYS[i], this.blockNode, language);
				this.keys.push(key);
			}
		} else {
			//смена языка
			if (language) {
				for (let i = 0; i < this.keys.length; i++) {
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
				//верхний регистр
			} else {
				//по Shift
				if (shift === 'UP') {
					for (let i = 0; i < this.keys.length; i++) {
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
					for (let i = 0; i < this.keys.length; i++) {
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
					for (let i = 0; i < this.keys.length; i++) {
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
			if (key.dataset.code != 'CapsLock') {
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
		let textAreaStart = this.textArea.node.selectionStart;
		if (key.classList.contains('key')) {
			if (key.classList.contains('changeableLanguage') || key.classList.contains('changeableShit')) {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart) + key.innerText + this.textArea.node.value.substring(textAreaStart);
				this.textArea.node.selectionStart = this.textArea.node.selectionEnd = textAreaStart + 1;
			} else if (key.dataset.code.startsWith('Arrow')) {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart) + key.innerText + this.textArea.node.value.substring(textAreaStart);
				this.textArea.node.selectionStart = this.textArea.node.selectionEnd = textAreaStart + 1;
			} else if (key.dataset.code === 'Backspace' && textAreaStart > 0) {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart - 1) + this.textArea.node.value.substring(textAreaStart);
				this.textArea.node.selectionStart = textAreaStart - 1;
				this.textArea.node.selectionEnd = textAreaStart - 1;

				console.log('B = ' + this.textArea.node.selectionStart);
				console.log('B = ' + this.textArea.node);
			} else if (key.dataset.code === 'Delete') {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart) + this.textArea.node.value.substring(textAreaStart + 1);
				this.textArea.node.selectionStart = this.textArea.node.selectionEnd = textAreaStart;
			} else if (key.dataset.code === 'Tab') {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart) + "\t" + this.textArea.node.value.substring(textAreaStart);
				this.textArea.node.selectionStart = this.textArea.node.selectionEnd = textAreaStart + 1;
			} else if (key.dataset.code === 'Enter') {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart) + "\n" + this.textArea.node.value.substring(textAreaStart);
				this.textArea.node.selectionStart = this.textArea.node.selectionEnd = textAreaStart + 1;
			} else if (key.dataset.code === 'Space') {
				this.textArea.node.value = this.textArea.node.value.substring(0, textAreaStart) + " " + this.textArea.node.value.substring(textAreaStart);
				this.textArea.node.selectionStart = this.textArea.node.selectionEnd = textAreaStart + 1;
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

class Key {
	constructor(key, blockNode, language) {
		this.name = key.name;
		this.name_eng = key.name_eng;
		this.name_ru = key.name_ru;
		this.with_type = key.with_type;
		this.shift = key.shift;
		this.shift_eng = key.shift_eng;
		this.shift_ru = key.shift_ru;
		this.code = key.code;
		this.changeableLanguage = key.changeableLanguage;
		this.changeableShit = key.changeableShit;

		this.node = null;
		this.renderKey(blockNode, language);
	}
	/**
	 * отрисовка кнопки клавиатуры
	 * @param {*} blockNode нода блока где располагается клавиша
	 * @param {*} language язык клавиатуры (RU или ENG)
	 */
	renderKey(blockNode, language) {
		let sign = '';
		let textAreaHtml = '';
		if (language === 'ENG') {
			sign = this.name_eng;
		} else if (language === 'RU') {
			sign = this.name_ru;
		}

		if (sign === undefined) {
			sign = this.name;
		}

		if (this.changeableLanguage) {
			textAreaHtml = `<div class="key ${this.with_type} changeableLanguage" data-code="${this.code}">${sign}</div>`;
		} else if (this.changeableShit) {
			textAreaHtml = `<div class="key ${this.with_type} changeableShit" data-code="${this.code}">${sign}</div>`;
		} else {
			textAreaHtml = `<div class="key ${this.with_type} " data-code="${this.code}">${sign}</div>`;
		}

		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
		this.node = blockNode.querySelector(`.key[data-code="${this.code}"]`);
	}
}

class RuEnSwitchInfo {
	constructor(blockNode, language) {
		this.htmlText = null;
		this.renderRuEnSwitchInfo(blockNode, language);
	}
	/**
	 * СОтрисовка подсказки внизу страницы
	 * @param {*} blockNode нода блока где располагается подксказка по переключению
	 * @param {*} language 
	 */
	renderRuEnSwitchInfo(blockNode, language) {
		let element = document.createElement("div")
		element.classList.add('ru-en-switch-info');
		blockNode.append(element);
		this.htmlText = element;
		this.changeText(language);
	}
	/**
	 * Смена текста в подсказке внизу страницы
	 * @param {*} language выбрынный язык (RU или ENG)
	 */
	changeText(language) {
		this.htmlText.innerHTML = '';
		this.htmlText.innerHTML = `<p>Клавиатура создана в операционной системе Windiws</p>
									<p>Для переключения клавиатуры используйте клавишу ${language} на клавиатуре</p>
									<p>Или комбинацию: левыe Crl + Alt</p>`;

	}
}

const page = new Page();