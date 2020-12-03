const template = document.createElement('template');
template.innerHTML = `
<style>
.image-holder{
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
}

.active {
  display:block;
}

img {
  width: 100%;
  height: 100%;
}
</style>
<div class="image-holder" >
  <img class="image" src="">
</div>
`;

class ImageComponent extends HTMLElement {
  constructor(){
    super();
    console.log('image component constructor')
    this.name = this.getAttribute("name");
    this.src = this.getAttribute('src');
    this.active = this.getAttribute("active") != null ? true : false;

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.holder = this.shadowRoot.querySelector(".image-holder");
    this.image = this.shadowRoot.querySelector('.image');
    this.image.src = this.src;

    this.activate(this.active)
  }

  activate(bool){
    this.active = bool;
    if(this.active){
      this.holder.classList.add('active');
    } else {
      this.holder.classList.remove('active');
    }
  }
}

window.customElements.define('image-component', ImageComponent);