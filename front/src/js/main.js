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
  document.querySelectorAll('.tab-toggle').forEach($el => {
    let target = $el.dataset.target
    document.querySelectorAll('.code').forEach($el => { $el.style.display = 'none' })
    $el.addEventListener('click', () => {
      document.querySelectorAll('.code').forEach($el => { $el.style.display = 'none' })
      document.querySelectorAll('.tab-toggle').forEach($el => { $el.classList.remove('is-active') })
      $el.classList.add('is-active')
      document.querySelector('.code-' + target).style.display = 'block'
    })
  })
  document.querySelector('.code-html').style.display = 'block'
  document.querySelectorAll('.tab-toggle')[0].classList.add('is-active')

  document.querySelectorAll('.ld-layout-toggle').forEach($el => {
    $el.addEventListener('click', () => {
      document.querySelectorAll('.ld-layout-toggle').forEach($el => { $el.classList.remove('is-active') })
      if ($el.classList.contains('ld-layout-h')) {
        document.querySelector('.ld-layout-h').classList.add('is-active')
        document.querySelector('.tabs').parentElement.parentElement.style.flexDirection = 'column-reverse'
      } else {
        document.querySelector('.ld-layout-v').classList.add('is-active')
        document.querySelector('.tabs').parentElement.parentElement.style.flexDirection = 'row'
      }
    })
  })
}
window.onload = () => {
  init()
}
