const template = document.createElement('template');
template.innerHTML = `
<style>
.holder {
  position: relative;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #cccccc;
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
</style>
<div class="holder">
  <slot />
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