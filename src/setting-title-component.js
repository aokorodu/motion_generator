const template = document.createElement('template');
template.innerHTML = `
<style>
  .section-heading {
    font-size: 16px;
    font-weight: 800;
    font-variant: small-caps;
    text-decoration: underline;
    padding: 4px;
  }
  .right{
    text-align: right;
  }
</style>

<div class="section-heading"></div>`;

class SettingTitleComponent extends HTMLElement {
  constructor(){
    super();
    this.name = this.getAttribute('name');
    this.rightAlign = this.getAttribute("right")  != null ? true : false;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(template.content.cloneNode(true));
    const theDiv = this.shadowRoot.querySelector(".section-heading")
    theDiv.innerText = this.name;
    if(this.rightAlign) {
      theDiv.classList.add("right")
    }
  }
}

window.customElements.define('setting-title', SettingTitleComponent)

