/* global requestAnimationFrame */
import * as THREE from 'three'
import * as basicScroll from 'basicscroll'
import texturemaker from '../utils/texturemaker'

export default class Hero {
  constructor (container) {
    this.container = container
    this.distance = 6000

    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 1, 10000)
    this.camera.position.z = this.distance
    this.camera.position.y = 500
    this.camera.position.x = 500
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.width = container.offsetWidth
    this.widthfar = this.width * 4
    this.height = container.offsetHeight
    this.heightfar = this.height * 16
    this.particleX = 100
    this.particleZ = 200
    this.mouseX = 0
    this.mouseZ = this.distance
    this.mouseY = -100
    this.lineX = -this.widthfar / 2
    this.particleSystem = null

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x185cb8, 0.07)
    this.scene.add(this.camera)

    this.renderer = new THREE.WebGLRenderer({alpha: true, logarithmicDepthBuffer: true})
    this.renderer.setSize(this.width, this.height)

    container.appendChild(this.renderer.domElement)

    let materialPoint = this.generateMaterial('circle', 5)
    let materialCircle = this.generateMaterial('circle', 100)
    let materialTriangle = this.generateMaterial('triangle', 100)
    let materialRoundedsquare = this.generateMaterial('square', 100)

    this.particles = new THREE.Geometry()
    for (var x = 0; x < this.particleX; x++) {
      for (var z = 0; z < this.particleZ; z++) {
        this.particles.vertices.push(new THREE.Vector3(x * this.widthfar / this.particleX - this.widthfar / 2, 1, z * this.heightfar / this.particleZ))
      }
    }

    this.particleSystem = new THREE.Points(this.particles, materialPoint)

    this.scene.add(this.particleSystem)
    this.scene.add(this.generateShapes(10, materialRoundedsquare))
    this.scene.add(this.generateShapes(5, materialTriangle))
    this.scene.add(this.generateShapes(5, materialCircle))

    document.addEventListener('mousemove', (event) => this.onMouseMove(event), false)
    document.addEventListener('touchmove', (event) => this.onDocumentTouchMove(event), false)
    window.addEventListener('resize', (event) => this.onWindowResize(event), false)

    if (document.querySelector('.laptop') !== null) {
      basicScroll.create({
        elem: document.querySelector('.is-laptop'),
        from: 'top-bottom',
        to: 'middle-top',
        direct: true,
        props: {
          '--laptop-origin': {
            from: '100%',
            timing: 'expoIn',
            to: '10%'
          },
          '--laptop-deg': {
            from: '-79deg',
            timing: 'expoIn',
            to: '-180deg'
          },
          '--laptop-percent': {
            from: 0,
            timing: 'expoIn',
            to: 1
          }
        }
      }).start()
    }
  }

  generateMaterial (shape, size) {
    return new THREE.PointsMaterial({
      size: size,
      map: new THREE.CanvasTexture(texturemaker.create(shape)),
      transparent: true
    })
  }

  generateShapes (numberOfParticules, material) {
    let geo = new THREE.Geometry()
    for (var x = 0; x < numberOfParticules; x++) {
      let position = new THREE.Vector3(
        Math.random() * this.width - this.width / 2 - 800,
        Math.random() * this.height,
        Math.random() * 2000 + this.distance - 2000
      )
      geo.vertices.push(position)
    }
    return new THREE.Points(geo, material)
  }

  onMouseMove (event) {
    this.mouseX = event.clientX - this.width / 2
    this.mouseY = event.clientY - this.height / 2
  }

  onDocumentClick (event) {
    this.mouseZ = 5000
  }

  onDocumentunClick (event) {
    this.mouseZ = this.distance
  }

  onDocumentTouchMove (event) {
    if (event.touches.length === 1) {
      event.preventDefault()
      this.mouseX = event.touches[ 0 ].pageX - this.width / 2
      this.mouseY = event.touches[ 0 ].pageY - window.scrollY - this.height / 2
    }
  }

  onWindowResize (evt) {
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
  }

  render () {
    this.lineX += 25
    if (this.lineX > this.widthfar / 2) this.lineX = -this.widthfar / 2

    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.005
    this.camera.position.z += (this.mouseZ - this.camera.position.z) * 0.01
    this.camera.position.y += (100 - this.mouseY - this.camera.position.y) * 0.01
    if (this.camera.position.y < 100) this.camera.position.y = 100

    this.camera.lookAt(new THREE.Vector3(0, -1000, this.distance / 2))

    var geometry = this.particleSystem.geometry

    let coef = 200
    for (var i = 0; i < geometry.vertices.length; i++) {
      let x = geometry.vertices[ i ].x
      let aX = Math.abs(x)
      let aLineX = Math.abs(this.lineX)
      let ecart = (aX >= aLineX) ? aX - aLineX : aLineX - aX

      if (ecart <= coef && (x * this.lineX <= 0)) {
        if (geometry.vertices[ i ].y < 50 && geometry.vertices[ i ].y < (Math.min(50, Math.max(1, coef - ecart)))) {
          geometry.vertices[ i ].y += 3
        }
      } else if (geometry.vertices[ i ].y > 1) {
        geometry.vertices[ i ].y -= 3
      }
    }
    geometry.verticesNeedUpdate = true

    this.renderer.render(this.scene, this.camera)

    requestAnimationFrame(this.render.bind(this))
  }
}
