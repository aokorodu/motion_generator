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
    this.active = this.getAttribute('active') != null ? true : false;
    this.rightAlign = this.getAttribute("right")  != null ? true : false;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(template.content.cloneNode(true));
    this.theDiv = this.shadowRoot.querySelector(".setting-subtitle")
    this.theDiv.innerText = this.name;
    if(this.rightAlign) {
      this.theDiv.classList.add("right")
    }

    this.activate(this.active);
  }

  toggle(){
    this.activate(!this.active);
  }

  activate(bool){
    this.active = bool;
    if(bool){
      this.theDiv.classList.add('active');
    } else {
      this.theDiv.classList.remove('active');
    }
  }
}

window.customElements.define('setting-subtitle', SettingSubtitleComponent)

