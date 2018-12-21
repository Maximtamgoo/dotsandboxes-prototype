'use strict'
class ConstructGrid {
   constructor(gridSize) {
      this.gridSize = gridSize
      this.boxDivs
      this.coordList
   }

   BuildGrid_HTML() {
      let rows = this.gridSize * 2 + 1//# of cols for each rowH/rowV
      let columns = rows
      let gridParts = ''
      this.coordList = []
      let coordCounterX = -1
      let coordCounterY = -1
      let boxCoordCounter = -1
      for (let rowNum = 1; rowNum <= rows; rowNum++) {
         if (rowNum % 2 !== 0) { // rowH is odd
            ++coordCounterX
            coordCounterY = -1
            gridParts += `<div class="grid-h-row">`
            for (let colNum = 1; colNum <= columns; colNum++) {
               if (colNum % 2 !== 0) { // is odd
                  gridParts += `<div class="grid-dot"></div>`
               } else {
                  gridParts += `<div class="grid-h-col" x="${coordCounterX}" y="${++coordCounterY}"></div>`
                  if (coordCounterX !== this.gridSize * 2) {
                     this.coordList.push({ taken: false, orient: 'h', x: coordCounterX, y: coordCounterY, boxNum: ++boxCoordCounter })
                  } else {
                     this.coordList.push({ taken: false, orient: 'h', x: coordCounterX, y: coordCounterY })
                  }
               }
            }
            gridParts += `</div>`

         } else { // rowV is odd
            ++coordCounterX
            coordCounterY = -1
            gridParts += `<div class="grid-v-row">`
            for (let colNum = 1; colNum <= columns; colNum++) {
               if (colNum % 2 !== 0) {
                  gridParts += `<div class="grid-v-col" x="${coordCounterX}" y="${++coordCounterY}"></div>`
                  this.coordList.push({ taken: false, orient: 'v', x: coordCounterX, y: coordCounterY })
               } else {
                  gridParts += `<div class="grid-box"></div>`
               }
            }
            gridParts += `</div>`
         }
      }
      let divGrid = document.getElementById('div-grid')
      divGrid.innerHTML = ''
      divGrid.innerHTML += gridParts
      this.boxDivs = Array.from(document.querySelectorAll('.grid-box'))
      gameLogic.remainingMoves = this.coordList.length
      console.log(divGrid)
      console.log("coordList", this.coordList)
   }

   CreateBoxList() {
      this.boxList = []
      let count = -1
      this.coordList.forEach((e) => {
         if (e.x % 2 === 0 && e.x !== this.gridSize * 2) {
            this.boxList.push([
               { x: e.x, y: e.y },
               { x: e.x + 1, y: e.y },
               { x: e.x + 1, y: e.y + 1 },
               { x: e.x + 2, y: e.y }
            ])
            // this.boxList[++count] = [
            //    { taken: false, x: e.x, y: e.y },
            //    { taken: false, x: e.x+1, y: e.y },
            //    { taken: false, x: e.x+1, y: e.y+1 },
            //    { taken: false, x: e.x+2, y: e.y }
            // ]

            // this.boxList[`box_${++count}`] = [
            //    { taken: false, x: e.x, y: e.y },
            //    { taken: false, x: e.x+1, y: e.y },
            //    { taken: false, x: e.x+1, y: e.y+1 },
            //    { taken: false, x: e.x+2, y: e.y }
            // ]
         }
      })
      console.log('boxList', this.boxList)
   }
}