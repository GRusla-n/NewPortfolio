import * as THREE from 'three'

const Colors = {
  blue: 0x68c3c0,
}

export default class Sea {
  mesh: THREE.Mesh

  constructor() {
    const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10)
    geom.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
    })

    this.mesh = new THREE.Mesh(geom, mat)
    this.mesh.receiveShadow = true
  }
}
