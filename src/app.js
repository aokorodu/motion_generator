import { gsap } from 'gsap';
export class App{
  constructor(){
      this.classButtons = [];
      this.selectedAnimation = "";
      this.selectedDuration = "slow";
      this.motionTarget = document.getElementById('motion-target');
      this.slideDistance = 50;
      this.startPositions = {
        left:{x: -this.slideDistance, y:0, opacity: 0},
        right:{x: this.slideDistance, y:0, opacity: 0},
        up:{x: 0, y:-this.slideDistance, opacity: 0},
        down:{x: 0, y:this.slideDistance, opacity: 0},
        origin:{x: 0, y:0, opacity: 0}
      };
      this.endPositions = {
        left:{x: -this.slideDistance, y:0, opacity: 0, delay:0},
        right:{x: this.slideDistance, y:0, opacity: 0, delay:0},
        up:{x: 0, y:-this.slideDistance, opacity: 0, delay:0},
        down:{x: 0, y:this.slideDistance, opacity: 0, delay:0},
        origin:{x: 0, y:0, opacity: 1, delay:0}
      }

      this.originIn = {
        x: 0, y:0, opacity: 1, delay:0
      }
      this.originOut = {
        x: 0, y:0, opacity: 0, delay:0
      }
  }

  init(){
      this.initProps();
      this.initButtons();
  }

  initProps(){
    // const fromProps = {x: this.slideDistance, y:0, opacity: 0};
    // const toProps = {x: 0, y:0, opacity: 1, duration: 1, delay: 1};
    // gsap.fromTo(this.motionTarget, fromProps, toProps);
  }

  initButtons(){
      console.log('initButtons');
      this.classButtons = document.querySelectorAll('.type-button');
      for(let button of this.classButtons){
          button.addEventListener('click', (e)=>{
              this.selectedAnimation = e.target.innerText;
              console.log(this.selectedAnimation);
              this.animate(this.selectedAnimation);
          })
      }
  }

  animate(selectedAnimation){
    console.log(this.motionTarget.style.opacity);
    switch(selectedAnimation){
      case "fadeIn":
        this.originIn.delay =  this.getFadeInDelay();
        gsap.fromTo(this.motionTarget, this.originOut, this.originIn);
      break;

      case "fadeOut":
        this.originOut.delay =  this.getFadeOutDelay();
        gsap.fromTo(this.motionTarget, this.originIn, this.originOut);
      break;

      // in
      case "slideInRight":
        this.originIn.delay = this.getFadeInDelay();
        gsap.fromTo(this.motionTarget, {x:this.startPositions.left.x, y:this.startPositions.left.y, opacity:0}, this.originIn);
      break;

      case "slideInLeft":
        this.originIn.delay = this.getFadeInDelay();
        gsap.fromTo(this.motionTarget, {x:this.startPositions.right.x, y:this.startPositions.right.y, opacity:0}, this.originIn);
      break;

      case "slideInUp":
        this.originIn.delay = this.getFadeInDelay();
        gsap.fromTo(this.motionTarget, {x:this.startPositions.down.x, y:this.startPositions.down.y, opacity:0}, this.originIn);
      break;

      case "slideInDown":
        this.originIn.delay = this.getFadeInDelay();
        gsap.fromTo(this.motionTarget, {x:this.startPositions.up.x, y:this.startPositions.up.y, opacity:0}, this.originIn);
      break;
      
      // out
      case "slideOutRight":
        this.endPositions.right.delay =  this.getFadeOutDelay();
        gsap.fromTo(this.motionTarget, {x:this.originIn.x, y:this.originIn.y, opacity:1}, this.endPositions.right);
      break;

      case "slideOutLeft":
        this.endPositions.left.delay =  this.getFadeOutDelay();
        gsap.fromTo(this.motionTarget, {x:this.originIn.x, y:this.originIn.y, opacity:1}, this.endPositions.left);
      break;

      case "slideOutUp":
        this.endPositions.up.delay =  this.getFadeOutDelay();
        gsap.fromTo(this.motionTarget, {x:this.originIn.x, y:this.originIn.y, opacity:1}, this.endPositions.up);
      break;

      case "slideOutDown":
        this.endPositions.down.delay =  this.getFadeOutDelay();
        gsap.fromTo(this.motionTarget, {x:this.originIn.x, y:this.originIn.y, opacity:1}, this.endPositions.down);
      break;
    }
  }

  getFadeInDelay(){
    return this.motionTarget.style.opacity == "0" ? 0 : .33;
        
  }

  getFadeOutDelay(){
    return this.motionTarget.style.opacity == "0" ? .33 : 0;
        
  }

  updateClassList(){

  }
}
