import React, { Component, useState } from "react";
import mojs from "mo-js";
import styles from './index.css';

const MediumClap = ({ animationTimeline }) => {
  const MAXIMUM_USER_CLAP = 12;
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(42);
  const [isClicked, setIsClicked] = useState(false);

  const onClickCapHandler = () => {
    animationTimeline.replay();
    setCount(prevState => {
      if (prevState < MAXIMUM_USER_CLAP) {
        const incCount = prevState + 1;
        setTotal(prevState => prevState + 1);
        
        return incCount;
      }
      return prevState;
    });

    setIsClicked(true);
  }

  return (
    <button id="clap-btn" className={styles.clap} onClick={onClickCapHandler}>
      <ClapIcon 
        isClicked={isClicked}
      />
      <ClapCount 
        count={count}
      />
      <CountTotal 
        total={total}
      />
    </button>
  );
}
/**
 * HOC
 */

const withClapAnimation = WrappedComponent => {
  class WithClapAnimation extends Component {
    animationTimeline = new mojs.Timeline();

    state = {
      animationTimeline: this.animationTimeline
    }

    componentDidMount() {
      const timelineDuration = 300;
      const scaleButton = new mojs.Html({
        el: '#clap-btn',
        duration: timelineDuration,
        scale: {1.3: 1},
        easing: mojs.easing.ease.out
      });

      const countAnimation = new mojs.Html({
        el: '#clap-count',
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
        el: '#clap-total',
        opacity: {0: 1},
        delay: (3 * timelineDuration) / 2,
        duration: timelineDuration,
        y: {0: -3},
      });

      const triangleBurstAnimation = new mojs.Burst({
        parent: '#clap-btn',
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
        parent: '#clap-btn',
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

      const clap = document.getElementById('clap-btn');
      clap.style.transform = 'scale(1,1)';

      const newAnimationTimeline = this.animationTimeline.add([
        scaleButton, 
        countAnimation,
        countTotalAnimation,
        triangleBurstAnimation,
        circleBurstAnimation,
      ]);

      this.setState({
        animationTimeline: newAnimationTimeline,
      })
    }

    animate = () => {
      console.log('%c Animate', 'background:yellow;color:black');
    }
    render() {
      return <WrappedComponent {...this.props} animationTimeline={this.state.animationTimeline} />
    }
  }

  return WithClapAnimation;
}

/**
 * subcomponents
 */

const ClapCount = ({ count }) => {
  return (
    <span id="clap-count" className={styles.count}>+{ count }</span>
  );
  }

const CountTotal = ({ total }) => <span id="clap-total" className={styles.total}>{ total }</span>;

const ClapIcon = ({ isClicked }) => {
  return (
    <span> 
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="-549 338 100.1 125"
        className={`${styles.icon} ${isClicked && styles.checked}`}
      >
        <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
        <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
      </svg>
    </span>
  );
}

const Usage = () => {
  const AnimatedMediumClap =  withClapAnimation(MediumClap);
  return <AnimatedMediumClap />;
}

export default Usage;