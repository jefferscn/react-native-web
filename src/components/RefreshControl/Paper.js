import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import propTypes from '../utils/propTypes';
import transitions from './transitions';

function getStyles(props, context) {
  const { rounded, circle, transitionEnabled, zDepth } = props;

  const paper = {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    zDepthShadows: [
      '0 1px 6px rgba(0, 0, 0, 0.12),\n         0 1px 4px rgba(0, 0, 0, 0.12)',
      '0 3px 10px rgba(0, 0, 0, 0.16),\n         0 3px 10px rgba(0, 0, 0, 0.23)',
      '0 10px 30px rgba(0, 0, 0, 0.19),\n         0 6px 10px rgba(0, 0, 0, 0.23)',
      '0 14px 45px rgba(0, 0, 0, 0.25),\n         0 10px 18px rgba(0, 0, 0, 0.22)',
      '0 19px 60px rgba(0, 0, 0, 0.3),\n         0 15px 20px rgba(0, 0, 0, 0.22)'
    ]
  };
  const borderRadius = 2;
  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && transitions.easeOut(),
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? borderRadius : '0px'
    }
  };
}

class Paper extends Component {
  static propTypes = {
    /**
     * Children passed into the paper element.
     */
    children: PropTypes.node,
    /**
     * Set to true to generate a circlular paper container.
     */
    circle: PropTypes.bool,
    /**
     * By default, the paper container will have a border radius.
     * Set this to false to generate a container with sharp corners.
     */
    rounded: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Set to false to disable CSS transitions for the paper element.
     */
    transitionEnabled: PropTypes.bool
    // /**
    //  * This number represents the zDepth of the paper shadow.
    //  */
    // zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    circle: false,
    rounded: true,
    transitionEnabled: true,
    zDepth: 1
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    const {
      children,
      circle, // eslint-disable-line no-unused-vars
      rounded, // eslint-disable-line no-unused-vars
      style,
      transitionEnabled, // eslint-disable-line no-unused-vars
      zDepth, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const styles = getStyles(this.props, this.context);

    return (
      <div {...other} style={Object.assign(styles.root, style)}>
        {children}
      </div>
    );
  }
}

export default Paper;
