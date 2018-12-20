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
      gridObj.BuildGrid_CSS()
   }

   BeginGame() {
      console.log('BeginGame()')
      let validation = menuObj.ValidatePlayerNames()
      if (validation == true) {
         menuObj.DisableMenuParts(true)
         console.log('validation true')
         gameLogic.SetCurrentPlayer(1, menuObj.p1Name.value, 'red')
         gameLogic.CreateCoordinatesListener()
      }
   }

   ValidatePlayerNames() {
      const regExp = /^[a-zA-Z]{2,10}$/
      let p1n = this.p1Name.value
      let p2n = this.p2Name.value

      if ((p1n == p2n) || (!regExp.test(p1n) && !regExp.test(p2n))) {
         this.p1Name.classList.add('invalid')
         this.p2Name.classList.add('invalid')
         return false

      } else if (!regExp.test(p1n)) {
         this.p1Name.classList.add('invalid')
         return false

      } else if (!regExp.test(p2n)) {
         this.p2Name.classList.add('invalid')
         return false

      } else {
         this.p1Name.classList.remove('invalid')
         this.p2Name.classList.remove('invalid')
         console.log('correct p1 p2')
         return true
      }
   }

   DisableMenuParts(boolean) {
      if (boolean == true) {
         this.beginGameBtn.setAttribute('disabled', 'disabled')
         this.options.setAttribute('disabled', 'disabled')
         this.p1Name.setAttribute('disabled', 'disabled')
         this.p2Name.setAttribute('disabled', 'disabled')
      } else {
         console.log('boolean: ' + boolean)
      }
   }
}