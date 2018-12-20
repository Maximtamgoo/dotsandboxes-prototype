'use strict'
class GameLogic {
   constructor() {
      this.test = document.getElementById('test')
      this.currentPlayer
      this.currentPlayerName
      this.currentColor
      this.selectedCoordIndex
      this.player_1_Score = 0
      this.player_1_Color = 'red'
      this.player_2_Score = 0
      this.player_2_Color = 'blue'
   }

   SetCurrentPlayer(currentPlayer, playerName, color) {
      this.currentPlayer = currentPlayer
      this.currentColor = color
      this.currentPlayerName = playerName
      // Hovering Line Color
      document.styleSheets[1].cssRules[6].style.backgroundColor = this.currentColor
      // Display player's turn
      document.querySelector('#player-turn').textContent = `${this.currentPlayerName}'s Turn (${this.currentColor})`
   }

   SwitchPlayers() {
      if (this.currentPlayer === 1) {
         this.SetCurrentPlayer(2, menuObj.p2Name.value, 'blue')
      } else {
         this.SetCurrentPlayer(1, menuObj.p1Name.value, 'red')
      }
   }

   CreateCoordinatesListener() {
      let allLines = document.querySelectorAll('.h, .v')
      let eachLine = Array.from(allLines)
      eachLine.forEach(line => {
         line.addEventListener('click', this.GetCoords)
      })
   }

   RemoveLineListener(line) {
      line.removeEventListener('click', this.GetCoords)
      // Taken Line Color
      line.style.backgroundColor = this.currentColor
      line.style.border = '1px solid black'
      line.style.cursor = 'auto'
   }

   GetCoords(line) {
      line = line.target
      console.log('line', line)

      // let x, y
      // if (gridObj.TESTcoordList.includes(line)) {
      //    x = Number(line.attributes.x.value)
      //    y = Number(line.attributes.y.value)
      //    gameLogic.RunMove(line, x, y)
      // }

      let x, y
      if (line.className === 'h' || line.className === 'v') {
         x = Number(line.attributes.x.value)
         y = Number(line.attributes.y.value)
         gameLogic.RunMove(line, x, y)
      }
   }

   RunMove(line, x, y) {
      console.log('RunMove', x, y)

      this.test.textContent = `${x}, ${y}`
      this.RemoveLineListener(line)
      this.FindIndexOfSelectedCoord_and_SetCoordToTaken(x, y)

      let boxCoordIndexes = this.CheckForBox()
      if (Array.isArray(boxCoordIndexes)) {
         this.StyleTheBoxes(boxCoordIndexes)
         this.SetAndStyleTheScore(boxCoordIndexes.length)
      } else {
         this.SwitchPlayers()
            
      }

      // check coordList if taken, set to taken
      // check boxList if a box is full
      // score
      // winner? => reset/play again
      // set playerTurn to opposite player
      let noMovesLeft = gridObj.coordList.every((e) => e.taken === true)
      if (noMovesLeft) {
         this.EndGame()
      }
      // return
   }

   FindIndexOfSelectedCoord_and_SetCoordToTaken(xx, yy) {
      this.selectedCoordIndex = gridObj.coordList.findIndex((c) => c.x === xx && c.y === yy)
      gridObj.coordList[this.selectedCoordIndex].taken = true
   }

   CheckForBox() {
      let gridSize = gridObj.gridSize
      let coordList = gridObj.coordList
      
      let orient = coordList[this.selectedCoordIndex].orient
      let surroundingLineIndexesList = findIndexes.FindSurroundingLineIndexes(this.selectedCoordIndex, orient, gridSize, coordList)
      console.log('surroundingLineIndexesList',surroundingLineIndexesList)

      let foundBox1 = false
      let foundBox2 = false
      if (surroundingLineIndexesList.box1.length !== 0) {
         foundBox1 = surroundingLineIndexesList.box1.every((e) => coordList[e].taken === true)
      }
      if (surroundingLineIndexesList.box2.length !== 0) {
         foundBox2 = surroundingLineIndexesList.box2.every((e) => coordList[e].taken === true)
      }
      let boxCoordIndexes = []
      if (foundBox1 || foundBox2) {
         return boxCoordIndexes = findIndexes.FindBoxCoordIndex(this.selectedCoordIndex, orient, gridSize, foundBox1, foundBox2)
      } else {
         return 'no box found'
      }

   }

   SetAndStyleTheScore(numOfBoxes){
      let scoreDiv = document.querySelector(`#player-${this.currentPlayer}-score`)
      if (this.currentPlayer === 1) {
         this.player_1_Score += numOfBoxes
         scoreDiv.textContent = `${menuObj.p1Name.value}: ${this.player_1_Score}`
      } else {
         this.player_2_Score += numOfBoxes
         scoreDiv.textContent = `${menuObj.p2Name.value}: ${this.player_2_Score}`
      }
      
   }

   StyleTheBoxes(boxCoordIndexes) {
      let coordList = gridObj.coordList
      let boxDivs = gridObj.boxDivs
      boxCoordIndexes.forEach((e) => {
         let index = coordList[e].boxNum
         boxDivs[index].style.margin = '0'
         boxDivs[index].style.backgroundColor = this.currentColor
      })
   }

   EndGame() {
      this.test.textContent = 'No Moves Left'
   }
}