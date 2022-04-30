'use strict'
import { KEYS } from './keys.js';

class Page {
	constructor() {
		this.header = null;
		this.main = null;
		this.renderPage();
	}
	renderPage() {
		let body = document.querySelector('body');
		this.header = new Header(body);
		this.main = new Main(body);
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
	}
}

class TextArea {
	constructor(blockNode) {
		this.renderTextArea(blockNode);
	}
	renderTextArea(blockNode) {
		let textAreaHtml = `<textarea class="display-area" name="display-text" id="display-text" cols="30" rows="10"></textarea>`;
		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
	}
}

class Keyboard {
	constructor(blockNode) {
		this.language = 'ENG';
		this.keys = [];
		this.blockNode = null;
		this.renderKeyboard(blockNode, this.language);
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
		console.log(this.keys);
	}
}

class Key {
	constructor(key, blockNode, language) {
		this.name_eng = key.name_eng;
		this.name_ru = key.name_ru;
		this.with_type = key.with_type;
		this.shift_eng = key.shift_eng;
		this.name = key.name;
		this.with_type = key.with_type;
		this.shift = key.shift;

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

		let textAreaHtml = `<div class="key ${this.with_type}">${sign}</div>`;
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
								<p>Для переключения клавиатуры используйте сочетание клавиш ФФФФ + ПППП</p>
							</div>`;
		blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
		this.htmlText = blockNode.querySelector('.ru-en-switch-info');
	}
}

const page = new Page();

page.main.keyboard.renderKeyboard(page.main.keyboard.blockNode, 'RU');