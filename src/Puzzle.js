import React, { useState } from "react"

const GAME_SIZE = 3 // x,y dimensions of the board are same
const STYLE_INVISIBLE = {backgroundColor:"transparent", borderColor:"transparent", color:"transparent" }

function initGame() { return [...Array(GAME_SIZE*GAME_SIZE).keys()].sort((a, b) => 0.5 - Math.random()) }

export default function Puzzle() {
  let [board, setBoard] = useState( initGame() )
  let freeIndex = board.indexOf(0)
  console.log(board)
  return (
    <div className="Puzzle">
      React Puzzle. controls: to move click the number next to the empty field 
      { (board.filter( (n,i)=> n===(i+1) ).length===GAME_SIZE*GAME_SIZE-1) && <div>Well done, completed!</div>}
      <div><button onClick={ ()=> setBoard(initGame())}>New game</button></div>
      { board.map( (field, index) => {
          let out = []
          out.push(<button onClick={ ()=> {
            let activeSurrounding=[]
            if ( Math.floor((index+1)/GAME_SIZE) === Math.floor((freeIndex-1)/GAME_SIZE) ) activeSurrounding.push(freeIndex-1)
            if ( Math.ceil( (index+1)/GAME_SIZE) === Math.ceil((freeIndex+1) /GAME_SIZE) ) activeSurrounding.push(freeIndex+1) 
            if ( [...activeSurrounding, freeIndex-GAME_SIZE, freeIndex+GAME_SIZE].includes(index) ) {
              let newBoard = [...board]
              let temp = newBoard[index];
              newBoard[index] = newBoard[freeIndex];
              newBoard[freeIndex] = temp;
              setBoard(newBoard)          
            }
          } } style={field === 0 ? STYLE_INVISIBLE : null }>{field}</button>)
          if ( (index+1)%GAME_SIZE === 0 ) out.push(<br/>)    // new line
          return out
        }) }
    </div>
  );
}