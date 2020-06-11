let song = new Audio(
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Oddities/Kevin_MacLeod_-_Sinfonia_3.mp3"
  );

class Game {
    constructor () {
        let canvas = document.querySelector('#run-board')
        let context = canvas.getContext('2d')
        this.gameSize = { x: canvas.width, y: canvas.height }
        this.player = new Player(this.gameSize)
        this.bodies = []
        this.bodies = this.bodies.concat(new Enemy(this))
        this.bodies = this.bodies.concat(new Enemy(this))
        this.bodies = this.bodies.concat(new Enemy(this))
        this.bodies = this.bodies.concat(new Enemy(this))
        this.bodies = this.bodies.concat(new Enemy(this))
        this.bodies = this.bodies.concat(new Enemy(this))
        this.bodies = this.bodies.concat(new Enemy(this))
        
        let animate = () => {
            context.clearRect(0, 0, this.gameSize.x, this.gameSize.y)
            this.update()
            this.player.update()
            this.drawPlayer(context, this.gameSize)
            this.drawBodies(context)
            requestAnimationFrame(animate)
        }
        animate()
    }
    
    drawPlayer (context) {

        let startingXPosition = this.player.center.x - this.player.size.x / 2
        let startingYPosition = this.player.center.y - this.player.size.y / 2
        let imageUrl = new Image ()
        imageUrl.src = 'Letter-I.png'
        context.drawImage(imageUrl, startingXPosition, startingYPosition, this.player.size.x, this.player.size.y)
    } 

    drawBodies (context) {
        for (let body of this.bodies) {
            body.update(context)
        }
    }
    
    update () {
        const isColliding = (b1) => {
            return this.bodies.filter(function (b2) { return colliding(b1, b2) }).length > 0
          }
          for (let enemy in this.bodies) {
            if (isColliding(this.player,enemy)) 
            console.log('colliding') }
    }
}

class Enemy {
    constructor (game) {
        this.game = game
        this.size = { x: 50, y: 35 }
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
      draw (context) {
        let startingXPosition = this.center.x - this.size.x / 2
        let startingYPosition = this.center.y - this.size.y / 2
        let imageUrl = new Image ()
        imageUrl.src = 'team1.png'
        context.drawImage(imageUrl, startingXPosition, startingYPosition, this.size.x, this.size.y)
    }
    update (context) {
       this.draw(context)
        {
            if (this.center.dir === "L") {
                if (this.center.x <= 0 - this.size.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x -= 5
                  this.center.y -= 5
                }
            } else if (this.center.dir === "U") {
                if (this.center.y <= 0 - this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y -= 5;
                  this.center.x += 5
                }
            } else if (this.center.dir === "R") {
                if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.x += 5;
                  this.center.y += 5
                }
            } else if (this.center.dir === "D" ) {
                if (this.center.y >= this.game.gameSize.y + this.size.y) {
                  this.center = this.generateStartingPosition(this.game.gameSize)
                } else {
                  this.center.y += 5;
                  this.center.x -= 5;
                }
            }
        }
    }
}

// class Enemy2 {
//     constructor (game, center) {
//         this.game = game
//         this.size = { x: 25, y: 25 }
//         this.center = this.generateStartingPosition(game.gameSize)

//     }

//     generateStartingPosition(gameSize) {
//         let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
//         let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
//         if (startingPosition === "Right") {
//           return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
//         } else if (startingPosition === "Bottom") {
//           return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
//         } else if (startingPosition === "Left") {
//           return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
//         } else if (startingPosition === "Top") {
//           return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
//         }
//       }

//     update (context) {  

//         console.log('enemy update called')
//         context.fillStyle = 'yellow'
//         context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

//         {
//             if (this.center.dir === "L") {
//                 if (this.center.x <= 0 - this.size.x) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.x -= 4 
//                   this.center.y -= 4
//                 }
//             } else if (this.center.dir === "U") {
//                 if (this.center.y <= 0 - this.size.y) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.y -= 4;
//                   this.center.x += 4 
//                 }
//             } else if (this.center.dir === "R") {
//                 if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.x += 4;
//                   this.center.y += 4
//                 }
//             } else if (this.center.dir === "D" ) {
//                 if (this.center.y >= this.game.gameSize.y + this.size.y) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.y += 4;
//                   this.center.x -= 4;
//                 }
//             }
//         }    
//     }
// }

// class Enemy3 {
//     constructor (game, center) {
//         this.game = game
//         this.size = { x: 25, y: 25 }
//         this.center = this.generateStartingPosition(game.gameSize)
//     }

//     generateStartingPosition(gameSize) {
//         let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
//         let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
//         if (startingPosition === "Right") {
//           return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
//         } else if (startingPosition === "Bottom") {
//           return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
//         } else if (startingPosition === "Left") {
//           return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
//         } else if (startingPosition === "Top") {
//           return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
//         }
//       }

//     update (context) {  

//         console.log('enemy update called')
//         context.fillStyle = 'red'
//         context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

//         {
//             if (this.center.dir === "L") {
//                 if (this.center.x <= 0 - this.size.x) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.x -= 4 
//                   this.center.y -= 4
//                 }
//             } else if (this.center.dir === "U") {
//                 if (this.center.y <= 0 - this.size.y) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.y -= 4;
//                   this.center.x += 4 
//                 }
//             } else if (this.center.dir === "R") {
//                 if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.x += 4;
//                   this.center.y += 4
//                 }
//             } else if (this.center.dir === "D" ) {
//                 if (this.center.y >= this.game.gameSize.y + this.size.y) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.y += 4;
//                   this.center.x -= 4;
//                 }
//             }
//         }    
//     }
// }

// class Enemy4 {
//     constructor (game, center) {
//         this.game = game
//         this.size = { x: 25, y: 25 }
//         this.center = this.generateStartingPosition(game.gameSize)

//     }

//     generateStartingPosition(gameSize) {
//         let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
//         let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];
  
//         if (startingPosition === "Right") {
//           return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
//         } else if (startingPosition === "Bottom") {
//           return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
//         } else if (startingPosition === "Left") {
//           return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
//         } else if (startingPosition === "Top") {
//           return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
//         }
//       }

//     update (context) { 

//         console.log('enemy update called')
//         context.fillStyle = 'blue'
//         context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

//         {
//             if (this.center.dir === "L") {
//                 if (this.center.x <= 0 - this.size.x) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.x -= 4 
//                   this.center.y -= 4
//                 }
//             } else if (this.center.dir === "U") {
//                 if (this.center.y <= 0 - this.size.y) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.y -= 4;
//                   this.center.x += 4 
//                 }
//             } else if (this.center.dir === "R") {
//                 if (this.center.x >= this.game.gameSize.x + this.game.gameSize.x) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.x += 4;
//                   this.center.y += 4
//                 }
//             } else if (this.center.dir === "D" ) {
//                 if (this.center.y >= this.game.gameSize.y + this.size.y) {
//                   this.center = this.generateStartingPosition(this.game.gameSize)
//                 } else {
//                   this.center.y += 4;
//                   this.center.x -= 4;
//                 }
//             }
//         }    
//     }
// }

class Player {
    constructor (gameSize) {
      this.size = { x: 50, y: 50 }
      this.center = { x: gameSize.x / 2, y: gameSize.y / 2 }
      this.keyboarder =  Keyboarder
    }
    update () {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
          this.center.x -= 3
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
          this.center.x += 3
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
          this.center.y -= 3
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
          this.center.y += 3
        }
    }
}  

function colliding (b1, b2) {
    return !(
      b1 === b2 ||
      b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
      b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
      b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
      b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    )
}

let game = new Game()
window.addEventListener("keydown", (event) => {
    song.play();
  });