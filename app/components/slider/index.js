import React, { Component, PropTypes } from 'react';

import styles from './slider.scss';

const convertToPercent = (number) => number * 100 + '%';

class Slider extends Component {
    constructor() {
        super();

        this.mouseData = {};
        this.cssInfo = {};
    };

    static propTypes = {
        autoplay: PropTypes.bool,
        speed: PropTypes.number, // animation speed
        autoplayDuration: PropTypes.number, // stop time
        // animation: PropTypes.oneOf(['fade', 'translate']), // 'fade' | 'translate'
        infinite: PropTypes.bool,
        arrows: PropTypes.bool, // whether to show arrow
        indicators: PropTypes.bool, // whether to show dots
        direction: PropTypes.oneOf(['left', 'right']),
        current: PropTypes.number,
        percentToSlide: PropTypes.number // (0-1),  
    };

    static defaultProps = {
        // animation: 'fade',
        direction: 'right',
        current: 0,
        speed: 800,
        autoplayDuration: 4000,
        autoplay: true,
        arrows: true,
        percentToSlide: 0.1,
        indicators: true
    };

    componentWillMount() {
        this.state = {
            current: ~~this.props.current,
            direction: this.props.direction,
            infinite: this.props.infinite && this.props.children.length > 2
        };
    };

    componentDidMount() {
        // setTimeout(() => this.autoplay(), this.props.autoplayDuration);
        this.cssInfo.itemWidth = (this.refs.wrapper.firstChild || this.refs.wrapper).clientWidth;
        this.autoplay();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: ~~nextProps.current,
            direction: this.props.direction
        });
    };

    componentDidUpdate() {
        this.autoplay();
    };

    getStyle() {
        const count = this.props.children.length;
        return {
            width: count ? count + '00%' : '100%',
            left: this.state.current ? -this.state.current + '00%' : 0
        }
    };

    getChildStyle(index) {
        const count = this.props.children.length;
        return {
            // left: index === 0 ? 0 : convertToPercent(index / count),
            width: convertToPercent(1 / count)
        };
    };


    handleMouseDown(ev) {
        ev.preventDefault();
        this.mouseData.down = true;
        this.mouseData.x = ev.pageX;
        this.mouseData.y = ev.pageY;
        this.cssInfo.itemWidth = (this.refs.wrapper.firstChild || this.refs.wrapper).clientWidth;
    };
    handleMouseMove(ev) {
        if (!this.mouseData.down) return;
        const delta = ev.pageX - this.mouseData.x;
        this.setStyle(convertToPercent(- this.state.current + delta / this.cssInfo.itemWidth));
    };
    handleMouseUp(ev) {
        this.mouseData.down = false;
        const delta = ev.pageX - this.mouseData.x;
        const rate = delta / this.cssInfo.itemWidth;
        if (Math.abs(rate) < this.props.percentToSlide) {
            return this.slide(0, -this.state.current + rate);
        }

        this[delta > 0 ? 'slidePrevious' : 'slideNext'](-this.state.current + rate);
    };
    handleArrowClick(step, ev) {
        step < 0 ? this.slidePrevious() : this.slideNext();
    };
    runAnimation(startValue, endValue, time, endCallback) {
        const start = Date.now();
        let needNextTurn = true;
        const run = () => {
            let delta = Date.now() - start;
            if (!needNextTurn) {
                return endCallback && endCallback();
            }
            let value = Math.min((delta / time), 1) * (endValue - startValue);
            needNextTurn = delta < time;
            this.setStyle(convertToPercent(startValue + value));
            requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
    };
    slide(step, startValue) {
        const state = this.state;
        const count = this.props.children.length;
        let endValue;
        if (!state.infinite && (state.current === 0 && step < 0 ||
            state.current === count - 1 && step > 0)) {
            if (!startValue) return;
            endValue = -state.current;
        } else {
            endValue = -state.current - step;
        }
        if (startValue == null) {
            startValue = -state.current;
        }
        const time = this.props.speed * Math.abs((endValue - startValue) / (step || 1));
        this.runAnimation(startValue, endValue, time, () => {
            this.setState({
                current: -endValue
            });
        });
    };
    slidePrevious(startValue) {
        this.slide(-1, startValue);
    };
    slideNext(startValue) {
        this.slide(1, startValue);
    };
    setStyle(left) {
        this.refs.wrapper.style.left = left;
    };
    autoplay() {
        if (!this.props.autoplay) {
            return this.timeId && clearTimeout(this.timeId);
        }
        this.timeId = setTimeout(() => {
            this[this.state.direction === 'left' ? 'slidePrevious' : 'slideNext']();
        }, this.props.autoplayDuration + this.props.speed);
    };

    render() {
        return (
            <div className={styles.container}>
                <ul ref='wrapper' className={styles.wrapper} style={this.getStyle()} onMouseDown={this.handleMouseDown.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}>
                    { this.props.children.map((child, index) => (
                        <li key={index} className={styles.slide} style={this.getChildStyle(index)}>{child}</li>
                    ))}
                </ul>
                {
                    this.props.arrows ? [
                        <span key='arrow0' onClick={this.handleArrowClick.bind(this, -1)} className={[styles.arrow, styles.prev].join(' ')} ref='prevArrow' disabled={this.state.current === 0}>prev</span>, 
                        <span key='arrow1' onClick={this.handleArrowClick.bind(this, 1)} className={[styles.arrow, styles.next].join(' ')} ref='nextArrow' disabled={this.state.current === this.props.children.length - 1}>next</span>
                    ] : null
                }
                {
                    this.props.indicators ? (
                        <div ref='indicatorWrapper' className={styles.indicatorWrapper}>
                            { this.props.children.map((child, index) => (
                                <span key={index} className={styles.indicator + ( index === this.state.current ? ' ' + styles.active : '')}></span>
                            ))}
                        </div>
                    ) : null
                }
            </div>
        );
    };
}

export default Slider;
