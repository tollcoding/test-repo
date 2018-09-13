const hue = ~~(Math.random()*360)
document.body.style.background = `linear-gradient(
  hsl(${hue}, 85%, 20%) 1%, 
  hsl(${hue + 30 + ~~(Math.random()*30)}, 85%, 20%)
)`

const width = window.innerWidth
const height = window.innerHeight
const NS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(NS, 'svg')
svg.setAttribute('NS', NS)
svg.setAttribute('width', width)
svg.setAttribute('height', height)
svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
document.body.appendChild(svg)

const center = [
  width * 0.25,
  height * 0.5
]

function circle(center, r) {
  const c = document.createElementNS(NS, 'circle')
  c.setAttribute('cx', center[0])
  c.setAttribute('cy', center[1])
  c.setAttribute('r', r)
  c.setAttribute('fill', 'none')
  c.setAttribute('stroke', 'black')
  svg.appendChild(c)
  return c
}

const size = Math.min(width, height) * 0.2
let delta = size * 0.02
const deltaA = 1 * delta * Math.PI / size
const hPI = Math.PI * 0.5
const circles = []
for(let r = size, i = 0; r > 1; r -= delta, i++) {
  delta *= 1.02
  circles.push(circle(center, r))
  center[0] -= delta * Math.cos(hPI + i * deltaA) * 5
  center[1] -= delta * Math.sin(0.5 * hPI + 6 * i * deltaA) * 2
}
let frame = 0
function tick() {
  frame++
  let transform = 0
  requestAnimationFrame(tick)
  circles.forEach((c,i) => {
    transform = delta * Math.sin(
      frame * deltaA * 0.5 + i * deltaA * 6
    ) * 6 
    c.style.transform = `translateY(${transform}px)`
  })
}

tick()