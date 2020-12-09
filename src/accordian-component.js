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

  .panel{
    max-height: 0;
    overflow: hidden;
    transition: max-height 200ms ease-in-out;
  }

</style>
<div>
  <div class="setting-subtitle"></div>
    <div class="panel">
      <slot />
    </div>
</div>
`;

class AccordianComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.name = this.getAttribute('name');
    console.log('name: ', this.name)
    this.subtitle = this.shadowRoot.querySelector('.setting-subtitle');
    this.subtitle.innerHTML = this.name;
    this.panel = this.shadowRoot.querySelector('.panel');
    this.open = this.getAttribute('open') == null ? false : true;
    this.subtitle.addEventListener('click', ()=>{this.toggle()});
  }

  toggle(){
    this.open = !this.open;
    if(!this.open){
      this.subtitle.classList.remove('active');
      this.panel.style.maxHeight = null;
    } else {
      this.subtitle.classList.add('active');
      this.panel.style.maxHeight = this.panel.scrollHeight + "px";
    }

  }
}

window.customElements.define('accordian-component', AccordianComponent);