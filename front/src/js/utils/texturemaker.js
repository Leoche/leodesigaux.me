export default {
  size: 256,
  create (shape) {
    var canvas = document.createElement('canvas')
    canvas.width = this.size
    canvas.height = this.size
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(255,255,255,.5)'
    if (shape === 'circle') {
      this.circle(ctx)
    } else if (shape === 'square') {
      this.square(ctx)
    } else if (shape === 'triangle') {
      this.triangle(ctx)
    }
    ctx.fill()
    return canvas
  },
  circle (ctx) {
    ctx.beginPath()
    ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, 2 * Math.PI)
    ctx.closePath()
  },
  triangle (ctx) {
    console.log('ctx', ctx)
    ctx.beginPath()
    ctx.moveTo(0, this.size)
    ctx.lineTo(this.size / 2, 40)
    ctx.lineTo(this.size, this.size)
    ctx.closePath()
  },
  square (ctx) {
    let r = 30
    ctx.beginPath()
    ctx.moveTo(r, 0)
    ctx.lineTo(this.size - r, 0)
    ctx.quadraticCurveTo(this.size, 0, this.size, r)
    ctx.lineTo(this.size, this.size - r)
    ctx.quadraticCurveTo(this.size, this.size, this.size - r, this.size)
    ctx.lineTo(r, this.size)
    ctx.quadraticCurveTo(0, this.size, 0, this.size - r)
    ctx.lineTo(0, r)
    ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.fill()
  }
}
