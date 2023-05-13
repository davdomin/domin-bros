const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =  window.innerWidth
canvas.height =  window.innerHeight

let gravity = 0.5

class Player {
	constructor () {
		this.position = {
			x:100,
			y:100
		}
		this.velocity = {
			x:0,
			y:0
		}
		this.width = 30
		this.height = 30
	}
	draw() {
		c.fillStyle= 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	update() {
		this.draw()
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x
		const bottonPosition = this.position.y + this.height
		if (bottonPosition+this.velocity.y <= canvas.height)
			this.velocity.y += gravity
		else
			this.velocity.y = 0
	}
}

const player = new Player()
const keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	},

}

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0,0,canvas.width, canvas.height)
	player.update()
	if (keys.right.pressed){
		player.velocity.x += 5
	}  else if (keys.left.pressed) {
		player.velocity.x -= 5
	}
	else {
		player.velocity.x = 0
	}
}

function keyDown(event) {
	const code = event.keyCode
	switch (code)
	{
		case 65: // A char
			keys.left.pressed = true
		break;

		case 83: // S char
			player.height = 15
		break;

		case 68: // D char
			keys.right.pressed = true
		break;

		case 87: // W char
			player.velocity.y -= 5
		break;

	}	
}

function keyUp(event) {
	const code = event.keyCode
	switch (code)
	{
		case 65: // A char
			keys.left.pressed = false
		break;

		case 83: // S char
			player.height = 30
		break;

		case 68: // D char
			keys.right.pressed = false
		break;

		case 87: // W char
			player.velocity.y -= 5
		break;

	}	
}
animate()

window.addEventListener('keydown',keyDown)
window.addEventListener('keyup',keyUp)