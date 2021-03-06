import * as THREE from 'three'

const Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  brownDark: 0x23190f,
}

class Airplane {
  mesh: THREE.Object3D<THREE.Event>
  propeller: THREE.Mesh

  constructor() {
    this.mesh = new THREE.Object3D()
    const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1)
    const matCockpit = new THREE.MeshPhongMaterial({ color: Colors.red })

    const cockpit = new THREE.Mesh(geomCockpit, matCockpit)
    cockpit.castShadow = true
    cockpit.receiveShadow = true
    this.mesh.add(cockpit)

    const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
    const matEngine = new THREE.MeshPhongMaterial({ color: Colors.white })
    const engine = new THREE.Mesh(geomEngine, matEngine)
    engine.position.x = 40
    engine.castShadow = true
    engine.receiveShadow = true
    this.mesh.add(engine)

    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
    const matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red })
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane)
    tailPlane.position.set(-35, 25, 0)
    tailPlane.castShadow = true
    tailPlane.receiveShadow = true
    this.mesh.add(tailPlane)

    const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1)
    const matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red })
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing)
    sideWing.castShadow = true
    sideWing.receiveShadow = true
    this.mesh.add(sideWing)

    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
    const matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown })
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller)
    this.propeller.castShadow = true
    this.propeller.receiveShadow = true

    const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1)
    const matBlade = new THREE.MeshPhongMaterial({
      color: Colors.brownDark,
    })
    const blade = new THREE.Mesh(geomBlade, matBlade)
    blade.position.set(8, 0, 0)
    blade.castShadow = true
    blade.receiveShadow = true
    this.propeller.add(blade)
    this.propeller.position.set(50, 0, 0)
    this.mesh.add(this.propeller)
  }
}

export default Airplane
