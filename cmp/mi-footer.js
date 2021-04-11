class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `&copy; 2021
      ANGEL DANIEL PEREZ.`;
  }
}
customElements.define(
  "mi-footer", MiFooter);
