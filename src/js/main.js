import Hero from './modules/hero'
import Detector from './utils/detector'

function init () {
  // Check for webGL capabilities
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage()
  } else {
    if (document.querySelector('.landing--3d') !== null) {
      const container = document.querySelector('.landing--3d')
      let hero = new Hero(container)
      hero.render()
    }
  }
}
window.onload = () => {
  init()
}
