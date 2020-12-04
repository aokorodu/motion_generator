const template = document.createElement('template');
template.innerHTML = `
<style>
  .holder {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #slide-value{
    width: 100%;
    font-size: 1rem;
    text-align: center;
  }

  .label{
    width: 100%;
    font-size: 1.5rem;
    padding: 5px;
    text-align: center;
  }
</style>
<div class="holder">
  <div id="slide-value"></div>
  <input id="slider" type="range" value="50" min="0" max="100" step="10" />
  <div class="label">scale distance</div>
</div>
`;

class ScaleDistanceComponent extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.slider = this.shadowRoot.getElementById('slider');
    this.slider.addEventListener("input", (e)=>{
      this.slideValue.innerText = `${this.slider.value}%`;
    })
    this.slider.addEventListener("mouseup", (e)=>{
      this.dispatchDistanceEvent();
      this.slideValue.innerText = `${this.slider.value}%`;
    })

    this.slideValue = this.shadowRoot.getElementById('slide-value');
    this.slideValue.innerText = `${this.getAttribute("value")}%`;
  }

  dispatchDistanceEvent(){
    this.dispatchEvent(new CustomEvent('newScaleDistance', { bubbles: true, composed: true, detail: { value: this.slider.value } }))
  }

}

window.customElements.define('scale-distance-component', ScaleDistanceComponent);