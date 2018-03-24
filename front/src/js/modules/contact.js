export default class Contact {
  constructor (container) {
    this.inputs = {
      name: document.querySelector('.input-name'),
      email: document.querySelector('.input-email'),
      message: document.querySelector('.input-message')
    }
    this.notifications = document.querySelector('.notifications')
    this.cancel = document.querySelector('.is-cancel')
    this.submit = document.querySelector('.is-submit')
    this.form = document.querySelector('.is-form')
    this.thanks = document.querySelector('.empty')
    this.submit.addEventListener('click', (e) => {
      e.preventDefault()
      this.removeErrors()
      this.disable()
      window.fetch('http://localhost/sendmail',
        {
          method: 'POST',
          body: new window.FormData(this.form)
        }
      ).then(response => {
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.success === true) {
              this.success()
            } else {
              data.errors.forEach($data => {
                this.error($data.name, $data.message)
              })
              this.enable()
            }
          }).catch(e => this.enable())
        }
      }).catch(e => this.enable())
    })
  }
  // UI
  enable () {
    Object.entries(this.inputs).forEach($el => { $el[1].disabled = false })
    this.submit.classList.remove('is-loading')
    this.cancel.removeAttribute('disabled')
    this.submit.removeAttribute('disabled')
  }
  disable () {
    Object.entries(this.inputs).forEach($el => { $el[1].disabled = true })
    this.submit.classList.add('is-loading')
    this.cancel.setAttribute('disabled', true)
    this.submit.setAttribute('disabled', true)
  }
  error (name, message) {
    this.inputs[name].classList.add('is-danger')
    this.inputs[name].parentElement.nextElementSibling.innerHTML = message
  }
  removeErrors (name, message) {
    Object.entries(this.inputs).forEach($el => {
      $el[1].parentElement.nextElementSibling.innerHTML = ''
      $el[1].classList.remove('is-danger')
    })
  }
  success () {
    this.form.classList.add('is-closed')
    this.thanks.classList.add('is-active')
  }
}
