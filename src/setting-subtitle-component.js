const template = document.createElement('template');
template.innerHTML = `
<style>
  .setting-subtitle {
    font-size: 16px;
    font-weight: 400;
    padding: 15px 0 5px 30px;
    user-select: none; 
  }

  .setting-subtitle::after {
    position: absolute;
    content:"+";
    right: 20px;
  }

  .active::after {
    content:"-";
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

