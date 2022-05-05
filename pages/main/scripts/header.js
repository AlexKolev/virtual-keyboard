export class Header {
  constructor(blockNode) {
    this.renderHeader(blockNode);
  }

  static renderHeader(node) {
    const headerHtml = `<header class="conteiner">
    <h1 class='Head-page'>Virtual Keyboard</h1>
    </header>`;
    node.insertAdjacentHTML('beforeend', headerHtml);
  }
}
