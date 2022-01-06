import React, { useLayoutEffect, useState } from 'react';
import mojs from 'mo-js';

const useClapAnimation = ({
  clapEl,
  countEl,
  clapTotalEl,
}) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    () => new mojs.Timeline()
  );

  useLayoutEffect(() => {
    if (!(clapEl && clapTotalEl && countEl)) {
      return;
    }

    const timelineDuration = 300;
    const scaleButton = new mojs.Html({
      el: clapEl,
      duration: timelineDuration,
      scale: {1.3: 1},
      easing: mojs.easing.ease.out
    });

    const countAnimation = new mojs.Html({
      el: countEl,
      opacity: {0: 1},
      y: {0: -30},
      duration: timelineDuration,
    })
    .then({
      opacity: {1: 0},
      y: -80,
      delay: timelineDuration / 2,
    });

    const countTotalAnimation = new mojs.Html({
      el: clapTotalEl,
      opacity: {0: 1},
      delay: (3 * timelineDuration) / 2,
      duration: timelineDuration,
      y: {0: -3},
    });

    const triangleBurstAnimation = new mojs.Burst({
      parent: clapEl,
      radius:{50: 95},
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: {6: 0},
        stroke: 'rgba(211,54,0,0.5)',
        strokeWidth: 2,
        angle: 210,
        speed: 0.2,
        delay: 30,
        duration: timelineDuration,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const circleBurstAnimation = new mojs.Burst({
      parent: clapEl,
      radius:{50: 75},
      angle: 25,
      duration: timelineDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(148,165,166,0.5)',
        speed: 0.2,
        delay: 30,
        radius:{3: 0},
        duration: timelineDuration,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    if (typeof clapEl === 'string') {
      const clap = document.getElementById(clapEl);
      clap.style.transform = 'scale(1,1)';
    } 
    else {
      clapEl.style.transform = 'scale(1,1)';
    }

    const newAnimationTimeline = animationTimeline.add([
      scaleButton, 
      countAnimation,
      countTotalAnimation,
      triangleBurstAnimation,
      circleBurstAnimation,
    ]);

    setAnimationTimeline(newAnimationTimeline);
  }, [clapEl, clapTotalEl, countEl]);

  return animationTimeline;
}

export default useClapAnimation;