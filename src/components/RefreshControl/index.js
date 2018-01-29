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
import BokePan from './BokePan/';

const style = {
  refresh: {
    display: 'inline-block',
      marginLeft: '50%'

  }
};

const distanceToRefresh = 50;
const resistance = 2.5;
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

    handlePanDown = (event) => {
        let {distance} = event;
        distance = distance / resistance;
    const { progressViewOffset } = this.props;
    if( this.isStatusLoading() ){
        return;
    }
        let percentage = distance / distanceToRefresh * 100;
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
        panningDown: true,
    });
  };
    isStatusLoading = () => {
        const {status} = this.state;
        return status === 'loading';
    }
    handlePanUp = (event) => {
        if (event.current[1] - event.origin[1] <= 0) {
            this.setState({
                percentage: 0,
            });
            return;
        }
        if (this.state.panningDown) {
            this.handlePanDown(event);
        }
    }
    // Reset all elements to their starting positions before any paning took place.
    _doReset = () => {
        this.setState({
            status: 'hide',
            panningDown: false,
        });
    };
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
    handlePanEnd = (event) => {
        if (event.current[1] - event.origin[1] <= 0) {
            this._doReset();
            return;
        }
        let {distance} = event;
        distance = distance / resistance;
        if (this.isStatusLoading() || !this.state.panningDown) {
        return;
    }
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

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            percentage: 0,
            top: -40,
            status: 'hide',
            panningDown: false, // 防止从下网上pan
        };
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
    return (
        <BokePan
            onPanDown={this.handlePanDown}
            onPanEnd={this.handlePanEnd}
            onPanUp={this.handlePanUp}
        >
          <View
              {...rest}
              style={[this.props.style]}
          >
            <RefreshIndicator
                left={-size / 2 || -20}
                percentage={percentage}
                size={size || 40}
                status={status}
                style={{
                    ...style.refresh,
                }}
                top={top}
            />
            <View
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
