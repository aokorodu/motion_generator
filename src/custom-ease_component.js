import { gsap } from 'gsap';
import { Draggable } from "gsap/Draggable";

const template = document.createElement('template');
template.innerHTML = `
<style>
.holder {
  position: relative;
  width: 100%;
  height: 225px;
  border-bottom: 1px solid #cccccc;
}

.curve-text {
  position: absolute;
  bottom: 10px;
  width: 100%;
  font-size: 10px;
  color: #000000;
  text-align: center;
}
</style>
<div class="holder">
<svg viewBox="-50 -50 200 200">
    <g id="Page-1" stroke="#000000" stroke-width="2" fill="none" fill-rule="evenodd">
      <rect id="boundryBox" stroke="none" x="-5" y="-45" width="110" height="195"></rect>
      <rect id="box" x="0" y="0" width="100" height="100"></rect>
      <path id="curve" d="M 0 100 C 0 50 100 50 100 0" stroke="#000000" fill="none"></path>
      <circle id="ball_1" cx="0" cy="0" r="5" class="ball" transform="translate(20, 50)" fill="#8A2423"></circle>
      <line id="line_1" x1="0" y1="100" x2="20" y2="50" stroke="#777777" stroke-width="1" stroke-dasharray="5,5"></line>
      <circle id="ball_2" class="ball" transform="translate(80, 50)" fill="#005392" cx="0" cy="0" r="5"></circle>
      <line id="line_2" x1="100" y1="0" x2="80" y2="50" stroke="#777777" stroke-width="1" stroke-dasharray="5,5"></line>
    </g>
  </svg>
  <div class="curve-text"></div>
  </div>
`

class CustomEaseComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.holder = this.shadowRoot.querySelector('.holder');
    this.ball_1 = this.shadowRoot.querySelector('#ball_1');
    this.line_1 = this.shadowRoot.querySelector('#line_1');
    this.ball_2 = this.shadowRoot.querySelector('#ball_2');
    this.line_2 = this.shadowRoot.querySelector('#line_2');
    this.curve = this.shadowRoot.querySelector('#curve');
    this.curveText = this.shadowRoot.querySelector('.curve-text');
    this.cubicBezierValues = null;
    Draggable.create(this.ball_1, { type: "x,y", bounds:this.shadowRoot.getElementById("boundryBox"), onDrag: ()=>{this.onDrag(this.ball_1)}, onDragEnd:()=>{this.dispatchCustomEaseEvent()}});
    Draggable.create(this.ball_2, { type: "x,y", bounds:this.shadowRoot.getElementById("boundryBox"), onDrag: ()=>{this.onDrag(this.ball_2)}, onDragEnd:()=>{this.dispatchCustomEaseEvent()}});

    
  }

  onDrag(ball){
    let str = ball.getAttribute("transform");
    let newstr = str.substring(7, str.length-1);
    let arr = newstr.split(",").splice(4, 2);
    
    let currentCurve = this.curve.getAttribute('d');
    let curveArray = currentCurve.split(' ');

    if(ball == this.ball_1){
      curveArray.splice(4, arr.length, ...arr)
    } else {
      curveArray.splice(6, arr.length, ...arr)
    }

    let finalStr = curveArray.join(' ');
    this.curve.setAttribute('d', finalStr);

    const finalValues = curveArray.slice(4,8);
    console.log('-', finalValues)
    this.line_1.setAttribute("x2",  finalValues[0]);
    this.line_1.setAttribute("y2",  finalValues[1]);
    this.line_2.setAttribute("x2",  finalValues[2]);
    this.line_2.setAttribute("y2",  finalValues[3]);
    const map1 = finalValues.map(val => Math.round(Number(val))/100);
    map1[1] = 1 - map1[1];
    map1[3] = 1 - map1[3];

    const valueString = map1.toLocaleString()
    this.cubicBezierValues = valueString;
    this.curveText.innerHTML = `cubic-bezier(${valueString})`;
  }

  dispatchCustomEaseEvent(){
    this.dispatchEvent(new CustomEvent('customEase', { bubbles: true, composed: true, detail: { value: this.cubicBezierValues } }))
  }
    
  
}

window.customElements.define('custom-ease-component', CustomEaseComponent);