const template = document.createElement('template');
template.innerHTML = `
<style>
  .holder {
    position: relative;
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #slide-value{
    position: absolute;
    top: 25px;
    width: 100%;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    pointer-events: none;
    color: #aaaaaa;
  }

  .label{
    position: absolute;
    top: 0;
    width: 100%;
    font-size: 1rem;
    padding: 2px;
    text-align: center;
    pointer-events: none;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 100px;
    background: #E8E7E7;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    padding: 0;
    margin: 20px 0 0 0;
    border-width: 1px 0;
    border-color: #cccccc;
    border-style: solid;
  }
  
  .slider:hover {
    opacity: 1;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 50px;
    height: 100px;
    background: #FAF9F9;
    cursor: pointer;
    border-width: 0 1px;
    border-color: #cccccc;
    border-style: solid;
  }
  
  .slider::-moz-range-thumb {
    width: 50px;
    height: 100px;
    background: #FAF9F9;
    cursor: pointer;
    border-width: 0 1px;
    border-color: #cccccc;
    border-style: solid;
  }
</style>
<div class="holder">
  <div id="slide-value"></div>
  <input class="slider" type="range" value="50" min="0" max="100" step="10" />
  <div class="label">scale distance</div>
</div>
`;

class ScaleDistanceComponent extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.slider = this.shadowRoot.querySelector('.slider');
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


