import THREE from 'three';

export default class Island extends THREE.Object3D {
  constructor() {
    super();

    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    this.manager.onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    this.onError = function ( xhr ) {
      console.log('error');
    };

    this.mat = new THREE.MeshPhongMaterial({
      color: 0xFA9876,
      specular: 0xD6B9AC,
      shading: THREE.FlatShading,
      shininess: 0
    });

    this.loader = new THREE.OBJLoader( this.manager );
    this.loader.load( 'assets/iceberg.obj', function ( object ) {

      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material = this.mat;
          //child.material.uniforms.needsUpdate = true;
          child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
          child.geometry.verticesNeedUpdate = true;
        }
      }.bind(this));
      this.add(object);
    }.bind(this), this.manager.onProgress, this.onError );
  }
  addGUI(folder) {
  }
  update() {
  }
}
