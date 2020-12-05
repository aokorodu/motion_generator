const template = document.createElement('template');
template.innerHTML = `
<style>
.holder {
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg-holder{
  position: absolute;
  width: 90px;
  top: 25px;
  height: 90px;
  
}
.label{
  position: absolute;
  border-bottom: 1px solid #cccccc;
  top: 0;
  width: 100%;
  height: 15px;
  font-size: 1rem;
  padding: 2px;
  text-align: center;
  pointer-events: none;
  z-index: 10;
  color: #aaaaaa;
}

.selected {
  fill: #000000;
  transition: fill 200ms linear;
}
</style>
<div class="holder">
<div class="label">scale origin</div>
<div class="svg-holder">
<svg viewBox="0 0 102 102" version="1.1">
    <g id="Page-1" stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
        <g id="transformer" stroke="#000000">
            <rect id="outer" fill="#FFFFFF" stroke="none" x="0" y="0" width="100" height="100"></rect>
            <rect id="inner" x="10" y="10" width="80" height="80"></rect>
            <g id="top-left" class="ball" transform="translate(6.000000, 6.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="top-center" class="ball" transform="translate(45.000000, 6.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="top-right" class="ball" transform="translate(85.000000, 6.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="center-left" class="ball" transform="translate(6.000000, 45.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="center-center" class="ball" transform="translate(45.000000, 45.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="center-right" class="ball" transform="translate(85.000000, 45.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="bottom-left" class="ball" transform="translate(6.000000, 85.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="bottom-center" class="ball" transform="translate(45.000000, 85.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
            <g id="bottom-right" class="ball" transform="translate(85.000000, 85.000000)" fill="#FFFFFF">
                <circle cx="5" cy="5" r="10"></circle>
            </g>
        </g>
    </g>
</svg>
</div>
</div>
`

class ScaleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.balls = this.shadowRoot.querySelectorAll(".ball");
    this.initSelectedBall();
    for (let ball of this.balls) {
      ball.addEventListener("click", () => {
        console.log(ball.getAttribute("id"));
        this.dispatchTransformOriginEvent(ball.getAttribute("id"));
        this.selectBall(ball);
      })
    }
  }

  initSelectedBall(){
    this.selectBall(this.balls[4]);
  }

  selectBall(selectedBall) {
    for (let ball of this.balls) {
      ball == selectedBall ? ball.classList.add('selected') : ball.classList.remove('selected');
    }
  }

  dispatchTransformOriginEvent(val){
    this.dispatchEvent(new CustomEvent('newTransformOrigin', { bubbles: true, composed: true, detail: { value: val } }))
  }
}

window.customElements.define('scale-component', ScaleComponent);