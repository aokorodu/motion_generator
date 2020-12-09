export class AnimationState {
  constructor(){
    this.selectedAnimation = "";
    // easing
    this.normalEase = "Sine.easeInOut";
    this.emphasis = "back.inOut";
    this.energetic = "energetic";
    this.linear = "linear";
    this.reveal = "Power4.easeInOut"
    this.custom = "customEase";
    this.selectedEase = this.normalEase;

    // duration
    this.verySlow = 1.33;
    this.slow = .99;
    this.normal = .66;
    this.fast = .33;
    this.veryFast = .15;
    this.instant = 0;
    this.selectedDuration = this.normal;

    // origin
    this.transformOrigin = "center center"

    // slide distance
    this.slideDistance = 50;
  }

  get duration(){
    return this.selectedDuration;
  }

  set duration(newDuration){
    this.selectedDuration = {
      "verySlow": this.verySlow,
      "slow": this.slow,
      "normal": this.normal,
      "fast": this.fast,
      "veryFast": this.veryFast,
      "instant": this.instant
    }[newDuration];

    console.log('duration: ', this.selectedDuration)
  }

  get ease(){
    return this.selectedEase;
  }

  set ease(selection) {
    this.selectedEase = {
      "normal": this.normalEase,
      "energetic": this.energetic,
      "reveal": this.reveal,
      "emphasis": this.emphasis,
      "linear": this.linear,
      "customEase": this.custom
    }[selection];
  }

  get animation(){
    return this.selectedAnimation;
  }

  set animation(newAnimation){
    this.selectedAnimation = newAnimation;
  }

  get origin(){
    return this.transformOrigin;
  }

  set origin(newOrigin){
    this.transformOrigin = newOrigin;
  }

  get distance(){
    return this.slideDistance;
  }

  set distance(newDistance){
    this.slideDistance = newDistance;
  }


}