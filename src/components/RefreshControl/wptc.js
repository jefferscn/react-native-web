import Hammer from 'hammerjs';
const defaults = {
    distanceToRefresh: 50, // Number of pixels of panning until refresh
    loadingFunction: false, // Pointer to function that does the loading and returns a promise
    resistance: 2.5, // Dragging resistance level
};
export default  () => {
  let options = {};
   // Pan event parameters
  const pan = {
    enabled: false,
    distance: 0,
    startingPositionY: 0
  };
   // Initialize pull to refresh, hammer, and bind pan events.
  const init = (params) => {
    params = params || {};
    options = {
      contentEl: params.contentEl,
      bodyEl: params.bodyEl,
      distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
      loadingFunction: params.loadingFunction || defaults.loadingFunction,
      resistance: params.resistance || defaults.resistance,
      hammerOptions: params.hammerOptions || {},
      handlePanDown: params.handlePanDown,
      handlePanEnd: params.handlePanEnd
    };
    if (!options.contentEl) {
      return false;
    }
    const h = new Hammer(options.contentEl, options.hammerOptions);
    h.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
    h.on('panstart', _panStart);
    h.on('pandown', _panDown);
    h.on('panup', _panUp);
    h.on('panend', _panEnd);
  };
   // Determine whether pan events should apply based on scroll position on panstart
  const _panStart = (e) => {
      pan.startingPositionY = options.bodyEl.scrollTop;
    if (pan.startingPositionY === 0) {
      pan.enabled = true;
    }
  };
  const _panDown = (e) => {
    if (!pan.enabled) {
      return;
    }
    e.preventDefault();
    pan.distance = e.distance / options.resistance;
    options.handlePanDown(pan.distance, options.distanceToRefresh);
  };
  const _panUp = (e) => {
    if (!pan.enabled || pan.distance === 0) {
      return;
    }
    e.preventDefault();
    if (pan.distance < e.distance / options.resistance) {
      pan.distance = 0;
    } else {
      pan.distance = e.distance / options.resistance;
    }
    options.handlePanDown(pan.distance, options.distanceToRefresh);
  };
   // Determine how to animate and position elements when the panend event fires.
  const _panEnd = (e) => {
      if (!pan.enabled) {
      return;
    }
    e.preventDefault();
    options.handlePanEnd(pan.distance, options.distanceToRefresh);
    pan.distance = 0;
    pan.enabled = false;
  };
  return {
    init: init
  };
}
