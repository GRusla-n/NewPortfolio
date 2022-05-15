import * as THREE from 'three'
import Sea from './Sea'
import { Sky } from './Sky'
import Airplane from './Airplane'

window.addEventListener('load', init, false)

let HEIGHT: number
let WIDTH: number
let container: HTMLElement
let hemisphereLight: THREE.HemisphereLight
let shadowLight: THREE.DirectionalLight

let airplane: Airplane
let sea: Sea
let sky: Sky

let mousePos = { x: 0, y: 0 }

const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
)
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
})

function createScene() {
  HEIGHT = window.innerHeight
  WIDTH = window.innerWidth
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)
  camera.position.x = 0
  camera.position.z = 200
  camera.position.y = 100
  renderer.setSize(WIDTH, HEIGHT)
  renderer.shadowMap.enabled = true
  container = document.getElementById('world')!
  container.appendChild(renderer.domElement)
  window.addEventListener('resize', handleWindowResize, false)
}

function handleWindowResize() {
  HEIGHT = window.innerHeight
  WIDTH = window.innerWidth
  renderer.setSize(WIDTH, HEIGHT)
  camera.aspect = WIDTH / HEIGHT
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
}

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
  shadowLight.position.set(150, 350, 350)
  shadowLight.castShadow = true
  shadowLight.shadow.camera.left = -400
  shadowLight.shadow.camera.right = 400
  shadowLight.shadow.camera.top = 400
  shadowLight.shadow.camera.bottom = -400
  shadowLight.shadow.camera.near = 1
  shadowLight.shadow.camera.far = 1000
  shadowLight.shadow.mapSize.width = 2048
  shadowLight.shadow.mapSize.height = 2048
  scene.add(hemisphereLight)
  scene.add(shadowLight)
}

function createSea() {
  sea = new Sea()
  sea.mesh.position.y = -600
  scene.add(sea.mesh)
}

function createSky() {
  sky = new Sky()
  sky.mesh.position.y = -600
  scene.add(sky.mesh)
}

function createPlane() {
  airplane = new Airplane()
  airplane.mesh.scale.set(0.25, 0.25, 0.25)
  airplane.mesh.position.y = 100
  scene.add(airplane.mesh)
}

function normalize(
  v: number,
  vmin: number,
  vmax: number,
  tmin: number,
  tmax: number
) {
  const nv = Math.max(Math.min(v, vmax), vmin)
  const dv = vmax - vmin
  const pc = (nv - vmin) / dv
  const dt = tmax - tmin
  return tmin + pc * dt
}

function updatePlane() {
  airplane.mesh.position.y = normalize(mousePos.y, -1, 1, 25, 175)
  airplane.mesh.position.x = normalize(mousePos.x, -1, 1, -100, 100)
  airplane.propeller.rotation.x += 0.3
}

function loop() {
  sea.mesh.rotation.z += 0.005
  sky.mesh.rotation.z += 0.01

  updatePlane()

  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

function handleMouseMove(event: any) {
  const tx = -1 + (event.clientX / WIDTH) * 2
  const ty = 1 - (event.clientY / HEIGHT) * 2
  mousePos = { x: tx, y: ty }
}

function init() {
  createScene()
  createLights()
  createSea()
  createSky()
  createPlane()
  loop()

  document.addEventListener('mousemove', handleMouseMove, false)

  renderer.render(scene, camera)
}
