import THREE from 'three';
import forEach from 'lodash.foreach'

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

    this.night = false;

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

    this.geometryBulbSphere = new THREE.OctahedronGeometry( 0.9 );
    this.materialBulbSphere = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xFFFCEE,
      // map: THREE.ImageUtils.loadTexture('./assets/noise.gif'),
    });
    this.sphereBulbSphere = new THREE.Mesh( this.geometryBulbSphere, this.materialBulbSphere );
    this.sphereBulbSphere.position.y = 13.5;
    this.add( this.sphereBulbSphere );

    this.spotLight = new THREE.SpotLight( 0xdec508, 10, 100, 0.14 );
    this.spotLight.target = this.sphereBulbSphere;
    this.spotLight.shadowMapVisible = true;
    this.add( this.spotLight );

    // this.testgeometry = new THREE.CylinderGeometry( 0, 2.5, 15, 24, 24, true );
    // this.testmaterial = new THREE.PointsMaterial ({
    //     size: 0.4,
    //     color: 0xdec508,
    //     transparent: true,
    //     opacity: 0.2,
    //     map: THREE.ImageUtils.loadTexture('./assets/flare.png'),
    //     blending: THREE.AdditiveBlending,
    //     depthTest: true,
    //     side: THREE.DoubleSide,
    // });
    //
    // this.particles = new THREE.Points(this.testgeometry, this.testmaterial);
    // this.particles.position.y = 13.5;
    // this.particles.geometry.translate( 0, -15/2, 0 );
    // this.particles.rotation.x = Math.PI / 2;
    // this.particles.rotation.z = Math.PI / 1.2;
    // this.add(this.particles);

  }

  switchMode(night) {
    this.night = night;
    console.log(night);
  }

  addGUI(folder) {
  }

  update() {

    if (this.night) {
      // this.particles.rotation.z -= 0.01;
      this.sphereBulbSphere.rotation.y += 0.01;
    } else {
      // this.particles.rotation.z -= 0.0001;
      this.sphereBulbSphere.rotation.y += 0.0001;
    }


    // forEach(this.particles.geometry.vertices, function(particle){
    //   var dX, dY, dZ;
    //   dX = Math.random() * 0.04 - 0.02;
    //   dY = Math.random() * 0.04 - 0.02;
    //   dZ = Math.random() * 0.04 - 0.02;
    //
    //   particle.add(new THREE.Vector3(dX, dY, dZ));
    // });
    // this.particles.geometry.verticesNeedUpdate = true;
  }
}
