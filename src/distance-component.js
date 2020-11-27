const template = document.createElement('template');
template.innerHTML = `
<style>
  .holder {
    width: 100%;
    height: 100px;
    border: 1px solid black;
  }
</style>
<div class="holder">
  <input id="slider" type="range" value="50" min="0" max="300" />
</div>
`;

class DistanceComponent extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.slider = this.shadowRoot.getElementById('slider');
    this.slider.addEventListener("input", (e)=>{
      this.dispatchDistanceEvent()
    })
  }

  dispatchDistanceEvent(){
    this.dispatchEvent(new CustomEvent('newDistance', { bubbles: true, composed: true, detail: { value: this.slider.value } }))
  }
}

window.customElements.define('distance-component', DistanceComponent);