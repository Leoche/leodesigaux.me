import Hero from './modules/hero'
import Detector from './utils/detector'

function init () {
  // Check for webGL capabilities
  if (!Detector.webgl || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.alert('no gl')
  } else {
    if (document.querySelector('.landing--3d') !== null) {
      const container = document.querySelector('.landing--3d')
      let hero = new Hero(container)
      hero.render()
    }
  }

  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        var targetbrand = $el.dataset.targetbrand
        var target = $el.dataset.target
        var $target = document.getElementById(target)
        var $targetbrand = document.getElementById(targetbrand)
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
        $targetbrand.classList.toggle('is-active')
      })
    })
  }
}
window.onload = () => {
  init()
}
