import {Router,Routes,Route} from 'react-router-dom'
import { RegisterForm } from './Pages/Register'
import { Login } from './Pages/Login'
import Task from './Pages/Task'

function App() {
  
  return (
   <>
   
      
      <Routes>
       
        <Route path='/' element={<RegisterForm className="w-full max-w-md"/>} />
        <Route path='/login' element={<Login className="w-full max-w-md"/>}/>
        <Route path='/task' element={<Task/>}/>
      </Routes>
    
    
</>
  )


}

export default App