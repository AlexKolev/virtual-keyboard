export class TextArea {
  constructor(blockNode) {
    this.node = null;
    this.renderTextArea(blockNode);
  }

  /**
   * Создание секции main textarea
   * @param {*} blockNode нода в которую вложен блок textarea
   */
  renderTextArea(blockNode) {
    const textAreaHtml = '<textarea class="display-area" name="display-text" id="display-text" cols="30" rows="10" ></textarea>';
    blockNode.insertAdjacentHTML('beforeend', textAreaHtml);
    this.node = blockNode.querySelector('textarea');
  }
}
