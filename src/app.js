import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";
//import { Draggable } from "gsap/Draggable";

export class App {
  constructor() {
    this.animTypeButtons = [];
    this.animSpeedButtons = [];
    this.curveButtons = [];
    this.viewButtons = [];
    this.staggerButtons = [];
    this.selectedAnimation = "";
    this.motionTargets = document.querySelectorAll('.box');
    this.summaryContent = document.getElementById('summary-content');
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

    // stagger
    this.verySlowStagger = 0.5;
    this.slowStagger = 0.3;
    this.normalStagger = 0.2;
    this.fastStagger = 0.1;
    this.veryFastStagger = 0.05;
    this.noStagger = 0;
    this.staggerDuration = this.fastStagger;

    // view
    this.boxView = "box-view"
    this.twoBoxView = "two-box-view";
    this.threeBoxView = "three-box-view";
    this.textView = "text-view";
    this.selectedView = this.boxView;
  }

  init() {
    this.initCustomEase();
    this.initProps();
    this.initButtons();
  }

  initCustomEase() {
    gsap.registerPlugin(CustomEase);
  }

  initProps() {
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
      "text": this.textView,
      "- O -": this.boxView,
      "- O O -": this.twoBoxView,
      "- O O O -": this.threeBoxView,
    }[selection]
  }

  getStagger(selection) {
    return {
      "stagger-very-slow": this.verySlowStagger,
      "stagger-slow": this.slowStagger,
      "stagger-normal": this.normalStagger,
      "stagger-fast": this.fastStagger,
      "stagger-very-fast": this.veryFastStagger,
      "stagger-none": this.noStagger,
    }[selection]
  }

  getButtonGroup(selection) {
    return {
      "type-selection": this.animTypeButtons,
      "speed-selection": this.animSpeedButtons,
      "curve-selection": this.curveButtons,
      "view-selection": this.viewButtons,
      "stagger-selection": this.staggerButtons
    }[selection]
  }

  selectButton(button, buttonGroupName) {
    const buttonGroup = this.getButtonGroup(buttonGroupName);
    for (let b of buttonGroup) {
      // console.log('this one? ', button == b)
      if (b == button) {
        b.select();
      } else {
        b.deselect();
      }
    }
  }



  initButtons() {
    // console.log('initButtons');
    const test = document.querySelector(".hhh");
    // console.log('test: ', test)
    this.initAnimTypeButtons();
    this.initAnimSpeedButtons();
    this.initCurveButtons();
    this.initViewButtons();
    this.initStaggerButtons();
  }

  initAnimTypeButtons() {
    this.animTypeButtons = document.querySelectorAll('.type-selection');
    for (let button of this.animTypeButtons) {
      button.addEventListener('click', (e) => {
        this.selectedAnimation = button.name;
        this.selectButton(button, "type-selection")
        this.animate(this.selectedAnimation);
      })
    }
  }

  initAnimSpeedButtons() {
    this.animSpeedButtons = document.querySelectorAll('.speed-selection');
    for (let button of this.animSpeedButtons) {
      button.addEventListener('click', (e) => {
        this.selectedDuration = this.getSpeed(button.name);
        this.selectButton(button, "speed-selection");
        this.animate(this.selectedAnimation);
      })
    }
  }

  initCurveButtons() {
    this.curveButtons = document.querySelectorAll('.curve-selection');
    for (let button of this.curveButtons) {
      button.addEventListener('click', (e) => {
        this.selectedEase = this.getCurve(button.name);
        this.selectButton(button, "curve-selection");
        this.animate(this.selectedAnimation);
      })
    }
  }

  initViewButtons() {
    this.viewButtons = document.querySelectorAll('.view-selection');
    for (let button of this.viewButtons) {
      button.addEventListener('click', (e) => {
        this.selectButton(button, "view-selection")
        this.selectedView = this.getView(button.name);
        switch (this.selectedView) {
          case this.textView:
            for (let target of this.motionTargets) {
              target.classList.remove('default-border');
            }
            break;

          case this.boxView:
            for (let i = 0; i < this.motionTargets.length; i++) {
              const target = this.motionTargets[i];
              target.classList.add('default-border');
              i == 0 ? target.style.display = "" : target.style.display = "none";
            }

            break;

          case this.twoBoxView:
            for (let i = 0; i < this.motionTargets.length; i++) {
              const target = this.motionTargets[i];
              target.classList.add('default-border');
              i > 1 ? target.style.display = "none" : target.style.display = "";
            }
            //this.motionTargets[1].style.display = "";
            break;

          case this.threeBoxView:
            for (let i = 0; i < this.motionTargets.length; i++) {
              const target = this.motionTargets[i];
              target.classList.add('default-border');
              target.style.display = "";
            }
            break;
        }

      })
    }
  }

  initStaggerButtons() {
    console.log('initStaggerButtons');
    this.staggerButtons = document.querySelectorAll('.stagger-selection');
    for (let button of this.staggerButtons) {
      button.addEventListener('click', (e) => {
        this.staggerDuration = this.getStagger(button.name);
        this.selectButton(button, "stagger-selection");
        this.animate(this.selectedAnimation);
      })
    }
  }

  updateSummaryContent(){
    this.summaryContent.innerText = `animation: ${this.selectedAnimation} | duration: ${this.selectedDuration} | easing: ${this.selectedEase}`;
  }

  animate(selectedAnimation) {
    this.updateSummaryContent();
    switch (selectedAnimation) {
      case "fadeIn":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay(), stagger: this.staggerDuration });
        break;

      case "fadeOut":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: this.staggerDuration });
        break;

      // in
      case "slideInRight":
        gsap.fromTo(this.motionTargets, { x: this.left.x, y: this.left.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay(), stagger: this.staggerDuration });
        break;

      case "slideInLeft":
        gsap.fromTo(this.motionTargets, { x: this.right.x, y: this.right.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay(), stagger: this.staggerDuration });
        break;

      case "slideInUp":
        gsap.fromTo(this.motionTargets, { x: this.down.x, y: this.down.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay(), stagger: this.staggerDuration });
        break;

      case "slideInDown":
        gsap.fromTo(this.motionTargets, { x: this.up.x, y: this.up.y, opacity: 0 }, { x: this.origin.x, y: this.origin.y, opacity: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeInDelay(), stagger: { each: this.staggerDuration, from: "end" } });
        break;

      // out
      case "slideOutRight":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.right.x, y: this.right.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: this.staggerDuration });
        break;

      case "slideOutLeft":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.left.x, y: this.left.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: this.staggerDuration });
        break;

      case "slideOutUp":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.up.x, y: this.up.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: this.staggerDuration });
        break;

      case "slideOutDown":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.down.x, y: this.down.y, opacity: 0, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getFadeOutDelay(), stagger: { each: this.staggerDuration, from: "end" } });
        break;

      case "scaleUp":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1.5, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleUpDelay(), stagger: this.staggerDuration });
        break;

      case "scaleDown":
        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: this.origin.x, y: this.origin.y, opacity: 1, scale: 1, ease: this.selectedEase, duration: this.selectedDuration, delay: this.getScaleDownDelay(), stagger: this.staggerDuration });
        break;

      case "rotate":
        // console.log(gsap.getProperty(this.motionTargets[0], "rotation"));
        const angle = gsap.getProperty(this.motionTargets[0], "rotation") == 0 ? 180 : 0;
        //gsap.to(this.motionTargets, { rotate: angle, ease: this.selectedEase, duration: this.selectedDuration, stagger: this.staggerDuration });

        gsap.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { rotate: angle, ease: this.selectedEase, duration: this.selectedDuration, stagger: this.staggerDuration });
        break;

      case "wiggle":
        // console.log('wiggle');
        const tl = gsap.timeline();
        tl.fromTo(this.motionTargets, { x: this.origin.x, y: this.origin.y, opacity: 1 }, { x: 5, duration: this.selectedDuration / 6, ease: this.selectedEase })
          .to(this.motionTargets, { x: -5, duration: this.selectedDuration / 6, ease: this.selectedEase, yoyo: true, repeat: 3 })
          .to(this.motionTargets, { x: 0, duration: this.selectedDuration / 6, ease: this.selectedEase });
        //gsap.to(this.motionTargets, {});
        break;

      case "expand":
        // console.log('expand');
        gsap.to(this.motionTargets[0], { height: 150, ease: this.selectedEase, duration: this.selectedDuration });
        break;

      case "contract":
        // console.log('contract', this.motionTargets[0]);
        gsap.to(this.motionTargets[0], { height: "auto", ease: this.selectedEase, duration: this.selectedDuration });
        break;
    }
  }

  getFadeInDelay() {
    return this.motionTargets[0].style.opacity == "0" ? 0 : .33;

  }

  getFadeOutDelay() {
    return this.motionTargets[0].style.opacity == "0" ? .33 : 0;
  }

  getScaleUpDelay() {
    const currentScale = gsap.getProperty(this.motionTargets[0], "scale")
    // console.log(currentScale);
    return currentScale > 1 ? .33 : 0;
  }

  getScaleDownDelay() {
    const currentScale = gsap.getProperty(this.motionTargets[0], "scale")
    // console.log(currentScale);
    return currentScale > 1 ? 0 : .33;
  }
}
