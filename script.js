
class Game {
    constructor () {
        let canvas = document.querySelector('#run-board')
        let context = canvas.getContext('2d')
        let gameSize = { x: canvas.width, y: canvas.height }

        this.player = new Player(gameSize)
        this.bodies = []
        this.bodies = this.bodies.concat(new Enemy(this, { x: Math.floor(Math.random()*500) , y: 0 }))
        
        let animate = () => {
            context.clearRect(0, 0, gameSize.x, gameSize.y)
            this.update()
            this.drawPlayer(context, gameSize)
            this.drawBodies(context)
            requestAnimationFrame(animate)
        }
        animate()
    }
    
    drawPlayer (context, gameSize) {
        console.log('draw called')
        context.fillStyle = 'magenta'
        let startingXPosition = this.player.center.x - this.player.size.x / 2
        let startingYPosition = this.player.center.y - this.player.size.y / 2
        let playerWidth = this.player.size.x
        let playerHeight = this.player.size.y
        context.fillRect(startingXPosition, startingYPosition, playerWidth, playerHeight)
    }

    drawBodies (context) {
        console.log('bodiezz')
        for (let body of this.bodies) {
            body.update(context)
        }
    }

    update () {
        this.player.update()
    }
}

class Enemy {
    constructor (game, center) {
        this.game = game
        this.center = center
        this.size = { x: 15, y: 15 }
    }
    update (context) {

        let xchange = Math.floor(Math.random()*10 + 1)
        let ychange = Math.floor(Math.random()*10)
        this.center.y += ychange    

        this.center.x += xchange    

        console.log('enemy update called')
        context.fillStyle = 'chartreuse'
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
    }
}

class Player {
    constructor (gameSize) {
      this.size = { x: 40, y: 40 }
      this.center = { x: gameSize.x / 2, y: gameSize.y / 2 }
      this.keyboarder =  Keyboarder
    }
    update () {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
          this.center.x -= 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
          this.center.x += 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
          this.center.y -= 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
          this.center.y += 2
        }
    }
}  



let game = new Game()

