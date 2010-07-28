var minitest = require("minitest");
var assert = require("assert");
var Evented = require("evented").Evented;
var sys = require("sys");

minitest.context("Evented", function () {
  this.setup(function () {
    this.evented = new Evented();
  });
  
  this.assertion("intialization should create an empty channels hash", function (test) {
    assert.deepEqual(this.evented.listeners, {});
    test.finished();
  });

  this.assertion("subscribe should add a listener to a channel", function (test) {
    this.evented.bind("x", function () {});
    assert.ok(this.evented.listeners.x);
    test.finished();
  });

  this.assertion("publish should send a message to each listener on a channel", function (test) {
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
