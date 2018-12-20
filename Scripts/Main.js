'use strict'
const gridObj = new ConstructGrid(2)
const menuObj = new Menu()
const gameLogic = new GameLogic()
const findIndexes = new FindBoxAndLineIndexes()

gridObj.BuildGrid_HTML()
gridObj.BuildGrid_CSS()

menuObj.MenuListener()