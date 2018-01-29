import React, { Component } from 'react';

class BokePan extends Component {
    constructor(props) {
        super(props);

        this.preV = {
            x: null,
            y: null,
        };
        this.multiTouch = false;
        this.panning = false;
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchCancel = this.handleTouchCancel.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.emitEvent = this.emitEvent.bind(this);
    }
    panDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
    }
    handleTouchStart(event) {
        if (!event.touches) {
            return;
        }
        this.now = Date.now();
        this.x1 = event.touches[0].pageX;
        this.y1 = event.touches[0].pageY;
    }

    handleTouchMove(event) {
        const { pageX, pageY } = event.touches[0];
        this.x2 = pageX;
        this.y2 = pageY;
        this.end = Date.now();
        event.origin = [this.x1, this.y1];
        if (this.multiTouch === false &&
            (
                (this.x2 && Math.abs(this.x1 - this.x2) > 10) ||
                (this.y2 && Math.abs(this.preV.y = this.y2) > 10)
            )

        ) {
            // pan start
            if (this.panning === false) {
                this.panning = true;
                this.panStartTimeout = setTimeout(() => {
                    this.emitEvent('onPanStart', event);
                }, 0);
            }
            // pan move
            event.direction = this.panDirection(this.x1, this.x2, this.y1, this.y2);
            event.distance = Math.abs(this.y1 - this.y2);
            this.panTimeout = setTimeout(() => {
                this.emitEvent(`onPan${event.direction}`, event);
            }, 0);
        }
    }
    handleTouchCancel() {
        clearTimeout(this.panStartTimeout);
        clearTimeout(this.panEndTimeout);
        clearTimeout(this.panTimeout);
    }
    handleTouchEnd(event) {
        event.distance = Math.abs(this.y1 - this.y2);
        // end
        if (this.panning === true) {
            this.panEndTimeout = setTimeout(() => {
                this.emitEvent('onPanEnd', event);
            }, 0);
        }
        this.preV.x = 0;
        this.preV.y = 0;
        this.scale = 1;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.multiTouch = false;
        this.panning = false;
    }
    emitEvent(name, ...arg) {
        if (this.props[name]) {
            this.props[name](...arg);
        }
    }
    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchMove,
            onTouchCancel: this.handleTouchCancel,
            onTouchEnd: this.handleTouchEnd,
        });
    }
}

export default BokePan;
