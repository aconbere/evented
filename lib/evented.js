/*
 * YO check out the repository for updates
 * http://github.com/aconbere/event-emitter
 *
 */
var EventEmitter = function () {
  this.listeners = {};
};

EventEmitter.prototype.trigger = function (ev, data) {
  var callbacks = this.listeners[ev];

  if (!callbacks) {
    this.listeners[ev] = [];
  }

  var cl = callbacks.length;

  for (var i = 0; i < cl; i++) {
    callbacks[i].apply(null, data);
  }
};

EventEmitter.prototype.bind = function (ev, callback) {
  if (!this.listeners[ev]) {
    this.listeners[ev] = [];
  }

  this.listeners[ev].push(callback);
};
