/*
 * YO check out the repository for updates
 * http://github.com/aconbere/evented
 *
 */
var Evented = function () {
  this.listeners = {};
  this.listenersOnce = {};
};

Evented.prototype.withListeners = function (ev, callback) {
  if (!this.listeners[ev]) {
    this.listeners[ev] = [];
  }

  if (!this.listenersOnce[ev]) {
    this.listenersOnce[ev] = [];
  }

  if (callback) {
    callback(this.listeners[ev], this.listenersOnce[ev]);
  }
};

Evented.prototype.trigger = function (ev, data) {
  data = data || [];

  var that = this;
  this.withListeners(ev, function (listeners, listenersOnce) {
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(null, data);
    }

    for (var i = 0; i < listenersOnce.length; i++) {
      listenersOnce[i].apply(null, data);
    }
    // reset any of the once listeners for this event
    that.listenersOnce[ev] = [];
  });
};


Evented.prototype.bind = function (ev, callback) {
  this.withListeners(ev, function (listeners, _listenersOnce) {
    listeners.push(callback);
  });
};

Evented.prototype.bindOnce = function (ev, callback) {
  this.withListeners(ev, function (_listeners, listenersOnce) {
    listenersOnce.push(callback);
  });
};

Evented.prototype.unbindAll = function () {
  this.listeners = {};
};

if (typeof window === "undefined") {
  exports.Evented = Evented;
}
