
varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 resolution;
void main() {
  gl_FragColor = texture2D(tInput, vUv);
}
