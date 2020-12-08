const template = document.createElement('template');
template.innerHTML = `
<style>
*{
  font-size: 10px;
}
.holder {
  position: relative;
  width: 100%;
  height: 300px;
}
.diagram{
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
}

.active {
  display: block;
}

img{
  width: 100%;
  height: 100%;
}

.x-axis {
  position: absolute;
  width: 100%;
  bottom: 10px;
  text-align: center;
}

.y-axis {
  position: absolute;
  width: 100%;
  transform-origin: top left;
  transform: rotate(-90deg) translateX(-50%);
  left: 60px;
  top: 150px;
  text-align: center;
}

</style>
<div class="holder">
<div><slot /></div>
<div class="x-axis">TIME</div>
<div class="y-axis">PROGRESSION</div>
  
</div>
`

class MotionChartComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.images = document.querySelectorAll('image-component');
  }

  showChart(imageName){
    console.log('show image ', imageName)
    for(let image of this.images){
      image.activate(image.name == imageName);
    }
  }

  
}

window.customElements.define('motion-chart-component', MotionChartComponent);