/*
 * YO check out the repository for updates
 * http://github.com/aconbere/event-emitter
 *
 */
var Evented = function () {
  this.listeners = {};
};

Evented.prototype.trigger = function (ev, data) {
  var callbacks = this.listeners[ev];

  if (!callbacks) {
    this.listeners[ev] = [];
  }

  var cl = callbacks.length;

  for (var i = 0; i < cl; i++) {
    callbacks[i].apply(null, data);
  }
};


Evented.prototype.bind = function (ev, callback) {
  if (!this.listeners[ev]) {
    this.listeners[ev] = [];
  }

  this.listeners[ev].push(callback);
};

Evented.prototype.unbindAll = function () {
  this.listeners = {};
};

if (typeof window === "undefined") {
  exports.Evented = Evented;
}
