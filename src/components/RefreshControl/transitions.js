export default {
  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || this.easeOutFunction;

    if (property && Object.prototype.toString.call(property) === '[object Array]') {
      let transitions = '';
      for (let i = 0; i < property.length; i++) {
        if (transitions) transitions += ',';
        transitions += this.create(duration, property[i], delay, easeFunction);
      }

      return transitions;
    } else {
      return this.create(duration, property, delay, easeFunction);
    }
  },
  create(property, duration, delay, easeFunction) {
    property = property || 'all';
    duration = duration || '450ms';
    easeFunction = easeFunction || 'linear';
    delay = delay || '0ms';

    return `${property} ${duration} ${easeFunction} ${delay}`;
  }
};
