class Game {
    constructor () {
        let canvas = document.querySelector('#run-board')
        let context = canvas.getContext('2d')
        this.gameSize = { x: canvas.width, y: canvas.height }

        this.player = new Player(this.gameSize)
        this.bodies = []
        this.bodies = this.bodies.concat(new Enemy(this, { x: 0 , y: 0 }))
        this.bodies = this.bodies.concat(new Enemy2(this, { x: 0 , y: 0 }))
        this.bodies = this.bodies.concat(new Enemy3(this, { x: 0 , y: 0 }))
        this.bodies = this.bodies.concat(new Enemy4(this, { x: 0 , y: 0 }))



        
        let animate = () => {
            context.clearRect(0, 0, this.gameSize.x, this.gameSize.y)
            this.update()
            this.drawPlayer(context, this.gameSize)
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
        this.size = { x: 25, y: 25 }
        this.center = this.generateStartingPosition(game.gameSize)

    }

    generateStartingPosition(gameSize) {
        let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
        let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
        if (startingPosition === "Right") {
          return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
        } else if (startingPosition === "Bottom") {
          return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
        } else if (startingPosition === "Left") {
          return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
        } else if (startingPosition === "Top") {
          return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
        }
      }

    update (context) {

        // let xchange = Math.floor(Math.random()*10 + 1)
        // let ychange = Math.floor(Math.random()*10)
        // this.center.y += ychange    
        // this.center.x += xchange    

        console.log('enemy update called')
        context.fillStyle = 'chartreuse'
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

        {
            if (this.center.dir === "L") {
                if (this.center.x <= 0 - this.size.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x -= 6 
                  this.center.y -= 6
                }
            } else if (this.center.dir === "U") {
                if (this.center.y <= 0 - this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y -= 6;
                  this.center.x += 6 
                }
            } else if (this.center.dir === "R") {
                if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x += 6;
                  this.center.y += 6
                }
            } else if (this.center.dir === "D" ) {
                if (this.center.y >= this.game.gameSize.y + this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y += 6;
                  this.center.x -= 6;
                }
            }
        }    
    }
}

class Enemy2 {
    constructor (game, center) {
        this.game = game
        this.size = { x: 25, y: 25 }
        this.center = this.generateStartingPosition(game.gameSize)

    }

    generateStartingPosition(gameSize) {
        let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
        let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
        if (startingPosition === "Right") {
          return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
        } else if (startingPosition === "Bottom") {
          return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
        } else if (startingPosition === "Left") {
          return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
        } else if (startingPosition === "Top") {
          return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
        }
      }

    update (context) {  

        console.log('enemy update called')
        context.fillStyle = 'yellow'
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

        {
            if (this.center.dir === "L") {
                if (this.center.x <= 0 - this.size.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x -= 6 
                  this.center.y -= 6
                }
            } else if (this.center.dir === "U") {
                if (this.center.y <= 0 - this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y -= 6;
                  this.center.x += 6 
                }
            } else if (this.center.dir === "R") {
                if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x += 6;
                  this.center.y += 6
                }
            } else if (this.center.dir === "D" ) {
                if (this.center.y >= this.game.gameSize.y + this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y += 6;
                  this.center.x -= 6;
                }
            }
        }    
    }
}

class Enemy3 {
    constructor (game, center) {
        this.game = game
        this.size = { x: 25, y: 25 }
        this.center = this.generateStartingPosition(game.gameSize)

    }

    generateStartingPosition(gameSize) {
        let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
        let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
        if (startingPosition === "Right") {
          return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
        } else if (startingPosition === "Bottom") {
          return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
        } else if (startingPosition === "Left") {
          return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
        } else if (startingPosition === "Top") {
          return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
        }
      }

    update (context) {  

        console.log('enemy update called')
        context.fillStyle = 'red'
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

        {
            if (this.center.dir === "L") {
                if (this.center.x <= 0 - this.size.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x -= 6 
                  this.center.y -= 6
                }
            } else if (this.center.dir === "U") {
                if (this.center.y <= 0 - this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y -= 6;
                  this.center.x += 6 
                }
            } else if (this.center.dir === "R") {
                if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x += 6;
                  this.center.y += 6
                }
            } else if (this.center.dir === "D" ) {
                if (this.center.y >= this.game.gameSize.y + this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y += 6;
                  this.center.x -= 6;
                }
            }
        }    
    }
}

class Enemy4 {
    constructor (game, center) {
        this.game = game
        this.size = { x: 25, y: 25 }
        this.center = this.generateStartingPosition(game.gameSize)

    }

    generateStartingPosition(gameSize) {
        let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
        let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
        if (startingPosition === "Right") {
          return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
        } else if (startingPosition === "Bottom") {
          return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
        } else if (startingPosition === "Left") {
          return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
        } else if (startingPosition === "Top") {
          return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
        }
      }

    update (context) { 

        console.log('enemy update called')
        context.fillStyle = 'blue'
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

        {
            if (this.center.dir === "L") {
                if (this.center.x <= 0 - this.size.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x -= 6 
                  this.center.y -= 6
                }
            } else if (this.center.dir === "U") {
                if (this.center.y <= 0 - this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y -= 6;
                  this.center.x += 6 
                }
            } else if (this.center.dir === "R") {
                if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x += 6;
                  this.center.y += 6
                }
            } else if (this.center.dir === "D" ) {
                if (this.center.y >= this.game.gameSize.y + this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y += 6;
                  this.center.x -= 6;
                }
            }
        }    
    }
}

class Player {
    constructor (gameSize) {
      this.size = { x: 35, y: 35 }
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