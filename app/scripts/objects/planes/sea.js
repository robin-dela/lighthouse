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

        // this.systems[1].position.set(0, -10, 0)
        //
        // this.systems[2].position.set(0, -10, 0)
        //
        // this.systems[3].position.set(0, -6.45, 0)
        // this.systems[3].rotation.x = -Math.PI / 1.8
        // this.systems[3].scale.set(1, 1, 0.6)
        //
        // this.systems[4].rotation.y = Math.PI / 2
        // this.systems[4].position.set(0, -6.45, -50)
        //
        // this.systems[5].rotation.y = Math.PI / 2
        // this.systems[5].position.set(0, -10, -40)
        //
        // this.systems[6].rotation.y = Math.PI / 2
        // this.systems[6].position.set(0, -6.45, -30)
        //
        // this.systems[7].rotation.y = Math.PI / 2
        // this.systems[7].position.set(-2, -14, -20)
        //
        //
        // this.systems[4].scale.set(1.0, 1.0, 5.0)
        // this.systems[5].scale.set(1.0, 1.0, 5.0)
        // this.systems[6].scale.set(1.0, 1.0, 5.0)
        // this.systems[7].scale.set(1.0, 1.0, 3.0)


    }

    update(frame) {

        for(let i = 0; i < this.systems.length; i++) {
            this.systems[i].update(frame)
        }
    }
}
