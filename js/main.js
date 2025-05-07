document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 1000)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })

        // Close navigation if open
        const navToggle = document.querySelector(".nav-toggle")
        const radialNav = document.querySelector(".radial-nav")
        if (navToggle && radialNav && navToggle.classList.contains("active")) {
          navToggle.classList.remove("active")
          radialNav.classList.remove("active")
        }
      }
    })
  })

  // Dynamic starfield background
  class Star {
    constructor(canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 1.5 + 0.5
      this.speed = Math.random() * 0.05 + 0.01
      this.brightness = Math.random()
      this.color = this.getStarColor()
    }

    getStarColor() {
      const colors = [
        "#ffffff", // White
        "#f0f0ff", // Light blue-white
        "#ffe9c4", // Warm white
        "#d4fbff", // Light cyan
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.y += this.speed
      this.brightness = Math.sin(Date.now() * 0.001 * this.speed) * 0.5 + 0.5

      if (this.y > this.canvas.height) {
        this.y = 0
        this.x = Math.random() * this.canvas.width
      }
    }

    draw() {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      this.ctx.fillStyle = this.color
      this.ctx.globalAlpha = this.brightness
      this.ctx.fill()

      // Star glow
      this.ctx.shadowBlur = this.size * 2
      this.ctx.shadowColor = this.color
    }
  }

  class Starfield {
    constructor() {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")
      this.stars = []
      this.numStars = 200

      // Add canvas to background
      this.canvas.style.position = "fixed"
      this.canvas.style.top = "0"
      this.canvas.style.left = "0"
      this.canvas.style.width = "100%"
      this.canvas.style.height = "100%"
      this.canvas.style.zIndex = "-2"
      document.body.appendChild(this.canvas)

      this.resizeCanvas()
      window.addEventListener("resize", () => this.resizeCanvas())

      this.createStars()
      this.animate()
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }

    createStars() {
      for (let i = 0; i < this.numStars; i++) {
        this.stars.push(new Star(this.canvas))
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Draw background gradient
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
      gradient.addColorStop(0, "#0a0a20")
      gradient.addColorStop(1, "#050510")
      this.ctx.fillStyle = gradient
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      // Update and draw stars
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].update()
        this.stars[i].draw()
      }

      requestAnimationFrame(() => this.animate())
    }
  }

  // Initialize starfield
  new Starfield()

  // Gradient text animation
  const gradientTexts = document.querySelectorAll(".gradient-text")

  gradientTexts.forEach((text) => {
    const colors = ["var(--primary-color)", "var(--secondary-color)", "var(--accent-color)"]

    let colorIndex = 0

    setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length
      text.style.color = colors[colorIndex]
    }, 2000)
  })

  // Initialize any custom components
  initializeComponents()
})

function initializeComponents() {
  // Add any additional component initializations here

  // Example: Initialize cosmic sphere animation
  const sphere = document.querySelector(".cosmic-sphere")
  if (sphere) {
    // Additional sphere animations could be added here
  }

  // Example: Initialize DNA strand animation
  const dnaStrand = document.querySelector(".dna-strand")
  if (dnaStrand) {
    // Additional DNA animations could be added here
    }
  }