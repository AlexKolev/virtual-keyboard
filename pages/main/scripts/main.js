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
	renderPage() {
		let body = document.querySelector('body');

		this.header = new Header(body);
		this.main = new Main(body);
		// listener для нажатия кнопоки
		body.addEventListener('keydown', (e) => {
			//console.log(e);
			e.preventDefault();
			let key = document.querySelector(`.key[data-code="${e.code}"]`);
			//console.log(key);
			if (key) {
				this.main.keyboard.highLightButton(key);
				if (e.code === 'ControlLeft') {
					this.keyDown = 'ControlLeft';
				} else if (this.keyDown === 'ControlLeft' && e.code === 'AltLeft') {
					//переключение клавиатуры
					this.main.keyboard.changeLanguage(document.body.main, this.main.keyboard.language, this.notRender);
					this.notRender = 1;
					// if (this.main.keyboard.language === 'ENG') {
					// 	this.main.keyboard.renderKeyboard(document.body.main, 'RU');
					// 	localStorage.setItem('language', 'RU');
					// 	this.main.keyboard.language = 'RU';
					// 	this.main.ruEnSwitchInfo.changeText('RU');
					// } else if (this.main.keyboard.language === 'RU') {
					// 	this.main.keyboard.renderKeyboard(document.body.main, 'ENG');
					// 	localStorage.setItem('language', 'ENG');
					// 	this.main.keyboard.language = 'ENG';
					// 	this.main.ruEnSwitchInfo.changeText('ENG');
					// }
					//end переключение клавиатуры
					//console.log(e.code);
					this.main.keyboard.highLightButton(document.querySelector(`.key[data-code="${e.code}"]`));
					this.main.keyboard.highLightButton(document.querySelector(`.key[data-code="${this.keyDown}"]`));
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

			}
		})
	}
}

class Header {
	constructor(blockNode) {
		this.renderHeader(blockNode);
	}
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
	renderMain(blockNode) {
		let element = document.createElement("main")
		element.classList.add('conteiner');
		blockNode.append(element);
		this.textArea = new TextArea(element);
		this.keyboard = new Keyboard(element);
		this.ruEnSwitchInfo = new RuEnSwitchInfo(element);
		this.keyboard.ruEnSwitchInfo = this.ruEnSwitchInfo;
	}
}

class TextArea {
	constructor(blockNode) {
		this.renderTextArea(blockNode);
	}
	renderTextArea(blockNode) {
		let textAreaHtml = `<textarea class="display-area" name="display-text" id="display-text" cols="30" rows="10" ></textarea>`;
		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
	}
}

class Keyboard {
	constructor(blockNode, main) {
		this.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'ENG';
		this.keys = [];
		this.blockNode = null;
		this.ruEnSwitchInfo = null;
		this.renderKeyboard(blockNode, this.language);
		blockNode.addEventListener('click', (e) => {
			let target = e.target;
			if (target.classList.contains('key')) {
				this.changeLanguage(blockNode, target.innerText);
				//console.log(target.innerText);
				//переключение клавиатуры
				// if (target.innerText === 'ENG') {
				// 	this.renderKeyboard(blockNode, 'RU');
				// 	localStorage.setItem('language', 'RU');
				// 	this.language = 'RU';
				// 	this.main.ruEnSwitchInfo.changeText('RU');
				// } else if (target.innerText === 'RU') {
				// 	this.renderKeyboard(blockNode, 'ENG');
				// 	localStorage.setItem('language', 'ENG');
				// 	this.language = 'ENG';
				// 	this.main.ruEnSwitchInfo.changeText('RU');
				// }
				//end переключение клавиатуры
			}
		});
		//listener on mousedown
		blockNode.addEventListener('mousedown', (e) => {
			let target = e.target;
			this.highLightButton(target);
		});
		//выключение эфекта нажатия listener on mouseup
		blockNode.addEventListener('mouseup', (e) => {
			let target = e.target;
			this.highLightButtonOff(target);
		});
		//выключение эфекта нажатия listener on mouseout, если нажали и переместили курср с кнопки
		blockNode.addEventListener('mouseout', (e) => {
			let target = e.target;
			this.highLightButtonOff(target);
		});
	}
	renderKeyboard(blockNode, language) {
		if (this.blockNode === null) {
			let element = document.createElement("div")
			element.classList.add('keyboard');
			blockNode.append(element);
			this.blockNode = element;
		} else {
			this.blockNode.innerHTML = '';
			this.keys = [];
		}

		for (let i = 0; i < KEYS.length; i++) {
			const key = new Key(KEYS[i], this.blockNode, language);
			this.keys.push(key);
		}
	}
	//включение эфекта нажатия
	highLightButton(key) {
		if (key.classList.contains('key')) {
			//console.log('mousedown ' + target.innerText);
			if (key.innerText === 'Caps Lock') {
				key.classList.toggle('key-pres');;
			} else {
				key.classList.add('key-pres');
			}
		}
	}
	//выключение эфекта нажатия
	highLightButtonOff(key) {
		if (key.classList.contains('key')) {
			if (key.innerText != 'Caps Lock') {
				key.classList.remove('key-pres');
			}
		}
	}
	//переключение клавиатуры
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

		this.renderKey(blockNode, language);
	}
	renderKey(blockNode, language) {
		let sign = '';
		if (language === 'ENG') {
			sign = this.name_eng;
		} else if (language === 'RU') {
			sign = this.name_ru;
		}

		if (sign === undefined) {
			sign = this.name;
		}
		let textAreaHtml = `<div class="key ${this.with_type}" data-code="${this.code}">${sign}</div>`;
		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
	}
}

class RuEnSwitchInfo {
	constructor(blockNode) {
		this.htmlText = null;
		this.renderRuEnSwitchInfo(blockNode);
	}
	renderRuEnSwitchInfo(blockNode) {
		let textAreaHtml = `<div class="ru-en-switch-info">
								<p>Клавиатура создана в операционной системе Windiws</p>
								<p>Для переключения клавиатуры используйте клавишу ENG на клавиатуре</p>
								<p>Или комбинацию: левыe Crl + Alt</p>
							</div>`;
		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
		this.htmlText = blockNode.querySelector('.ru-en-switch-info');
	}
	changeText(language) {
		this.htmlText.innerHTML = '';
		this.htmlText.innerHTML = `<p>Клавиатура создана в операционной системе Windiws</p>
									<p>Для переключения клавиатуры используйте клавишу ${language} на клавиатуре</p>
									<p>Или комбинацию: левыe Crl + Alt</p>`;

	}
}

const page = new Page();

// page.main.keyboard.renderKeyboard(page.main.keyboard.blockNode, 'RU');

//localStorage.setItem('language', 'ENG');
// let language = localStorage.getItem('language')