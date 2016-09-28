import THREE from 'three';

export default class Cube extends THREE.Object3D {
  constructor() {
    super();
    this.mat = new THREE.MeshPhongMaterial({
      color: 0xFA9876,
      specular: 0xD6B9AC,
      shading: THREE.FlatShading,
      shininess: 0
    });

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

    this.materialwhite = new THREE.MeshPhongMaterial({
      color: 0xFFFCEE,
      specular: 0xD6B9AC,
      shading: THREE.FlatShading,
      shininess: 0
    });

    this.materialred = new THREE.MeshPhongMaterial({
      specular: 0xD6B9AC,
      color: 0xF85757,
      shading: THREE.FlatShading,
      shininess: 0
    });

    // this.geometry = new THREE.CylinderGeometry( 2, 2, 2, 24 );
    // this.cylinder = new THREE.Mesh( this.geometry, this.material );
    this.cylinder = []

    var size = 2
    for (var i = 0; i < 5; i++) {

      this.geometry = new THREE.CylinderGeometry( (size - 0.1), size, 2, 24 );
      size = (size - 0.1)

      if ((i % 2) == 0) {
        this.cylinder[i] = new THREE.Mesh( this.geometry, this.materialwhite );
      } else {
        this.cylinder[i] = new THREE.Mesh( this.geometry, this.materialred );
      }
      this.cylinder[i].position.y = 4 + (i*2);
      this.add( this.cylinder[i] );
    }

    this.geometrysphere = new THREE.CylinderGeometry( 1.5, 1, 2, 24 );
    this.materialsphere = new THREE.MeshPhongMaterial({
      color: 0x323835,
      specular: 0xD6B9AC,
      transparent: true,
      opacity: 0.5,
      shading: THREE.FlatShading,
      shininess: 0
    });
    this.sphere = new THREE.Mesh( this.geometrysphere, this.materialsphere);
    this.sphere.position.y = 13;
    this.add( this.sphere );

    this.geometryspheretop = new THREE.CylinderGeometry( 0.5, 1.5, 0.8, 24 );
    this.spheretop = new THREE.Mesh( this.geometryspheretop, this.materialwhite);
    this.spheretop.position.y = 14.4;
    this.add( this.spheretop );

    this.geometryspheretop = new THREE.CylinderGeometry( 0.5, 0.5, 2, 24 );
    this.materiaLight = new THREE.MeshPhongMaterial({
      color: 0xFFFCEE,
      specular: 0xff0000,
      shading: THREE.FlatShading,
      shininess: 30
    });
    this.spheretop = new THREE.Mesh( this.geometryspheretop, this.materiaLight);
    this.spheretop.position.y = 13;
    this.add( this.spheretop );

    this.Plight = new THREE.SpotLight( 0xff0000, 30, 100, 0.19 );
    this.Plight.position.set( 0, 17, 1.1 );
    // this.Plight.rotation.x = Math.PI / 2;
    this.add( this.Plight );

    var spotLightHelper = new THREE.SpotLightHelper( this.Plight );
    // this.add( spotLightHelper );

  }
  addGUI(folder) {
    this.folder = folder.addFolder('Light');

    this.folder.add(this.Plight.rotation, 'x', -10, 10).step(1)
    this.folder.add(this.Plight.rotation, 'y', -10, 10).step(1)
    this.folder.add(this.Plight.rotation, 'z', -10, 10).step(1)

    this.folder.add(this.Plight.position, 'x', -10, 10).step(1)
    this.folder.add(this.Plight.position, 'y', -10, 20).step(1)
    this.folder.add(this.Plight.position, 'z', -10, 10).step(1)


  }
  update() {
  }
}
