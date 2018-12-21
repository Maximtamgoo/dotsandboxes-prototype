'use strict'
class Menu {
   constructor() {
      this.beginGameBtn = document.getElementById("begin-game-btn")
      this.resetBtn = document.getElementById("reset-btn")
      this.options = document.getElementById("size-drop-down")
      this.p1Name = document.getElementById("player-1-input")
      this.p2Name = document.getElementById("player-2-input")
   }
   MenuListener() {
      this.options.addEventListener('change', this.SizeDropDown)
      this.beginGameBtn.addEventListener('click', this.BeginGame)
   }

   SizeDropDown(e) {
      gridObj.gridSize = Number(e.target.value)
      gridObj.BuildGrid_HTML()
   }

   BeginGame() {
      console.log('BeginGame()')
      menuObj.DisableMenuParts()
      gameLogic.SetCurrentPlayer(1, 'Player One', 'orange')
      gameLogic.CreateCoordinatesListener()

   }

   DisableMenuParts() {
      this.beginGameBtn.setAttribute('disabled', 'disabled')
      this.options.setAttribute('disabled', 'disabled')
   }
}