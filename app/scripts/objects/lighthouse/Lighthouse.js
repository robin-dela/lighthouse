import THREE from 'three';

export default class Lighthouse extends THREE.Object3D {
  constructor() {
    super();

    this.materialWhite = new THREE.MeshPhongMaterial({
      color: 0xFFFCEE,
      specular: 0xD6B9AC,
      shading: THREE.FlatShading,
      shininess: 0
    });

    this.materialRed = new THREE.MeshPhongMaterial({
      specular: 0xD6B9AC,
      color: 0xF85757,
      shading: THREE.FlatShading,
      shininess: 0
    });

    this.cylinder = []

    this.size = 2
    for (var i = 0; i < 5; i++) {

      this.geometry = new THREE.CylinderGeometry( (this.size - 0.1), this.size, 2, 24 );
      this.size = (this.size - 0.1)

      if ((i % 2) == 0) {
        this.cylinder[i] = new THREE.Mesh( this.geometry, this.materialWhite );
      } else {
        this.cylinder[i] = new THREE.Mesh( this.geometry, this.materialRed );
      }
      this.cylinder[i].position.y = 4 + (i*2);
      this.add( this.cylinder[i] );
    }

    this.geometrySphere = new THREE.CylinderGeometry( 1.5, 1, 2, 24 );
    this.materialSphere = new THREE.MeshPhongMaterial({
      color: 0x323835,
      specular: 0xD6B9AC,
      transparent: true,
      opacity: 0.5,
      shading: THREE.FlatShading,
      shininess: 0
    });
    this.sphere = new THREE.Mesh( this.geometrySphere, this.materialSphere);
    this.sphere.position.y = 13;
    this.add( this.sphere );

    this.geometrySphereTop = new THREE.CylinderGeometry( 0.5, 1.5, 0.8, 24 );
    this.sphereTop = new THREE.Mesh( this.geometrySphereTop, this.materialWhite);
    this.sphereTop.position.y = 14.4;
    this.add( this.sphereTop );

    this.bulbGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 24 );
    this.bulbLight = new THREE.MeshPhongMaterial({
      color: 0xFFFCEE,
      specular: 0xff0000,
      shading: THREE.FlatShading,
      shininess: 30
    });
    this.bulb = new THREE.Mesh( this.bulbGeometry, this.bulbLight);
    this.bulb.position.y = 13;
    this.add( this.bulb );

    this.geometryBulbSphere = new THREE.SphereBufferGeometry( 0.7, 8, 8 );
    this.materialBulbSphere = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xdec508,
      map: THREE.ImageUtils.loadTexture('./assets/noise.gif'),
      // displacementScale: 0.4
    });
    this.sphereBulbSphere = new THREE.Mesh( this.geometryBulbSphere, this.materialBulbSphere );
    this.sphereBulbSphere.position.y = 13.5;
    this.add( this.sphereBulbSphere );

    this.geometryLightTube = new THREE.CylinderBufferGeometry( 0, 2.5, 15, 24 );
    this.materialLightTube = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xdec508,
      transparent: true,
      opacity: 0.2,
      shading: THREE.SmoothSading,
      // bumpMap: THREE.ImageUtils.loadTexture('./assets/noise.gif')
    });
    this.lightTube = new THREE.Mesh( this.geometryLightTube, this.materialLightTube );
    this.lightTube.position.y = 13.5;
    this.lightTube.geometry.translate( 0, -15/2, 0 );
    this.lightTube.rotation.x = Math.PI / 2;
    this.lightTube.rotation.z = Math.PI / 2;
    this.add( this.lightTube );

    this.spotLight = new THREE.SpotLight( 0xdec508, 10, 100, 0.14 );
    this.spotLight.position.set( 0, 13.5, 0 );
    // this.spotLight.rotation.x = Math.PI / 1.5;
    this.spotLight.rotation.z = Math.PI / 2;
    this.spotLight.shadowMapVisible = true;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;
    this.add( this.spotLight );
    //
    // this.spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
    // this.add( this.spotLightHelper );

  }
  addGUI(folder) {
  }
  update() {
    this.lightTube.rotation.z -= 0.01;
    this.sphereBulbSphere.rotation.y += 0.01;
  }
}
