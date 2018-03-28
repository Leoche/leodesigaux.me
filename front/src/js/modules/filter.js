/* global */
export default class Filter {
  constructor () {
    window.e = this

    this.$toggler = document.querySelector('.filters-toggle')
    this.$toggler.nextElementSibling.classList.add('is-hidden')
    this.$toggler.addEventListener('click', event => {
      event.preventDefault()
      this.$toggler.nextElementSibling.classList.toggle('is-hidden')
    })

    this.$filters = document.querySelectorAll('.filters>.tag').forEach($el => {
      let $target = $el.dataset.target
      $el.classList.add('is-info')
      this.show($target)

      $el.addEventListener('click', event => {
        event.preventDefault()
        if ($el.classList.toggle('is-info')) {
          this.show($target)
        } else {
          this.hide($target)
        }
      })
    })
    console.log('this.$filters', this.$filters)
  }
  // UI
  show (name) {
    document.querySelectorAll("[data-filtered='" + name + "']").forEach($el => { $el.style.display = 'block' })
  }
  hide (name) {
    document.querySelectorAll("[data-filtered='" + name + "']").forEach($el => { $el.style.display = 'none' })
  }
}
