import { gsap } from 'gsap';
import { Draggable } from "gsap/Draggable";

const template = document.createElement('template');
template.innerHTML = `
<style>
  .box {
    position: relative;
    min-width: 200px;
    height: auto;
    font-size: 1.5rem;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin: 5px;
    color: #333333;
    background-color: transparent;
  }

  .default-border {
    border: 1px solid #5e5e5e;
  }

</style>
<div id="motion-target" class="box default-border">
  <span class="input" role="textbox" contenteditable><slot /></span>
</div>
`;

class MotionTargetComponent extends HTMLElement {
  constructor() {
    super();
    this.active = this.getAttribute("active") != null ? true : false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.box = this.shadowRoot.getElementById('motion-target');
    gsap.registerPlugin(Draggable);
    Draggable.create(this.box, {type:"x,y", onDragEnd:()=>{this.dragEnd()}});

    
    // ANIMATION PROPERTIES
    //  left right up down origin
    this.slideDistance = 25;
    this.origin = { x: 0, y: 0 };
    this.left, this.right, this.up, this.down;
    
    // easing
    this.selectedEase = this.normalEase;

    // duration
    this.selectedDuration = this.normal;

    this.initializePoints();
  }

  initializePoints(){
    this.left = {x:this.origin.x-this.slideDistance, y:this.origin.y};
    this.right = {x:this.origin.x+this.slideDistance, y:this.origin.y};
    this.up = { x: this.origin.x, y: this.origin.y-this.slideDistance};
    this.down = { x:this.origin.x, y: this.origin.y+this.slideDistance };
  }

  dragEnd(){
    console.log('drag end', gsap.getProperty(this.box, "x"));
    this.origin.x = gsap.getProperty(this.box, "x");
    this.origin.y = gsap.getProperty(this.box, "y");
    this.initializePoints();
  }

  setAnimation(animation, duration, ease) {
    this.selectedAnimation = animation;
    this.selectedDuration = duration
    this.selectedEase = ease;
  }

  updateSlideDistance(newdistance){
    console.log('new distance: ', newdistance)
    this.slideDistance = newdistance;
    this.initializePoints();
  }

  runAnimation() {
    switch (this.selectedAnimation) {
      case "fadeIn":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 0, scale:this.getScale() }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay() });
        break;

      case "fadeOut":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay() });
        break;

      // in
      case "slideInRight":
        gsap.fromTo(this.box, { x: this.left.x, y: this.left.y, opacity: 0, scale: this.getScale() }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay() });
        break;

      case "slideInLeft":
        gsap.fromTo(this.box, { x: this.right.x, y: this.right.y, opacity: 0, scale: this.getScale() }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay() });
        break;

      case "slideInUp":
        gsap.fromTo(this.box, { x: this.down.x, y: this.down.y, opacity: 0, scale: this.getScale() }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay() });
        break;

      case "slideInDown":
        gsap.fromTo(this.box, { x: this.up.x, y: this.up.y, opacity: 0, scale: this.getScale() }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay() });
        break;

      // out
      case "slideOutRight":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: this.getScale() }, { x: this.right.x, y: this.right.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay() });
        break;

      case "slideOutLeft":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: this.getScale() }, { x: this.left.x, y: this.left.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay() });
        break;

      case "slideOutUp":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: this.getScale() }, { x: this.up.x, y: this.up.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay() });
        break;

      case "slideOutDown":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: this.getScale() }, { x: this.down.x, y: this.down.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: { each: this.staggerDuration, from: "end" } });
        break;

      case "scaleUp":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1.5, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleUpDelay() });
        break;

      case "scaleDown":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleDownDelay() });
        break;

      case "scaleIn":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 0, scale: .8 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleUpDelay() });
        break;

      case "scaleOut":
          gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale:this.getScale() }, { x: this.origin.x, y: this.origin.y, opacity: 0, scale: .8, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay() });
          break;

      case "rotate":
        const angle = gsap.getProperty(this.box, "rotation") == 0 ? 180 : 0;
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { rotate: angle, ease: this.selectedEase, duration: this.selectedDuration });
        break;

      case "wiggle":
        const rightX = this.origin.x + 5;
        const leftX = this.origin.x - 5;
        const tl = gsap.timeline();
        tl.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: rightX, duration: this.selectedDuration / 6, ease: this.selectedEase })
          .to(this.box, { x: leftX, duration: this.selectedDuration / 6, ease: this.selectedEase, yoyo: true, repeat: 3 })
          .to(this.box, { x: this.origin.x, duration: this.selectedDuration / 6, ease: this.selectedEase });
        break;

      case "expand":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { height: 150, ease: this.selectedEase, duration: this.selectedDuration });
        break;

      case "contract":
        //gsap.to(this.box, { height: "auto", ease: this.selectedEase, duration: this.selectedDuration });

        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { height: "auto", ease: this.selectedEase, duration: this.selectedDuration });
        break;
    }
  }

  getScale(){
    let currentScale = gsap.getProperty(this.box, "scale");
    currentScale = currentScale  < 1 ? 1 : currentScale;
    return currentScale;
  }

  getFadeInDelay() {
    return this.box.style.opacity == "0" ? 0 : .33;

  }

  getFadeOutDelay() {
    return this.box.style.opacity == "0" ? .33 : 0;
  }

  getScaleUpDelay() {
    const currentScale = gsap.getProperty(this.box, "scale")
    return currentScale > 1 ? .33 : 0;
  }

  getScaleDownDelay() {
    const currentScale = gsap.getProperty(this.box, "scale")
    return currentScale > 1 ? 0 : .33;
  }

  border(bool) {
    bool ? this.box.classList.add('default-border') : this.box.classList.remveo('default-border')
  }

}

window.customElements.define('motion-target', MotionTargetComponent)