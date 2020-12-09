import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";
import { AnimationState } from './animationState';

export class App {
  constructor() {
    this.animTypeButtons = [];
    this.animSpeedButtons = [];
    this.curveButtons = [];

    // ui elements
    this.summaryContent = document.getElementById('summary-content');
    this.motionTarget = document.getElementById('mt');
    this.motionChart = document.querySelector('motion-chart-component');
    this.customEaseComponent = document.getElementById('custom-ease-component');

    // animation state
    this.animationState;
  }

  init() {
    this.initAnimationState();
    this.initCustomEase();
    this.initButtons();
    this.initDistanceComponent();
    this.initScaleComponent();
    this.initScaleDistanceComponent();
    this.initMotionTarget();
    this.showChart("normal");
  }

  initAnimationState() {
    this.animationState = new AnimationState();
  }

  initMotionTarget() {
    this.motionTarget.setAnimation(this.animationState);
  }

  showChart(chartName) {
    this.motionChart.showChart(chartName);
  }

  initScaleComponent() {
    const sc = document.getElementById("scale-component");
    sc.addEventListener('newTransformOrigin', (e) => {
      this.animationState.origin = e.detail.value.replace("-", " ");
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
    })
  }

  initCustomEase() {
    gsap.registerPlugin(CustomEase);
    this.customEaseComponent.addEventListener('customEase', (e) => {
      CustomEase.create("customEase", e.detail.value);
      console.log('custom ease event detected', e.detail.value);
      this.animationState.ease = "customEase";
      this.animate();
    })

    // create energetic ease
    CustomEase.create("energetic", "M0,0 C0.00066,0.02912 0.00131,0.05823 0.00197,0.08735 0.00537,0.12646 0.00876,0.16558 0.01216,0.20469 0.01555,0.2507 0.01894,0.29672 0.02234,0.34273 0.02573,0.39272 0.02913,0.4427 0.03252,0.49268 0.03592,0.54385 0.03931,0.59503 0.04271,0.6462 0.0461,0.69606 0.0495,0.74592 0.05289,0.79579 0.05629,0.84232 0.05968,0.88885 0.06307,0.93538 0.06647,0.97679 0.06986,1.01821 0.07326,1.05962 0.07665,1.09481 0.08005,1.12999 0.08344,1.16518 0.08684,1.1933 0.09023,1.22143 0.09363,1.24955 0.09702,1.27026 0.10042,1.29097 0.10381,1.31167 0.10721,1.325 0.1106,1.33833 0.11399,1.35166 0.11739,1.35797 0.12078,1.36427 0.12418,1.37058 0.12757,1.37042 0.13097,1.37026 0.13436,1.37011 0.13776,1.36443 0.14115,1.35876 0.14455,1.35309 0.14794,1.34277 0.15134,1.33246 0.15473,1.32215 0.15813,1.30834 0.16152,1.29454 0.16491,1.28073 0.16831,1.26447 0.1717,1.24821 0.1751,1.23194 0.17849,1.21425 0.18189,1.19656 0.18528,1.17886 0.18868,1.16078 0.19207,1.14269 0.19547,1.1246 0.19886,1.10695 0.20226,1.08929 0.20565,1.07164 0.20905,1.05522 0.21244,1.0388 0.21583,1.02237 0.21923,1.00774 0.22262,0.9931 0.22602,0.97846 0.22941,0.966 0.23281,0.95355 0.2362,0.94109 0.2396,0.93118 0.24299,0.92126 0.24639,0.91134 0.24978,0.904 0.25318,0.89666 0.25657,0.88933 0.25996,0.8846 0.26336,0.87988 0.26675,0.87516 0.27015,0.87294 0.27354,0.87072 0.27694,0.8685 0.28033,0.86854 0.28373,0.86858 0.28712,0.86862 0.29052,0.87064 0.29391,0.87266 0.29731,0.87469 0.3007,0.87834 0.3041,0.88199 0.30749,0.88564 0.31088,0.89052 0.31428,0.89539 0.31767,0.90027 0.32107,0.90603 0.32446,0.91178 0.32786,0.91753 0.33125,0.9238 0.33465,0.93006 0.33804,0.93633 0.34144,0.94272 0.34483,0.94911 0.34823,0.95549 0.35162,0.96172 0.35502,0.96795 0.35841,0.97418 0.3618,0.97997 0.3652,0.98576 0.36859,0.99155 0.37199,0.99675 0.37538,1.00194 0.37878,1.00714 0.38217,1.01154 0.38557,1.01595 0.38896,1.02035 0.39236,1.02388 0.39575,1.02741 0.39915,1.03094 0.40254,1.03352 0.40594,1.0361 0.40933,1.03868 0.41272,1.04034 0.41612,1.04201 0.41951,1.04367 0.42291,1.04447 0.4263,1.04526 0.4297,1.04605 0.43309,1.04602 0.43649,1.04598 0.43988,1.04594 0.44328,1.04522 0.44667,1.04451 0.45007,1.04379 0.45346,1.04252 0.45686,1.04126 0.46025,1.03999 0.46364,1.03824 0.46704,1.03649 0.47043,1.03475 0.47383,1.03273 0.47722,1.0307 0.48062,1.02868 0.48401,1.02646 0.48741,1.02424 0.4908,1.02202 0.4942,1.01975 0.49759,1.01749 0.50099,1.01523 0.50438,1.01305 0.50777,1.01087 0.51117,1.00869 0.51456,1.00662 0.51796,1.00456 0.52135,1.0025 0.52475,1.00067 0.52814,0.99885 0.53154,0.99702 0.53493,0.99548 0.53833,0.99393 0.54172,0.99238 0.54512,0.99111 0.54851,0.98984 0.55191,0.98858 0.5553,0.98766 0.55869,0.98675 0.56209,0.98584 0.56548,0.98524 0.56888,0.98465 0.57227,0.98405 0.57567,0.98378 0.57906,0.9835 0.58246,0.98322 0.58585,0.98322 0.58925,0.98322 0.59264,0.98322 0.59604,0.9835 0.59943,0.98378 0.60283,0.98405 0.60622,0.98449 0.60961,0.98493 0.61301,0.98536 0.6164,0.986 0.6198,0.98663 0.62319,0.98727 0.62659,0.98798 0.62998,0.98869 0.63338,0.98941 0.63677,0.99016 0.64017,0.99092 0.64356,0.99167 0.64696,0.9925 0.65035,0.99334 0.65375,0.99417 0.65714,0.99492 0.66053,0.99568 0.66393,0.99643 0.66732,0.99718 0.67072,0.99794 0.67411,0.99869 0.67751,0.99933 0.6809,0.99996 0.6843,1.0006 0.68769,1.00115 0.69109,1.00171 0.69448,1.00226 0.69788,1.0027 0.70127,1.00313 0.70466,1.00357 0.70806,1.00389 0.71145,1.0042 0.71485,1.00452 0.71824,1.00472 0.72164,1.00492 0.72503,1.00512 0.72843,1.00524 0.73182,1.00536 0.73522,1.00547 0.73861,1.00547 0.74201,1.00547 0.7454,1.00547 0.7488,1.00536 0.75219,1.00524 0.75558,1.00512 0.75898,1.00496 0.76237,1.0048 0.76577,1.00464 0.76916,1.00444 0.77256,1.00424 0.77595,1.00405 0.77935,1.00377 0.78274,1.00349 0.78614,1.00321 0.78953,1.00298 0.79293,1.00274 0.79632,1.0025 0.79972,1.00218 0.80311,1.00186 0.8065,1.00155 0.8099,1.00127 0.81329,1.00099 0.81669,1.00071 0.82008,1.00048 0.82348,1.00024 0.82687,1 0.83027,0.99976 0.83366,0.99952 0.83706,0.99929 0.84045,0.99909 0.84385,0.99889 0.84724,0.99869 0.85064,0.99853 0.85403,0.99837 0.85742,0.99821 0.86082,0.99814 0.86421,0.99806 0.86761,0.99798 0.871,0.9979 0.8744,0.99782 0.87779,0.99774 0.88119,0.9977 0.88458,0.99766 0.88798,0.99762 0.89137,0.99762 0.89477,0.99762 0.89816,0.99762 0.90155,0.99766 0.90495,0.9977 0.90834,0.99774 0.91174,0.99778 0.91513,0.99782 0.91853,0.99786 0.92192,0.99794 0.92532,0.99802 0.92871,0.9981 0.93211,0.99818 0.9355,0.99825 0.9389,0.99833 0.94229,0.99845 0.94569,0.99857 0.94908,0.99869 0.95247,0.99877 0.95587,0.99885 0.95926,0.99893 0.96266,0.99905 0.96605,0.99917 0.96945,0.99929 0.97284,0.99937 0.97624,0.99944 0.97963,0.99952 0.98303,0.9996 0.98642,0.99968 0.98982,0.99976 0.99321,0.99984 0.99661,0.99992 1,1 ");
  }

  getButtonGroup(selection) {
    return {
      "type-selection": this.animTypeButtons,
      "speed-selection": this.animSpeedButtons,
      "curve-selection": this.curveButtons,
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
  }

  initAnimTypeButtons() {
    this.animTypeButtons = document.querySelectorAll('.type-selection');
    for (let button of this.animTypeButtons) {
      button.addEventListener('click', (e) => {
        this.animationState.animation = button.name;
        this.selectButton(button, "type-selection")
        this.animate();

      })
    }
  }

  initAnimSpeedButtons() {
    this.animSpeedButtons = document.querySelectorAll('.speed-selection');
    for (let button of this.animSpeedButtons) {
      button.addEventListener('click', (e) => {
        this.animationState.duration = button.name;
        this.selectButton(button, "speed-selection");
        this.animate();
      })
    }
  }

  initCurveButtons() {
    this.curveButtons = document.querySelectorAll('.curve-selection');
    for (let button of this.curveButtons) {
      button.addEventListener('click', (e) => {
        this.animationState.ease = button.name;
        this.showChart(button.name);
        this.selectButton(button, "curve-selection");
        this.animate();
      })
    }
  }

  updateSummaryContent() {
    this.summaryContent.update(this.animationState.animation, this.animationState.duration, this.animationState.ease, this.motionTarget.slideDistance, this.animationState.origin);
  }

  animate() {
    this.updateSummaryContent();
    this.motionTarget.runAnimation();
  }
}
