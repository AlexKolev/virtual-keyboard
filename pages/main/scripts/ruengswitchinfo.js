export default class RuEnSwitchInfo {
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
    const element = document.createElement('div');
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
