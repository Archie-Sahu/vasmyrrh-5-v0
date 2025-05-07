document.addEventListener("DOMContentLoaded", () => {
  // Particle system
  class Particle {
    constructor(canvas, options = {}) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")

      this.x = options.x || Math.random() * canvas.width
      this.y = options.y || Math.random() * canvas.height
      this.size = options.size || Math.random() * 2 + 1
      this.speedX = options.speedX || (Math.random() - 0.5) * 0.5
      this.speedY = options.speedY || (Math.random() - 0.5) * 0.5
      this.color = options.color || this.getRandomColor()
      this.alpha = options.alpha || Math.random() * 0.8 + 0.2
      this.decay = options.decay || 0.015
      this.life = options.life || Math.random() * 0.5 + 0.5
    }

    getRandomColor() {
      const colors = ["rgba(110, 0, 255, 0.8)", "rgba(0, 217, 255, 0.8)", "rgba(255, 0, 229, 0.8)"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.size > 0.2) this.size -= 0.01

      this.life -= this.decay

      if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1
      if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1
    }

    draw() {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      this.ctx.fillStyle = this.color.replace("0.8", this.life)
      this.ctx.fill()

      // Glow effect
      this.ctx.shadowBlur = 15
      this.ctx.shadowColor = this.color.replace("0.8", "1")
    }

    isAlive() {
      return this.life > 0
    }
  }

  class ParticleSystem {
    constructor(elementId) {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")
      this.particles = []
      this.maxParticles = 100

      const container = document.getElementById(elementId)
      container.appendChild(this.canvas)

      this.resizeCanvas()
      window.addEventListener("resize", () => this.resizeCanvas())

      this.createParticles()
      this.connectParticles = true
      this.animate()

      // Mouse interaction
      this.mouse = {
        x: null,
        y: null,
        radius: 150,
      }

      this.canvas.addEventListener("mousemove", (e) => {
        this.mouse.x = e.x
        this.mouse.y = e.y

        // Create particles on mouse move
        for (let i = 0; i < 3; i++) {
          this.particles.push(
            new Particle(this.canvas, {
              x: this.mouse.x,
              y: this.mouse.y,
              size: Math.random() * 3 + 2,
              speedX: (Math.random() - 0.5) * 2,
              speedY: (Math.random() - 0.5) * 2,
              life: 1,
            }),
          )
        }
      })
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }

    createParticles() {
      for (let i = 0; i < this.maxParticles; i++) {
        this.particles.push(new Particle(this.canvas))
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Update and draw particles
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update()
        this.particles[i].draw()

        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.particles[i].x - this.mouse.x
          const dy = this.particles[i].y - this.mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < this.mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (this.mouse.radius - distance) / this.mouse.radius

            this.particles[i].x += forceDirectionX * force * 2
            this.particles[i].y += forceDirectionY * force * 2
          }
        }

        // Connect particles
        if (this.connectParticles) {
          for (let j = i; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x
            const dy = this.particles[i].y - this.particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              this.ctx.beginPath()
              this.ctx.strokeStyle = rgba(110, 0, 255, ${1 - distance / 100})
              this.ctx.lineWidth = 0.2
              this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
              this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
              this.ctx.stroke()
            }
          }
        }

        // Remove dead particles
        if (!this.particles[i].isAlive()) {
          this.particles.splice(i, 1)
          i--
        }
      }

      // Add new particles if needed
      if (this.particles.length < this.maxParticles) {
        this.particles.push(new Particle(this.canvas))
      }

      requestAnimationFrame(() => this.animate())
    }
  }

  // Initialize particle system
  new ParticleSystem("particles-js")
  })