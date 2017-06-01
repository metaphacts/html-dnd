var util = require('util');
var fs = require('fs');
var multiline = require('multiline');
var Path = require('path');

var BASE_DIR = __dirname;
var CODE_FILE = Path.join(BASE_DIR, '..', 'dist', 'html_dnd.js');
var coreCode = fs.readFileSync(CODE_FILE);

exports.dragCode = util.format(multiline(function() {/*
  (function(draggable, callback) {
    %s;
    dnd.drag(draggable, callback);
  })(arguments[0], arguments[1]);
*/}), coreCode);

exports.dropCode = util.format(multiline(function() {/*
  (function(storeId, droppable) {
    %s;
    dnd.drop(storeId, droppable);
  })(arguments[0], arguments[1]);
*/}), coreCode);

exports.code = util.format(multiline(function() {/*
  (function(draggable, droppable) {
    %s;
    dnd.simulate(draggable, droppable);
  })(arguments[0], arguments[1]);
*/}), coreCode);

exports.codeForSelectors = util.format(multiline(function() {/*
  (function(selectorDraggable, selectorDroppable) {
    %s;
    
    var draggable = document.querySelector(selectorDraggable);
    var droppable = document.querySelector(selectorDroppable);

    dnd.simulate(draggable, droppable);
  })(arguments[0], arguments[1]);
*/}), coreCode);

exports.codeForXPaths = util.format(multiline(function() {/*
  (function(selectorDraggable, selectorDroppable) {
    %s;
    
    var draggable = document.evaluate(selectorDraggable, document, null,
                    XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
    var droppable = document.evaluate(selectorDroppable, document, null,
                    XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();

    dnd.simulate(draggable, droppable);
  })(arguments[0], arguments[1]);
*/}), coreCode);