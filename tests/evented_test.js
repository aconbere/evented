var minitest = require("minitest");
var assert = require("assert");
var Evented = require("../lib/evented").Evented;
var sys = require("sys");

minitest.context("Evented", function () {
  this.setup(function () {
    this.evented = new Evented();
  });
  
  this.assertion("intialization should create an empty channels hash", function (test) {
    assert.deepEqual(this.evented.listeners, {});
    test.finished();
  });

  this.assertion("bind should add a listener to a channel", function (test) {
    this.evented.bind("x", function () {});
    assert.ok(this.evented.listeners.x.length > 0);
    test.finished();
  });

  this.assertion("bindOnce should only be called once", function (test) {
    this.evented.bindOnce("x", function () {});
    assert.ok(this.evented.listenersOnce.x.length > 0);
    this.evented.trigger("x");
    assert.ok(this.evented.listenersOnce.x.length == 0);
    test.finished();
  });

  this.assertion("trigger should send a message to each listener on a channel", function (test) {
    var fired = false;
    var fired2 = false
    this.evented.bind("x", function () { fired = true });
    this.evented.bind("x", function () { fired2 = true });
    this.evented.trigger("x");
    assert.ok(fired);
    assert.ok(fired2);
    test.finished();
  });
});
