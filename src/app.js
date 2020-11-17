import { gsap } from 'gsap';
export class App{
  constructor(){
      this.animTypeButtons = [];
      this.animSpeedButtons = [];
      this.curveButtons = [];
      this.viewButtons = [];
      this.selectedAnimation = "";
      this.motionTargets = document.querySelectorAll('.box');
      this.slideDistance = 50;
      this.left = {x: -this.slideDistance, y:0};
      this.right = {x: this.slideDistance, y:0};
      this.up = {x:0, y: -this.slideDistance,};
      this.down = {x:0, y: this.slideDistance,};
      this.origin = {x: 0, y:0};
      
      // easing
      this.normalEase = "Sine.easeInOut";
      this.emphasis = "back";
      this.energetic = "elastic";
      this.linear = "linear";
      this.reveal = "Power4.easeInOut"
      this.selectedEase = this.reveal;

      // duration
      this.verySlow = 1;
      this.slow = .66;
      this.normal = .33;
      this.fast = .15;
      this.veryFast = .1;
      this.instant = 0;
      this.selectedDuration = this.slow;

      // view
      this.boxView = "box-view"
      this.twoBoxView = "two-box-view";
      this.textView = "text-view";
      this.selectedView = this.boxView
  }

  init(){
      this.initProps();
      this.initButtons();
  }

  initProps(){
    this.motionTargets[1].style.display = "none";
  }

  getSpeed(selection) {
    return {
      "verySlow": this.verySlow,
      "slow": this.slow,
      "normal": this.normal,
      "fast": this.fast,
      "veryFast": this.veryFast,
      "instant": this.instant
    }[selection]
  }

  getCurve(selection) {
    return {
      "normal": this.normalEase,
      "energetic": this.energetic,
      "reveal": this.reveal,
      "emphasis": this.emphasis,
      "linear": this.linear,
    }[selection]
  }

  initButtons(){
      console.log('initButtons');
      this.animTypeButtons = document.querySelectorAll('.type-selection');
      for(let button of this.animTypeButtons){
          button.addEventListener('click', (e)=>{
              this.selectedAnimation = e.target.innerText;
              this.animate(this.selectedAnimation);
          })
      }

      this.animSpeedButtons = document.querySelectorAll('.speed-selection');
      for(let button of this.animSpeedButtons){
          button.addEventListener('click', (e)=>{
              this.selectedDuration = this.getSpeed(e.target.innerText);
              console.log('selected duration: ', this.selectedDuration)
          })
      }

      this.curveButtons = document.querySelectorAll('.curve-selection');
      for(let button of this.curveButtons){
          button.addEventListener('click', (e)=>{
              this.selectedEase = this.getCurve(e.target.innerText);
              console.log('selectedEase: ', this.selectedEase)
          })
      }

      this.viewButtons = document.querySelectorAll('.view-selection');
      for(let button of this.viewButtons){
          button.addEventListener('click', (e)=>{
              this.selectedEase = this.getCurve(e.target.innerText);
              console.log('selectedEase: ', this.selectedEase)
          })
      }

      
      
  }

  animate(selectedAnimation){
    console.log(this.selectedAnimation);
    switch(selectedAnimation){
      case "fadeIn":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: 0.2});
      break;

      case "fadeOut":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.origin.x, y: this.origin.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: 0.2});
      break;

      // in
      case "slideInRight":
        gsap.fromTo(this.motionTargets, {x:this.left.x, y: this.left.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: 0.2});
      break;

      case "slideInLeft":
        gsap.fromTo(this.motionTargets, {x:this.right.x, y: this.right.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: 0.2});
      break;

      case "slideInUp":
        gsap.fromTo(this.motionTargets, {x:this.down.x, y: this.down.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: 0.2});
      break;

      case "slideInDown":
        gsap.fromTo(this.motionTargets, {x:this.up.x, y: this.up.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: 0.2});
      break;
      
      // out
      case "slideOutRight":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.right.x, y: this.right.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: 0.2});
      break;

      case "slideOutLeft":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.left.x, y: this.left.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: 0.2});
      break;

      case "slideOutUp":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.up.x, y: this.up.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: 0.2});
      break;

      case "slideOutDown":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.down.x, y: this.down.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: 0.2});
      break;

      case "scaleUp":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1, scale:1}, {x:this.origin.x, y: this.origin.y, opacity:1, scale:2, ease:this.selectedEase, duration: this.selectedDuration, stagger: 0.2});
      break;

      case "scaleDown":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.origin.x, y: this.origin.y, opacity:1, scale:1, ease:this.selectedEase, duration: this.selectedDuration, stagger: 0.2});
      break;

      case "rotate":
        gsap.fromTo(this.motionTargets, {rotate:0, opacity:1}, {rotate:180, ease:this.selectedEase, duration: this.selectedDuration, stagger: 0.2});
      break;
    }
  }

  getFadeInDelay(){
    return this.motionTargets[0].style.opacity == "0" ? 0 : .33;
        
  }

  getFadeOutDelay(){
    return this.motionTargets[0].style.opacity == "0" ? .33 : 0;
        
  }

  updateClassList(){

  }
}
