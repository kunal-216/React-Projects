import { useState } from 'react'

function App() {
  const [color, setColor] = useState("olive")

  return (
    <div style={{backgroundColor:color , width:"100vw" , height:"100vh"}}>
      <div className='fixed flex flex-wrap justify-center px-2 rounded-lg inset-x-0 bottom-12'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-blue-100 px-3 py-2 rounded-3xl active:border-none'>
          {/* Onclick wants function to be passed inside of it and here parameters are passed too thats why an arrow function so that onclick doesnt get return function value */}
          <button className='outline-none py-2 rounded-3xl text-white shadow-lg' style={{backgroundColor:"red"}} onClick={() => setColor("red")}>Red</button>
          <button className='outline-none py-2 rounded-3xl text-white shadow-lg' style={{backgroundColor:"blue"}} onClick={() => setColor("blue")}>Blue</button>
          <button className='outline-none py-2 rounded-3xl text-white shadow-lg' style={{backgroundColor:"black"}} onClick={() => setColor("black")}>Black</button>
          <button className='outline-none py-2 rounded-3xl text-white shadow-lg' style={{backgroundColor:"green"}} onClick={() => setColor("green")}>Green</button>
          <button className='outline-none py-2 rounded-3xl text-black shadow-lg' style={{backgroundColor:"yellow"}} onClick={() => setColor("yellow")}>Yellow</button>
          <button className='outline-none py-2 rounded-3xl text-black shadow-lg' style={{backgroundColor:"white"}} onClick={() => setColor("white")}>White</button>
          </div>
      </div>
    </div>
  )
}

export default App
