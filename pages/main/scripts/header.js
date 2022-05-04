export class Header {
  constructor(blockNode) {
    this.upNode = blockNode;
    this.renderHeader(blockNode);
  }

  renderHeader(node) {
    const headerHtml = `<header class="conteiner">
    <h1 class='Head-page'>Virtual Keyboard</h1>
    </header>`;
    node.insertAdjacentHTML('beforeend', headerHtml);
  }
}
