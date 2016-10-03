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

    this.spotLight = new THREE.SpotLight( 0xdec508, 10, 100, 0.4 );
    this.spotLight.target = this.sphereBulbSphere;
    this.spotLight.shadowMapVisible = true;
    this.add( this.spotLight );

    this.textureFlare0 = THREE.ImageUtils.loadTexture("./assets/lensflare0.png");
    this.textureFlare3 = THREE.ImageUtils.loadTexture("./assets/lensflare3.png");
    this.flareColor = new THREE.Color(0xFFFCEE);
    this.lensFlare = new THREE.LensFlare(this.textureFlare0, 1700, 0.0, THREE.AdditiveBlending, this.flareColor);
    this.lensFlare.add(this.textureFlare0, 60, 0.6, THREE.AdditiveBlending);
    this.lensFlare.add(this.textureFlare0, 70, 0.7, THREE.AdditiveBlending);
    this.lensFlare.add(this.textureFlare0, 120, 0.9, THREE.AdditiveBlending);
    this.lensFlare.add(this.textureFlare0, 70, 1.0, THREE.AdditiveBlending);
    this.lensFlare.position.copy(this.sphereBulbSphere.position);
    // this.add(this.lensFlare);
  }

  switchMode(night) {
    this.night = night;
    if (this.night) {
      TweenMax.to(this.spotLight, 1, {intensity: 100, ease: Power2.easeOut})
    } else {
      TweenMax.to(this.spotLight, 0.5, {intensity: 10, ease: Power2.easeOut})
    }
  }

  addGUI(folder) {
  }

  update() {

    if (this.night) {
      this.sphereBulbSphere.rotation.y += 0.01;
    } else {
      this.sphereBulbSphere.rotation.y += 0.0001;
    }
  }
}
