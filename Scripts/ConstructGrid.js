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
            gridParts += `<div class=rowH>`
            for (let colNum = 1; colNum <= columns; colNum++) {
               if (colNum % 2 !== 0) { // is odd
                  gridParts += `<div class="dot"></div>`
               } else {
                  gridParts += `<div class="h" x="${coordCounterX}" y="${++coordCounterY}"></div>`
                  if (coordCounterX !== this.gridSize*2) {
                     this.coordList.push({ taken: false, orient: 'h', x: coordCounterX, y: coordCounterY, boxNum: ++boxCoordCounter})
                  } else {
                     this.coordList.push({ taken: false, orient: 'h', x: coordCounterX, y: coordCounterY})
                  }
               }
            }
            gridParts += `</div>`

         } else { // rowV is odd
            ++coordCounterX
            coordCounterY = -1
            gridParts += `<div class=rowV>`
            for (let colNum = 1; colNum <= columns; colNum++) {
               if (colNum % 2 !== 0) {
                  gridParts += `<div class="v" x="${coordCounterX}" y="${++coordCounterY}"></div>`
                  this.coordList.push({ taken: false, orient: 'v', x: coordCounterX, y: coordCounterY })
               } else {
                  gridParts += `<div class="box"></div>`
               }
            }
            gridParts += `</div>`
         }
      }
      let divGrid = document.getElementById('div-grid')
      divGrid.innerHTML = ''
      divGrid.innerHTML += gridParts
      this.boxDivs = Array.from(document.querySelectorAll('.box'))
      gameLogic.remainingMoves = this.coordList.length
      console.log(divGrid)
      console.log("coordList", this.coordList)
   }

   BuildGrid_CSS() {
      // chrome doesnt like this way unless run from server
      document.styleSheets[1].cssRules[1].style.gridTemplateColumns = `repeat(${this.gridSize}, 10px 35px) 10px`
      document.styleSheets[1].cssRules[2].style.gridTemplateColumns = `repeat(${this.gridSize}, 10px 35px) 10px`

      // old way
      // document.styleSheets[1].deleteRule(1) //delete rowH rule
      // document.styleSheets[1].insertRule(`[class|="rowH"] {display: grid;grid-template-columns: repeat(${this.gridSize}, 10px 35px) 10px;
      //   height: 10px;margin: 0 auto;}`, 1)

      // document.styleSheets[1].deleteRule(2) //delete rowV rule
      // document.styleSheets[1].insertRule(`[class|="rowV"] {display: grid;grid-template-columns: repeat(${this.gridSize}, 10px 35px) 10px;
      //   height: 35px;margin: 0 auto;}`, 2)
   }

   CreateBoxList() {
      this.boxList = []
      let count = -1
      this.coordList.forEach((e) => {
         if (e.x % 2 === 0 && e.x !== this.gridSize * 2) {
            this.boxList.push([
               { x: e.x, y: e.y },
               { x: e.x+1, y: e.y },
               { x: e.x+1, y: e.y+1 },
               { x: e.x+2, y: e.y }
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
      console.log('boxList',this.boxList)
   }
}