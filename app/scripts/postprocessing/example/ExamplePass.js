'use strict';

const THREE = require('three');
const glslify = require('glslify');
const Pass = require('@superguigui/wagner/src/Pass');
const vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
const fragment = glslify('./displacement-fs.glsl');

function Example(options) {
  Pass.call(this);
  this.setShader(vertex, fragment);
}

module.exports = Example;

Example.prototype = Object.create(Pass.prototype);
Example.prototype.constructor = Example;


Example.prototype.run = function run(composer) {
  composer.pass(this.shader);
};
