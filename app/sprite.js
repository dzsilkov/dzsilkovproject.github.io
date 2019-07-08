(function (window) {
  class Sprite {
    constructor(options) {
      this.framePosX = options.framePosX;
      this.framePosY = options.framePosY;
      this.frameWidth = options.frameWidth;
      this.frameHeight = options.frameHeight;
      this.animationSpeed = options.animationSpeed || 0;
      this.arrFrames = options.arrFrames || [0];
      this.frameIndex = 0;
      this.image = options.image;
      this.animateDirection = options.animateDirection || 'horizontal';
      this.drawWidth = options.drawWidth;
      this.drawHeight = options.drawHeight;
      this.once = options.once;
    };

    update(dt) {
      this.frameIndex += this.animationSpeed * dt;
    };

    render(context) {
      let frame;

      if(this.animationSpeed > 0) {
        let maxFrame = this.arrFrames.length;
        let activeFrameIndex = Math.floor(this.frameIndex);
        frame = this.arrFrames[activeFrameIndex % maxFrame];

        if(this.once && activeFrameIndex >= maxFrame) {
          return;
        }
      }
      else {
        frame = 0;
      }

      let x = this.framePosX;
      let y = this.framePosY;

      if (this.animateDirection === 'horizontal') {
        x += frame * this.frameWidth;
      }
      else {
        y += frame * this.frameHeight;
      }

      context.drawImage(
        this.image,
        x,
        y,
        this.frameWidth,
        this.frameHeight,
        0,
        0,
        this.drawWidth,
        this.drawHeight);
    };
  }
  window.gameJS = window.gameJS || {};
  window.gameJS.Sprite = Sprite;
})(window);