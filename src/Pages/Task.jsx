import axios from "axios";
import React, { useEffect } from "react"
import { useState } from "react"

function Task() {
  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [editingTask,setEditingTask] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("auth-token");

  //fetch All tasks
  const fetchAllTasks = async()=>{
   try {
    const res =await axios.get(`${API_URL}/api/task/getAll`,{
      headers:{
         "Content-Type":"application/json",
          "auth-token":token
        }
    })
    setTasks(res.data.tasks)
   } catch (error) {
    console.error("Error fetching task",error)
   }
  }
  
  useEffect(()=>{
    fetchAllTasks();
  },[])
   
   //Add Task
   const handleAddtask =async(e)=>{
    e.preventDefault();
    try {
        await axios.post(`${API_URL}/api/task/create`,{title,description},{
      headers:{
         "Content-Type":"application/json",
          "auth-token":token
        }
    })
    setTitle("");
    setDescription("");
    fetchAllTasks();
   } catch (error) {
    console.error("Error fetching task",error)
   }
  }
   

   //update task
      const handleUpdatetask =async(e)=>{
    e.preventDefault();
    try {
       await axios.put(`${API_URL}/api/task/update/${editingTask.id}`,{title,description},{
      headers:{
         "Content-Type":"application/json",
          "auth-token":token
        }
    })
    setTitle("");
    setDescription("");
    setEditingTask(null)
    fetchAllTasks();
   } catch (error) {
    console.error("Error updating task",error)
   }
  }
  
  //Deleting task

    const handleDeletetask =async(id)=>{
    try {
       await axios.delete(`${API_URL}/api/task/delete/${id}`,{
      headers:{
         "Content-Type":"application/json",
          "auth-token":token
        }
    })
      fetchAllTasks();
   } catch (error) {
    console.error("Error deleting task",error)
   }
  }
  
  const startEditing = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description)
  }


  return (
  <div className="task">
    <div className="flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

      <form onSubmit={editingTask ? handleUpdatetask : handleAddtask} className="border p-4 rounded-lg w-96" >
        <input type="text" placeholder="task title" className="border w-full p-2 mb-2 rounded"
        value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <textarea type="text" placeholder="task description" className="border w-full p-2 mb-2 rounded"
        value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <button className="bg-blue-400 text-white p-2 w-full rounded" type="submit">{editingTask ? "Update Task": "Add Task" }</button>
      </form>
       
       <div className="mt-6 w-96">
        <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
        {tasks.length === 0 ?(
          <p>No tasks available</p>
        ):(
          tasks.map((task)=>(
            <div key={task.id} className="border p-3 rounded mb-2 flex justify-between w-full">
             <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
             </div>
             <div className="flex gap-3">
              <button onClick={()=>startEditing(task)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button onClick={()=>handleDeletetask(task.id)} className="bg-red-400 text-white px-2 py-1">Delete</button>
             </div>
            </div>
          ))
        )}
       </div>

    </div>
  </div>    

)
}

export default Task