import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  // Sbse pehle hmne apne saare variables ki states bna liye aur unke function ke saath jo jo use ho rhe h
  // These are all the states used here which may/may not be changed once ui loads/updates thats why we are holding them in variables and functions
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  // UseState hook used

  // Now to copy the text into the clipboard we will use the useRef hook which is used to store reference and to store the value of the element and then we will use the useEffect hook to call the copy function when the password is changed
  // Using useRef Hook
  // using line number 15 and 67 baat kr paarhe h ref pass krne ki wajeh se thats why hm ab kuch bhi krwa skte h function copyPasstoClipboard se
  const passwordRef = useRef(null)


  // Then hum ek function bnayenge passGenerator jisme basic javascript h jisse hm random password generate krenge
  // This useCallback is also a hook and is used when we need to call the main function like passwordGenerator which will be called again and again when we give true or false for the numbers and special Chars are allowed or not 
  // Therefore this hook lets us callback the passGen function and not call it again and again with using all the variables and the method which it requires
  const passwordGenerator = useCallback(() => {
    // Iske andar hm useCallback wala hook ya function use krenge jo function ko memorise krta h chahe pura krle ya uske parts krle memorise krta h
    // This is the main function where all the js would happen and the work of react is over
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    
    if(numAllowed) str += "0123456789"
    if(specialCharAllowed) str += "`~!@#$%^&*()_-+=[]',./{}|:"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)
    
    // Yeh sb dependencies h jo hm useCallback ko dete h
  }, [length, numAllowed, specialCharAllowed])
  // Here the above hook callback takes place and the main function is passed and with the variables and the function which will be used inside the main function 

  // This useCallback is used to copy the password to the clipboard
  const copyPasstoClipboard = useCallback (() => {
    // Using the useRef hook we can give a better control over the element and we can use it to copy the password to the clipboard and it also selects the whole text in the input field
    passwordRef.current.select()
    // Using this setSelectionRange function we can tell how many we want to select
    passwordRef.current.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  } , [password])
  
  

  // Iss useEffect hook/function basically jb bhi hmara page load hota h first time tb chalata h function ko jo iske andar likha hua hota h ya fir tb jb dependencies array ke andar ki cheezon mein se kisi pr ched chad hui ya kuch bhi badla tb run krdeta h iske andar ka function
  // This useEffect is used to call the main function when the page is loaded
  // This useEffect is used to call the main function when the length, numAllowed and specialCharAllowed are changed 
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, specialCharAllowed, passwordGenerator])


  return (
      <> 
        <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
          <h1 className='text-white text-center pb-2 pt-4'>Password Generator</h1>

          <div className='flex rounded-lg overflow-hidden mb-4 p-4'>
            <input type="text" value={password} className='outline-none w-full py-1 px-3 rounded-lg' placeholder='password' readOnly ref={passwordRef} />
            <button onClick={copyPasstoClipboard} className='bg-blue-700 hover:bg-blue-600 active:bg-blue-700 mx-2 py-2 px-3 rounded-lg text-white outline-none shrink-0'>Copy</button>
          </div>

          <div className='flex text-sm gap-x-2'>

            <div className='flex items-center gap-x-1 mx-4 mb-5'>
              <input type="range" min={4} max={50} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
              <label>Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1 mx-4 mb-5'>
              {/* this prev and !prev means we are taking the last value that is given to make changes accordingly */}
              <input type="checkbox" defaultChecked={numAllowed} id='numberInput' onChange={()=> {setNumAllowed((prev) => !prev)}} />
              <label>Numbers: {numAllowed}</label>
            </div>

            <div className='flex items-center gap-x-1 mx-4 mb-5'>
              <input type="checkbox" defaultChecked={specialCharAllowed} id='charInput' onChange={()=> {setSpecialCharAllowed((prev) => !prev)}} />
              <label>Characters: {specialCharAllowed}</label>
            </div>

          </div>
        </div>
      </>
  )
}

export default App
