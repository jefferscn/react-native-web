/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RefreshControl
 * @flow
 */

import ColorPropType from '../../propTypes/ColorPropType';
import View from '../View';
import RefreshIndicator from './RefreshIndicator';
import ViewPropTypes from '../View/ViewPropTypes';
import { arrayOf, bool, func, number, oneOf, string } from 'prop-types';
import React, { Component } from 'react';
import webPullToRefresh from './wptc';
import findNodeHandle from '../../modules/findNodeHandle';
import BokePan from './BokePan/';

const style = {
  refresh: {
    display: 'inline-block',
  }
};

class RefreshControl extends Component<*> {
  static propTypes = {
    ...ViewPropTypes,
    colors: arrayOf(ColorPropType),
    enabled: bool,
    onRefresh: func,
    progressBackgroundColor: ColorPropType,
    progressViewOffset: number,
    refreshing: bool.isRequired,
    size: oneOf([0, 1]),
    tintColor: ColorPropType,
    title: string,
    titleColor: ColorPropType
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      percentage: 0,
      top: -40,
        status: 'hide',
    };
  }

  handleRefresh = () => {
    return new Promise((resolve, reject) => {
      this.props.onRefresh(resolve, reject);
    });
  };
  isStatusLoading = () => {
      const { status } = this.state;
      return status === 'loading';
  }
  handlePanDown = (distance, distanceToRefresh) => {
    const { progressViewOffset } = this.props;
    if( this.isStatusLoading() ){
        return;
    }
    // Use transforms to smoothly animate elements on desktop and mobile devices
    let percentage = (distance - 20) / distanceToRefresh * 100;
    // 减震
    if (percentage > 100) {
        percentage = 100 + (percentage - 100) / 4;
    }
    percentage = parseInt(percentage, 10);
    const top = progressViewOffset + distance;

    this.setState({
      status: 'ready',
      scrolling: true,
      top,
      percentage: percentage,
/*        // the code below may be use in iOS
      ptrRefTransform: [
        // {translateY: `${ty}px`},
        { rotate: `${rotateAngle}deg` }
      ],
      contentRefTransform: `translate3d( 0, ${distance}px, 0 )`,*/
    });
  };
  // Position content and refresh elements to show that loading is taking place.
  _doLoading = () => {
    const { onRefresh, progressViewOffset } = this.props;
    if (!onRefresh) {
      return this._doReset();
    }
    this.setState({
      status: 'loading',
      top: progressViewOffset
    });

    // For UX continuity, make sure we show loading for at least one second before resetting

    setTimeout(() => {
      // Once actual loading is complete, reset pull to refresh
      onRefresh().then(this._doReset);
    }, 1000);
  };

  // Reset all elements to their starting positions before any paning took place.
  _doReset = () => {
    this.setState({
        status: 'hide',
    });
  };

  handlePanEnd = (distance, distanceToRefresh) => {
    if( this.isStatusLoading() ){
        return;
    }
    // Set/remove the loading body class to show or hide the loading indicator after pull down.
    let canRefresh = false;
    if (distance > distanceToRefresh) {
      canRefresh = true;
    }
    if (canRefresh) {
      this._doLoading();
    } else {
      this._doReset();
    }
  };
  _init = () => {
    if (!this.state.initialized) {
      webPullToRefresh().init({
        contentEl: this._contentRef,
        ptrEl: this.ptrRef,
        bodyEl: this.bodyRef,
        distanceToRefresh: this.props.distanceToRefresh || undefined,
        loadingFunction: this.handleRefresh,
        resistance: this.props.resistance || undefined,
        hammerOptions: this.props.hammerOptions || undefined,
        handlePanDown: this.handlePanDown || undefined,
        handlePanEnd: this.handlePanEnd || undefined
      });
      this.setState({
        initialized: true
      });
    }
  };
  _setContentRef = el => {
    this._contentRef = findNodeHandle(el);
  };
  _setBodyRef = el => {
    this.bodyRef = findNodeHandle(el);
  };
  componentDidMount() {
    if (!this.props.refreshing) {
      this._init();
    }
  }
  componentDidUpdate() {
    if (!this.props.refreshing) {
      this._init();
    }
  }

  render() {
    const {
      /* eslint-disable */
      colors,
      enabled,
      onRefresh,
      progressBackgroundColor,
      progressViewOffset,
      refreshing,
      size,
      tintColor,
      title,
      titleColor,
      /* eslint-enable */
      ...rest
    } = this.props;
    const { percentage, top, status } = this.state;
    console.log(status);
    if(status === 'loading'){
      console.log(this.state)
    }
      if(status === 'hide'){
          console.log(this.state)
          console.log(this.props)
      }
    return (
        <BokePan

          onPanDown={(e) => {
              console.log(e.direction);
          }}
          onPanEnd={ (e) => {
              console.log('pan end callbak');
              // console.log(e.direction);
              // console.log(e);
          }}
          onPanStart = {(e) => {
              console.log('start');
              console.log(e.direction);
          }}
          onPanUp={
              (e) => {
                  console.log(e.direction);
              }
          }


        >
          <View
              ref={this._setBodyRef}
              {...rest}
              style={[this.props.style]}
          >
            <RefreshIndicator
                left={-20}
                percentage={percentage}
                size={40}
                status={status}
                style={{
                    ...style.refresh,
                    marginLeft: '50%'
                }}
                top={top}
            />
            <View
                ref={this._setContentRef}
                style={{
                    flex: 1,
                }}
            >
              <View {...rest}
                    style={{
                        flex: 1,
                    }}
              />
            </View>
          </View>
        </BokePan>

    );
  }
}

export default RefreshControl;
