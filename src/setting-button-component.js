const template = document.createElement('template');
template.innerHTML = `
  <style>
  .setting-button{
    width: 100%;
    background-color: transparent;
    color: #292929;
    padding: 3px 0 3px 40px;
    font-size: 12px;
    text-align: left;
    margin-bottom: 0;
    border: none;
    transition-property: color, background-color;
    transition-duration: 200ms;
    outline: none;
  }

  .right{
    text-align: right;
  }
  
  .left{
    text-align: left;
  }

  .active-button{
    color: #000000;
    background-color: #cccccc;
  }

  .setting-button:hover{
    color: #000000;
    background-color: #cccccc;
  }


  </style>
  <button class="setting-button">
  </button>`;

  class SettingButtonComponet extends HTMLElement{
    constructor(){
      super();
      this.name = this.getAttribute("name");
      this.active = this.getAttribute("active") != null ? true : false;
      this.rightAlign = this.getAttribute("right")  != null ? true : false;
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.button = this.shadowRoot.querySelector(".setting-button");
      // console.log('this.button: ', this.button)
      this.button.innerText = this.name;
      if(this.rightAlign) this.button.classList.add("right");
      this.activate(this.active);
    }

    activate(bool){
      // console.log('activate? ', bool)
      this.active = bool;

      if(this.active){
        this.button.classList.add("active-button");
        // console.log('activating ', this.name)
      } else {
        this.button.classList.remove("active-button");
        // console.log('deactivating ', this.name)
      }
    }

    select(){
      // console.log('selecting ', this.name)
      this.activate(true);
    }

    deselect(){
      this.activate(false)
    }
  }

  window.customElements.define('setting-button', SettingButtonComponet);