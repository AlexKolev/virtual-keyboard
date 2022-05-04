import { TextArea } from './textarea.js';
import { Keyboard } from './keyboard.js';
import { RuEnSwitchInfo } from './ruengswitchinfo.js';

export class Main {
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
    const element = document.createElement('main');
    element.classList.add('conteiner');
    blockNode.append(element);
    this.textArea = new TextArea(element);
    this.keyboard = new Keyboard(element, this.textArea);
    this.ruEnSwitchInfo = new RuEnSwitchInfo(element, this.keyboard.language);
    this.keyboard.ruEnSwitchInfo = this.ruEnSwitchInfo;
  }
}
