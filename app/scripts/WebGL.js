import THREE from 'three';
window.THREE = THREE;
const OrbitControls = require('three-orbit-controls')(THREE);
const OBJLoader = require('three-obj-loader')(THREE);
import WAGNER from '@superguigui/wagner';

// Passes
const FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPASS');
const VignettePass = require('@superguigui/wagner/src/passes/vignette/VignettePass');
const NoisePass = require('@superguigui/wagner/src/passes/noise/noise');

// Objects
import Lighthouse from './objects/lighthouse/Lighthouse';
import Sea from './objects/planes/sea'
import Island from './objects/island/Island'

export default class WebGL {
  constructor(params) {
    this.params = {
      name: params.name || 'WebGL',
      device: params.device || 'desktop',
      postProcessing: params.postProcessing || false,
      keyboard: params.keyboard || false,
      mouse: params.mouse || false,
      touch: params.touch || false,
      controls: params.controls || false,
    };

    this.mouse = new THREE.Vector2();
    this.originalMouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, params.size.width / params.size.height, 1, 1000);
    this.camera.position.z = 50;
    this.camera.position.y = 6;

    this.renderer = new THREE.WebGLRenderer({antialias : true});
    this.renderer.setSize(params.size.width, params.size.height);
    this.renderer.setClearColor(0xD6B9AC);


    this.composer = null;
    this.initPostprocessing();
    this.initLights();
    this.initObjects();
    if (this.params.controls) {
      this.controls = new OrbitControls(this.camera);
    }

    if (window.DEBUG || window.DEVMODE) this.initGUI();

  }
  initPostprocessing() {
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    window.composer = this.composer;

    // Add pass and automatic gui
    this.passes = [];
    this.fxaaPass = new FXAAPass();
    this.passes.push(this.fxaaPass);
    this.noisePass = new NoisePass({
      amount: 0.05
    });
    this.passes.push(this.noisePass);
    this.vignettePass = new VignettePass({
      reduction: 0.3
    });
    this.passes.push(this.vignettePass);

  }
  initLights() {
    this.light = new THREE.AmbientLight( 0x404040 );
    this.scene.add( this.light );

    this.spotLight = new THREE.SpotLight( 0xffffff, 0.8 );
    this.spotLight.position.set( 100, 100, 100 );

    this.spotLight.castShadow = true;

    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;

    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;

    this.scene.add( this.spotLight );
  }
  initObjects() {
    this.lighthouse = new Lighthouse();
    this.lighthouse.position.set(0, 0, 0);
    this.scene.add(this.lighthouse);

    this.sea = new Sea();
    this.sea.position.set(0, 0, 0);
    this.scene.add(this.sea);

    this.island = new Island();
    this.island.position.set(0, 0, 0);
    this.scene.add(this.island);
  }
  initGUI() {
    this.folder = window.gui.addFolder(this.params.name);
    this.folder.add(this.params, 'postProcessing');
    this.folder.add(this.params, 'keyboard');
    this.folder.add(this.params, 'mouse');
    this.folder.add(this.params, 'touch');
    this.folder.add(this.params, 'controls');


    // init postprocessing GUI
    this.postProcessingFolder = this.folder.addFolder('PostProcessing');
    for (let i = 0; i < this.passes.length; i++) {
      const pass = this.passes[i];
      pass.enabled = true;
      let containsNumber = false;
      for (const key of Object.keys(pass.params)) {
        if (typeof pass.params[key] === 'number') {
          containsNumber = true;
        }
      }
      const folder = this.postProcessingFolder.addFolder(pass.constructor.name);
      folder.add(pass, 'enabled');
      if (containsNumber) {
        for (const key of Object.keys(pass.params)) {
          if (typeof pass.params[key] === 'number') {
            folder.add(pass.params, key);
          }
        }
      }
      folder.open();
    }
    this.postProcessingFolder.close();

    // init scene.child GUI
    for (let i = 0; i < this.scene.children.length; i++) {
      const child = this.scene.children[i];
      if (typeof child.addGUI === 'function') {
        child.addGUI(this.folder);
      }
    }
    this.folder.close();
  }
  render() {
    if (this.params.postProcessing) {
      this.composer.reset();
      this.composer.render(this.scene, this.camera);

      // Passes
      for (let i = 0; i < this.passes.length; i++) {
        if (this.passes[i].enabled) {
          this.composer.pass(this.passes[i]);
        }
      }

      this.composer.toScreen();

    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.lighthouse.update();
    this.sea.update();
    this.island.update();
  }
  rayCast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.lighthouse, true);
    if (intersects.length > 0) {
      console.log('yo');
    }
  }
  // Events
  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
  keyPress() {
    if (!this.params.keyboard) return;
    console.log('keyPress');
  }
  keyDown() {
    if (!this.params.keyboard) return;
    console.log('keyDown');
  }
  keyUp() {
    if (!this.params.keyboard) return;
    console.log('keyUp');
  }
  click(x, y, time) {
    if (!this.params.mouse) return;
    console.log('click');
    this.originalMouse.x = x;
    this.originalMouse.y = y;
    this.mouse.x = (x / window.innerWidth - 0.5) * 2;
    this.mouse.y = (y / window.innerHeight - 0.5) * 2;
  }
  mouseMove(x, y, ime) {
    if (!this.params.mouse) return;
    console.log('mousemove');
    this.originalMouse.x = x;
    this.originalMouse.y = y;
    this.mouse.x = (x / window.innerWidth - 0.5) * 2;
    this.mouse.y = (y / window.innerHeight - 0.5) * 2;
  }
  touchStart() {
    if (!this.params.touch) return;
    console.log('touchstart');
  }
  touchEnd() {
    if (!this.params.touch) return;
    console.log('touchend');
  }
  touchMove() {
    if (!this.params.touch) return;
    console.log('touchmove');
  }

}
