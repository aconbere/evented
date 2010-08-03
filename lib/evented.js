/*
 * YO check out the repository for updates
 * http://github.com/aconbere/event-emitter
 *
 */
var Evented = function () {
  this.listeners = {};
};

Evented.prototype.trigger = function (ev, data) {
  if (!this.listeners[ev]) {
    this.listeners[ev] = [];
  }

  var cl = this.listeners[ev].length;

  for (var i = 0; i < cl; i++) {
    this.listeners[ev][i].apply({}, data);
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
