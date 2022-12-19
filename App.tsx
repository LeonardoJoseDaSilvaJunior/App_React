import { useState } from 'react'
import './App.css'
interface clickedProps{
  clientX : number
  clientY : number
}

function App() {
  
  const [clickedPoints, setClickedPoints] = useState<clickedProps[]>([])
  const [undoPoints, setUndoPoints] = useState<clickedProps[]>([])
  function getCoordinates(e: React.MouseEvent<HTMLElement>){
    const {clientX, clientY } = e
    
    setClickedPoints([...clickedPoints, {clientX, clientY}])
  }
  function handleUndo(){
    const newClickedPoint = [...clickedPoints]
    const undoPoint = newClickedPoint.pop()
    setClickedPoints(newClickedPoint)
    if(!undoPoint) return
    setUndoPoints([...undoPoints, undoPoint])
  }
  function handleredo (){
   const newUndoPoints =[...undoPoints]
   const redoPoint = newUndoPoints.pop()
   if(!redoPoint) return
   setUndoPoints(newUndoPoints)
   setClickedPoints([...clickedPoints,redoPoint])
  }
  return (
    <>
    <button disabled ={clickedPoints.length === 0}onClick={handleUndo}>
    Desfazer
    </button>
    <button disabled = {undoPoints.length === 0}onClick={handleredo}>Refazer</button>

    <div className="App" onClick={getCoordinates}>
      {clickedPoints.map((clickedPoint, index) => {
        return <div className=' img'
        key={index} 
                 style ={{
                  left:clickedPoint.clientX -39, 
                  top:clickedPoint.clientY -35,
                  position: 'absolute',
                  borderRadius:' 50%',
                  width: '10px',
                  height: '10px',
                }}
                 >
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWKmfFZr60wcTxvHgNqfovnmTOtU6Y9hsz1A&usqp=CAU" alt="" />
                 </div>
                 })}
    </div>
    </>
  )
}

export default App
