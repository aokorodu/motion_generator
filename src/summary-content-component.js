const template = document.createElement('template');
template.innerHTML = `
<style>

*{
  box-sizing: border-box;
}
  .holder {
    width: 100%;
    height: 100px;
    padding: 10px 10px 10px 20px;
    font-size: 14px;
  }

  .name{
    font-weight: 600;
  }

  .type {
    font-weight: 400;
    margin-left: 15px;
  }

  .title{
    margin: 20px 0 5px 0;
    font-size: 18px;
    text-decoration: underline;
  }

  .description-text {
    font-size: 14px;
  }
</style>
<div class="holder">
  <div class="type-holder">
    <span class="name">animation:</span><span class="type" id="motion-type"></span>
  </div>
  <div class="type-holder">
    <span class="name">duration:</span><span class="type" id="duration"></span>
  </div>
  <div class="type-holder">
    <span class="name">easing:</span><span class="type" id="easing"></span>
  </div>
  <div class="type-holder">
    <span class="name">slide-distance:</span><span class="type" id="slide-distance"></span>
  </div>
  <div class="type-holder">
    <span class="name">transform-origin:</span><span class="type" id="transform-origin"></span>
  </div>
    <div class="title" id="description-title"></div>
    <div class="description-text" id="description-text"></div>
</div>`;


class SummaryContentComponent extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.motionType = this.shadowRoot.getElementById("motion-type");
    this.duration = this.shadowRoot.getElementById("duration");
    this.easing = this.shadowRoot.getElementById("easing");
    this.slideDistance = this.shadowRoot.getElementById("slide-distance");
    this.transformOrigin = this.shadowRoot.getElementById("transform-origin");

    // content
    this.descriptionTitle = this.shadowRoot.getElementById("description-title");
    this.descriptionText = this.shadowRoot.getElementById("description-text");
  }

  getDescription(selection) {
    return {
      "Sine.easeInOut": "This is the default easing curve that will be applied to animations when no motion curve is specified",
      "linear": "With this option, the animated object moves at a constant speed, with no acceleration or deceleration. Can be a bit jarring, so should probably only be used for opacity or color changes",
      "Power4.easeInOut": "This easing curve is similar to the normal Sine.easeInOut animation curve, except that the acceleration and deceleration is more abrupt, giving the animation a bit more 'pop'. Use when you want to draw a bit more attention to the object being animated.",
      "back.inOut": "An easing curve with a bit of a bounce. Can be used for more celebratory animations.",
      "energetic": "An easing cuve with extra bounce. Should only be used for very expressive or celebratory animations.",
    }[selection]
  }

  update(motionType, duration, easing, slideDistance, transformOrigin){
    this.motionType.innerHTML = motionType;
    this.duration.innerHTML = duration;
    this.easing.innerHTML = easing;
    this.slideDistance.innerHTML = `${slideDistance}px`;
    this.transformOrigin.innerHTML = transformOrigin;

    this.descriptionTitle.innerHTML = easing;
    this.descriptionText.innerHTML = this.getDescription(easing);
  }
}

window.customElements.define('summary-content-component', SummaryContentComponent);