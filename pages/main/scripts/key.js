export default class Key {
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
