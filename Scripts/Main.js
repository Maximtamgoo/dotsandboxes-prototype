'use strict'
const gridObj = new ConstructGrid(4)
const menuObj = new Menu()
const gameLogic = new GameLogic()
const findIndexes = new FindBoxAndLineIndexes()

gridObj.BuildGrid_HTML()

menuObj.MenuListener()