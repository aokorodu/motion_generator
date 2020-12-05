const template = document.createElement('template');
template.innerHTML = `
<style>
  .holder {
    position: relative;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #slide-value{
    position: absolute;
    top: 0;
    left: 70%;
    width: 20%;
    font-weight: 600;
    font-size: 12px;
    text-align: right;
    pointer-events: none;
    color: #000000;
    margin-top: 15px;
    transform: translateY(-50%);
  }

  .slider {
    -webkit-appearance: none;
    position: absolute;
    width: 60%;
    left: 10%;
    height: 2px;
    background: #000000;
    outline: none;
    margin: 15px auto;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #FAF9F9;
    border-radius: 50%;
    cursor: pointer;
    border-width: 2px;
    border-color: #000000;
    border-style: solid;
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #FAF9F9;
    border-radius: 50%;
    cursor: pointer;
    border-width: 2px;
    border-color: #000000;
    border-style: solid;
  }
</style>
<div class="holder">
  <div id="slide-value"></div>
  <input class="slider" type="range" value="50" min="0" max="100" step="10" />
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


