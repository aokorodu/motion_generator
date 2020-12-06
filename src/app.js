import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";

export class App {
  constructor() {
    this.animTypeButtons = [];
    this.animSpeedButtons = [];
    this.curveButtons = [];
    this.viewButtons = [];
    this.staggerButtons = [];
    this.selectedAnimation = "";
    this.summaryContent = document.getElementById('summary-content');

    this.motionTarget = document.getElementById('mt');

    this.motionChart = document.querySelector('motion-chart-component');

    this.customEaseComponent = document.getElementById('custom-ease-component');

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

    // origin
    this.transformOrigin = "center center"
  }

  init() {
    this.initCustomEase();
    this.initProps();
    this.initButtons();
    this.initDistanceComponent();
    this.initScaleComponent();
    this.initScaleDistanceComponent();
    this.initAccordians();
    this.initMotionTarget();
    this.showChart();
  }

  initMotionTarget(){
    this.motionTarget.setAnimation(this.selectedAnimation, this.selectedDuration, this.selectedEase);
  }

  showChart(chartName){
    this.motionChart.showChart(chartName);
  }

  initAccordians() {
    const accordians = document.querySelectorAll('.accordian');
    for (let accord of accordians) {
      accord.addEventListener("click", () => {
        console.log('click')
        const panel = accord.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      })
    }
  }

  initScaleComponent() {
    const sc = document.getElementById("scale-component");
    sc.addEventListener('newTransformOrigin', (e) => {

      this.transformOrigin = e.detail.value.replace("-", " ");
      this.motionTarget.updateOrigin(this.transformOrigin);
      this.updateSummaryContent();
      this.animate();
    })
  }

  initScaleDistanceComponent() {
    const dc = document.getElementById("scale-distance-component");
    dc.addEventListener('newScaleDistance', (e) => {
      console.log('scale distance: ', e.detail.value)
      this.motionTarget.updateScaleDistance(e.detail.value);
      this.animate();
    })
  }
  

  initDistanceComponent() {
    const dc = document.getElementById("distance-component");
    dc.addEventListener('newDistance', (e) => {
      this.motionTarget.updateSlideDistance(e.detail.value);
      this.animate();
      // TODO: summary text that shows distance
    })
  }

  initCustomEase() {
    gsap.registerPlugin(CustomEase);
    this.customEaseComponent.addEventListener('customEase', (e)=>{
      CustomEase.create("customEase", e.detail.value);
      console.log('custom ease event detected', e.detail.value);
      this.selectedEase = "customEase";
      this.animate();
    })
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
      "custom": this.linear
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
      if (b == button) {
        b.select();
      } else {
        b.deselect();
      }
    }
  }

  initButtons() {
    const test = document.querySelector(".hhh");
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
        this.showChart(button.name);
        this.selectButton(button, "type-selection")
        this.animate();
        
      })
    }
  }

  initAnimSpeedButtons() {
    this.animSpeedButtons = document.querySelectorAll('.speed-selection');
    for (let button of this.animSpeedButtons) {
      button.addEventListener('click', (e) => {
        this.selectedDuration = this.getSpeed(button.name);
        this.selectButton(button, "speed-selection");
        this.animate();
      })
    }
  }

  initCurveButtons() {
    this.curveButtons = document.querySelectorAll('.curve-selection');
    for (let button of this.curveButtons) {
      button.addEventListener('click', (e) => {
        this.selectedEase = this.getCurve(button.name);
        this.selectButton(button, "curve-selection");
        this.animate();
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
        this.animate();
      })
    }
  }

  updateSummaryContent() {
    this.summaryContent.innerText = `animation: ${this.selectedAnimation}  |  duration: ${this.selectedDuration}  |  easing: ${this.selectedEase}  |  transform-origin: ${this.transformOrigin}`;
  }

  animate() {
    this.updateSummaryContent();
    this.motionTarget.setAnimation(this.selectedAnimation, this.selectedDuration, this.selectedEase);
    this.motionTarget.runAnimation();
  }
}
