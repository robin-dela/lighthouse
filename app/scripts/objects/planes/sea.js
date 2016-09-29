import THREE from 'three'

import 'gsap'

import forEach from 'lodash.foreach'

import seaSystemsConfig from './sea-config'
import SeaSystem from './sea-system/sea-system'

export default class Sea extends THREE.Object3D {
    constructor() {
        super()

        this.systems = []

        forEach (seaSystemsConfig, (config, value) => {
            let seaSystem = new SeaSystem(config)
            this.add(seaSystem)

            this.systems.push(seaSystem)
        })

        this.systems[0].position.set(0, 2.5, 0)
        this.systems[0].rotation.set(0.05, 0, 0)

    }

    switchMode(night) {
      this.systems[0].switchMode(night);
    }

    update(frame) {

        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
