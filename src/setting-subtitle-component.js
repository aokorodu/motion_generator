const template = document.createElement('template');
template.innerHTML = `
<style>
  .setting-subtitle {
    font-size: 14px;
    font-weight: 600;
    font-variant: small-caps;
    padding: 4px;
  }
  .right{
    text-align: right;
  }
</style>

<div class="setting-subtitle"></div>`;

class SettingSubtitleComponent extends HTMLElement {
  constructor(){
    super();
    this.name = this.getAttribute('name');
    this.rightAlign = this.getAttribute("right")  != null ? true : false;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(template.content.cloneNode(true));
    const theDiv = this.shadowRoot.querySelector(".setting-subtitle")
    theDiv.innerText = this.name;
    if(this.rightAlign) {
      theDiv.classList.add("right")
    }
  }
}

window.customElements.define('setting-subtitle', SettingSubtitleComponent)

