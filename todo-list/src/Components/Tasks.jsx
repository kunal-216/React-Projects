import React, { useEffect,useState } from 'react';
import Task from './Task';

const Tasks = () => {

// Jaise hi hmare tasks mein koi kuch add krega useState ki madad se Task component mein add hote rhenge hmare add kiye hue tasks
// To add the tasks into the local Storage so that on refreshing the page we dont lose the notes 

  const initialArray = localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")):[]; // isse string milegi aur parse se object mein badal rhe h aur useEffect se jaise hi kuch change aaega setTasks wale array mein localStorage mein add hojaegi items

  const [tasks,setTasks] = useState(initialArray)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();

    if (title === '' || description === '') {
        alert('Please enter both title and description.');
        return; // Exit the function early if inputs are empty
    }
    
    // Spread operator ... spreads the elements of the object into only elements like arr = [1,2,3,4] and ...arr gives 1,2,3,4 and not [1,2,3,4]
    // isse array mein jo bhi pehle se pada tha woh add krdia h aur fir element daalte bhi rhe h
    setTasks([...tasks,{title, description}])
    setTitle("")
    setDescription("")
  }

  const deleteTask = (index) => {
    const filteredArray = tasks.filter((val,i) => {
        return i!==index;
    });
    setTasks(filteredArray); // Using this filter function it will only return all the index of the array which are there after deleting the button aur uske baad setTasks mein woh saari array daaldenge jo filteredArray mein abhi bhi pdi hui hai
  }

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks)) // isse jaise hi kuch change hoga localStorage mein add hojaegi string ke form mein
  },[tasks])

  return (
    <>
      <div className='container'>
        <form onSubmit={submitHandler} >
          <input className='inputTask' type="text" placeholder='Enter your task' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <input className='inputDes' type="text" placeholder='Enter description of task' value={description} onChange={(e) => setDescription(e.target.value)}/>
          <button className='btn' type="submit">Add Task</button>
        </form>

        {/* Another way to do this is below this which is the same but the only difference is parenthesis used and no return function */}
        {/* {tasks.map(() => {
            return (
                <Task/>
            )
        })} */}

        {/* No need to use Return Statement here as parenthesis are used*/}
        {tasks.map((item,index) => (
            <Task key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index}/>
        ))}

      </div>
    </>
  )
}

export default Tasks
