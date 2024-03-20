import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import  Signup from './components/register';
import NavBar from './components/navBar';
import Addtodo from './components/Addtodo';
import TodoList from './components/TodoList';

function App() {

  return (
    
      <div className='w-full bg-zinc-900 min-h-screen'>
        <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
        <div className='container mx-auto flex flex-col p-16 justify-center items-center max-w-5xl'>
        <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<h1 className='text-white text-3xl font-bold pb-8'>My Todos</h1>} />
            <Route path="/add-todo" element={<><h1 className='text-white text-3xl font-bold pb-8'>Add New Todo</h1><Addtodo /></>} />
            <Route path="/todo-list" element={<><h1 className='text-white text-3xl font-bold pb-8'>Todo List</h1><TodoList /></>} />
            </Routes>
        </div>
      </div>
      
  );
}

export default App;



// import './App.css'
// import NavBar from './components/navBar'
// import Addtodo from './components/Addtodo'
// import TodoList from './components/TodoList'

// function App() {

//   return (
//     <>
//       <div className=' w-full bg-zinc-900 min-h-screen'>
//         <NavBar/>
//         <div className=' container mx-auto flex flex-col p-16 justify-center items-center max-w-5xl' >
//           <h1 className=' text-white text-3xl font-bold pb-8'>My Todos</h1>
//           <Addtodo />
//           <TodoList />
//         </div>
//       </div>

//     </>
//   )
// }


