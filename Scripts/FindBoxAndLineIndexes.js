'use strict'
class FindBoxAndLineIndexes {

   FindSurroundingLineIndexes(selectedCoordIndex, orient, gridSize, coordList) {
      if (orient === 'h') {
         return this.Find_Top_Bottom_Lines(selectedCoordIndex, gridSize, coordList)
      } else {
         return this.Find_Left_Right_Lines(selectedCoordIndex, gridSize, coordList)
      }
   }

   FindBoxCoordIndex(selectedCoordIndex, orient, gridSize, foundBox1, foundBox2) {
      let boxIndex = []
      if (foundBox1 && foundBox2) {
         boxIndex.push( this.FindBox_1_Index(selectedCoordIndex, orient, gridSize) )
         boxIndex.push( this.FindBox_2_Index(selectedCoordIndex, orient, gridSize) )

      } else if (foundBox1) {
         boxIndex.push( this.FindBox_1_Index(selectedCoordIndex, orient, gridSize) )
      } else if (foundBox2) {
         boxIndex.push( this.FindBox_2_Index(selectedCoordIndex, orient, gridSize) )
      }

      return boxIndex
   }

   FindBox_1_Index(selectedCoordIndex, orient, gridSize) {
      if(orient === 'h') {
         return (selectedCoordIndex - (gridSize * 2 + 1))
      } else {
         return (selectedCoordIndex - (gridSize + 1))
      }
   }

   FindBox_2_Index(selectedCoordIndex, orient, gridSize) {
      if(orient === 'h') {
         return selectedCoordIndex
      } else {
         return (selectedCoordIndex - gridSize)
      }
   }

   Find_Top_Bottom_Lines(selectedCoordIndex, gridSize, coordList) {

      let t_rightCoord_index, t_leftCoord_index, t_topCoord_index

      if (coordList[selectedCoordIndex].x === 0) {
         t_rightCoord_index = false
         t_leftCoord_index = false
         t_topCoord_index = false
      } else {
         t_rightCoord_index = (selectedCoordIndex - gridSize)
         t_leftCoord_index = (t_rightCoord_index - 1)
         t_topCoord_index = (t_leftCoord_index - gridSize)
      }

      let b_leftCoord_index, b_rightCoord_index, b_bottomCoord_index

      if (coordList[selectedCoordIndex].x === (gridSize * 2)) {
         b_leftCoord_index = false
         b_rightCoord_index = false
         b_bottomCoord_index = false
      } else {
         b_leftCoord_index = (selectedCoordIndex+gridSize)
         b_rightCoord_index = (b_leftCoord_index + 1)
         b_bottomCoord_index = (b_rightCoord_index + gridSize)
      }

      let lineIndexes = {
         box1: [
            t_rightCoord_index,
            t_leftCoord_index,
            t_topCoord_index,
         ],
         box2: [
            b_leftCoord_index,
            b_rightCoord_index,
            b_bottomCoord_index
         ]
      }

      return {
         box1: lineIndexes.box1.filter((e) => e !== false),
         box2: lineIndexes.box2.filter((e) => e !== false)
      }
   }

   Find_Left_Right_Lines(selectedCoordIndex, gridSize, coordList) {
      let l_leftCoord_index, l_topCoord_index, l_bottomCoord_index

      if (coordList[selectedCoordIndex].y === 0) {
         l_leftCoord_index = false
         l_topCoord_index = false
         l_bottomCoord_index = false
      } else {
         l_leftCoord_index = (selectedCoordIndex - 1)
         l_topCoord_index = (l_leftCoord_index - gridSize)
         l_bottomCoord_index = (selectedCoordIndex + gridSize)
      }

      let r_rightCoord_index, r_topCoord_index, r_bottomCoord_index

      if (coordList[selectedCoordIndex].y === gridSize) {
         r_rightCoord_index = false
         r_topCoord_index = false
         r_bottomCoord_index = false
      } else {
         r_rightCoord_index = (selectedCoordIndex + 1)
         r_topCoord_index = (selectedCoordIndex - gridSize)
         r_bottomCoord_index = (r_rightCoord_index + gridSize)
      }

      let lineIndexes = {
         box1: [
            l_leftCoord_index,
            l_topCoord_index,
            l_bottomCoord_index,
         ],
         box2: [
            r_rightCoord_index,
            r_topCoord_index,
            r_bottomCoord_index
         ]
      }

      return {
         box1: lineIndexes.box1.filter((e) => e !== false),
         box2: lineIndexes.box2.filter((e) => e !== false)
      }
   }
}