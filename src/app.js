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
      this.emphasis = "back.inOut";
      this.energetic = "elastic.inOut";
      this.linear = "linear";
      this.reveal = "Power4.easeInOut"
      this.selectedEase = this.reveal;

      // duration
      this.verySlow = 1.33;
      this.slow = .99;
      this.normal = .66;
      this.fast = .33;
      this.veryFast = .15;
      this.instant = 0;
      this.selectedDuration = this.slow;

      this.staggerDuration = 0.1

      // view
      this.boxView = "box-view"
      this.twoBoxView = "two-box-view";
      this.threeBoxView = "three-box-view";
      this.textView = "text-view";
      this.selectedView = this.boxView;
  }

  init(){
      this.initProps();
      this.initButtons();
  }

  initProps(){
    //this.motionTargets[1].style.display = "none";
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

  getView(selection) {
    return {
      "text":this.textView,
      "- O -": this.boxView,
      "- O O -": this.twoBoxView,
      "- O O O -": this.threeBoxView,
    }[selection]
  }

  getButtonGroup(selection) {
    return {
      "type-selection": this.animTypeButtons,
      "speed-selection": this.animSpeedButtons,
      "curve-selection": this.curveButtons,
      "view-selection": this.viewButtons,
    }[selection]
  }

  selectButton(button, buttonGroupName){
    const buttonGroup = this.getButtonGroup(buttonGroupName);
    for(let b of buttonGroup){
      console.log('this one? ', button == b)
      //button == b ? button.select() : button.deselect();
      if(b == button){
        b.select();
      } else {
        b.deselect();
      }
    }
  }

  

  initButtons(){
      console.log('initButtons');
      const test = document.querySelector(".hhh");
      console.log('test: ', test)
      this.initAnimTypeButtons();
      this.initAnimSpeedButtons();
      this.initCurveButtons();
      this.initViewButtons();
  }

  initAnimTypeButtons(){
    this.animTypeButtons = document.querySelectorAll('.type-selection');
    for(let button of this.animTypeButtons){
        button.addEventListener('click', (e)=>{
            this.selectedAnimation = button.name;
            this.selectButton(button, "type-selection")
            this.animate(this.selectedAnimation);
        })
    }
  }

  initAnimSpeedButtons(){
    this.animSpeedButtons = document.querySelectorAll('.speed-selection');
      for(let button of this.animSpeedButtons){
          button.addEventListener('click', (e)=>{
              this.selectedDuration = this.getSpeed(e.target.innerText);
              console.log('selected duration: ', this.selectedDuration)
          })
      }
  }

  initCurveButtons(){
    this.curveButtons = document.querySelectorAll('.curve-selection');
    for(let button of this.curveButtons){
        button.addEventListener('click', (e)=>{
            this.selectedEase = this.getCurve(e.target.innerText);
            console.log('selectedEase: ', this.selectedEase)
        })
    }
  }

  initViewButtons(){
    this.viewButtons = document.querySelectorAll('.view-selection');
    for(let button of this.viewButtons){
        button.addEventListener('click', (e)=>{
            this.selectedView = this.getView(e.target.innerText);
            console.log('selectedView: ', this.selectedView);
            switch(this.selectedView){
              case this.textView:
                for(let target of this.motionTargets){
                  target.classList.remove('default-border');
                }
              break;

              case this.boxView:
                for(let i = 0; i < this.motionTargets.length; i++){
                  const target = this.motionTargets[i];
                  target.classList.add('default-border');
                  i == 0 ? target.style.display = "" : target.style.display = "none";
                }
                
              break;

              case this.twoBoxView:
                for(let i = 0; i < this.motionTargets.length; i++){
                  const target = this.motionTargets[i];
                  target.classList.add('default-border');
                  i > 1 ? target.style.display = "none" : target.style.display = "";
                }
                //this.motionTargets[1].style.display = "";
              break;

              case this.threeBoxView:
                for(let i = 0; i < this.motionTargets.length; i++){
                  const target = this.motionTargets[i];
                  target.classList.add('default-border');
                  target.style.display = "";
                }
              break;
            }
            
        })
    }
  }

  animate(selectedAnimation){
    console.log(this.selectedAnimation);
    switch(selectedAnimation){
      case "fadeIn":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: this.staggerDuration});
      break;

      case "fadeOut":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.origin.x, y: this.origin.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: this.staggerDuration});
      break;

      // in
      case "slideInRight":
        gsap.fromTo(this.motionTargets, {x:this.left.x, y: this.left.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: this.staggerDuration});
      break;

      case "slideInLeft":
        gsap.fromTo(this.motionTargets, {x:this.right.x, y: this.right.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: this.staggerDuration});
      break;

      case "slideInUp":
        gsap.fromTo(this.motionTargets, {x:this.down.x, y: this.down.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: this.staggerDuration});
      break;

      case "slideInDown":
        gsap.fromTo(this.motionTargets, {x:this.up.x, y: this.up.y, opacity:0}, {x:this.origin.x, y: this.origin.y, opacity:1, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeInDelay(), stagger: {each:this.staggerDuration, from:"end"}});
      break;
      
      // out
      case "slideOutRight":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.right.x, y: this.right.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: this.staggerDuration});
      break;

      case "slideOutLeft":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.left.x, y: this.left.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: this.staggerDuration});
      break;

      case "slideOutUp":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.up.x, y: this.up.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: this.staggerDuration});
      break;

      case "slideOutDown":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.down.x, y: this.down.y, opacity:0, ease:this.selectedEase, duration: this.selectedDuration, delay:this.getFadeOutDelay(), stagger: {each:this.staggerDuration, from:"end"}});
      break;

      case "scaleUp":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1, scale:1}, {x:this.origin.x, y: this.origin.y, opacity:1, scale:1.5, ease:this.selectedEase, duration: this.selectedDuration, delay: this.getScaleUpDelay(), stagger: this.staggerDuration});
      break;

      case "scaleDown":
        gsap.fromTo(this.motionTargets, {x:this.origin.x, y: this.origin.y, opacity:1}, {x:this.origin.x, y: this.origin.y, opacity:1, scale:1, ease:this.selectedEase, duration: this.selectedDuration, delay: this.getScaleDownDelay(), stagger: this.staggerDuration});
      break;

      case "rotate":
        console.log(gsap.getProperty(this.motionTargets[0], "rotation"));
        const angle = gsap.getProperty(this.motionTargets[0], "rotation") == 0 ? 180 : 0;
        gsap.to(this.motionTargets, {rotate:angle, ease:this.selectedEase, duration: this.selectedDuration, stagger: this.staggerDuration});
      break;
    }
  }

  getFadeInDelay(){
    return this.motionTargets[0].style.opacity == "0" ? 0 : .33;
        
  }

  getFadeOutDelay(){
    return this.motionTargets[0].style.opacity == "0" ? .33 : 0;   
  }

  getScaleUpDelay(){
    const currentScale = gsap.getProperty(this.motionTargets[0], "scale")
    console.log(currentScale);
    return currentScale > 1 ? .33 : 0;   
  }

  getScaleDownDelay(){
    const currentScale = gsap.getProperty(this.motionTargets[0], "scale")
    console.log(currentScale);
    return currentScale > 1 ? 0 : .33;   
  }
}
