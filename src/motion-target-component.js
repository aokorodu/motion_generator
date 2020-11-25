import { gsap } from 'gsap';

const template = document.createElement('template');
template.innerHTML = `
<style>
  .box {
    position: relative;
    min-width: 150px;
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
    border-radius: 8px;
  }

  .default-border {
    border: 2px solid #5e5e5e;
    background-color: #eaeaea;
  }

</style>
<div id="motion-target" class="box default-border">
  <span class="input" role="textbox" contenteditable>Vanguard</span>
</div>
`;

class MotionTargetComponent extends HTMLElement{
  constructor(){
    super();
    this.active = this.getAttribute("active") != null ? true : false;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.box = this.shadowRoot.querySelector('.box');

    // ANIMATION PROPERTIES
    //  left right up down origin
    this.slideDistance = 50;
    this.left = { x: -this.slideDistance, y: 0 };
    this.right = { x: this.slideDistance, y: 0 };
    this.up = { x: 0, y: -this.slideDistance, };
    this.down = { x: 0, y: this.slideDistance, };
    this.origin = { x: 0, y: 0 };

    // easing
    this.normalEase = "Sine.easeInOut";
    this.emphasis = "back.inOut";
    this.energetic = "elastic.inOut";
    this.linear = "linear";
    this.reveal = "Power4.easeInOut"
    this.selectedEase = this.normalEase;

    // duration
    this.verySlow = 1.33;
    this.slow = .99;
    this.normal = .66;
    this.fast = .33;
    this.veryFast = .15;
    this.instant = 0;
    this.selectedDuration = this.normal;
  }

  setAnimation(animation, duration, ease ){
    this.selectedAnimation = animation;
    this.selectedDuration = duration
    this.selectedEase = ease;
  }

  runAnimation() {
    switch (this.selectedAnimation) {
      case "fadeIn":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay()});
        break;

      case "fadeOut":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay()});
        break;

      // in
      case "slideInRight":
        gsap.fromTo(this.box, { x: this.left.x, y: this.left.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay()});
        break;

      case "slideInLeft":
        gsap.fromTo(this.box, { x: this.right.x, y: this.right.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay()});
        break;

      case "slideInUp":
        gsap.fromTo(this.box, { x: this.down.x, y: this.down.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay()});
        break;

      case "slideInDown":
        gsap.fromTo(this.box, { x: this.up.x, y: this.up.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay()});
        break;

      // out
      case "slideOutRight":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.right.x, y: this.right.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay()});
        break;

      case "slideOutLeft":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.left.x, y: this.left.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay()});
        break;

      case "slideOutUp":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.up.x, y: this.up.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay()});
        break;

      case "slideOutDown":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.down.x, y: this.down.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: { each: this.staggerDuration, from: "end" } });
        break;

      case "scaleUp":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1.5, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleUpDelay()});
        break;

      case "scaleDown":
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleDownDelay()});
        break;

      case "rotate":
        const angle = gsap.getProperty(this.box, "rotation") == 0 ? 180 : 0;
        gsap.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { rotate: angle, ease: this.selectedEase, duration: this.selectedDuration});
        break;

      case "wiggle":
        const tl = gsap.timeline();
        tl.fromTo(this.box, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: 5, duration: this.selectedDuration / 6, ease: this.selectedEase })
          .to(this.box, { x: -5, duration: this.selectedDuration / 6, ease: this.selectedEase, yoyo: true, repeat: 3 })
          .to(this.box, { x: 0, duration: this.selectedDuration / 6, ease: this.selectedEase });
        break;

      case "expand":
        gsap.to(this.box, { height: 150, ease: this.selectedEase, duration: this.selectedDuration });
        break;

      case "contract":
        gsap.to(this.box, { height: "auto", ease: this.selectedEase, duration: this.selectedDuration });
        break;
    }
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
}

window.customElements.define('motion-target', MotionTargetComponent)