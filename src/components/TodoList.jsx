import React, { useEffect, useState } from 'react';
import TodoItems from './Todoitems';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function TodoList() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = () => {
        axios.get("http://localhost:4000/")
            .then(res => setTodos(res.data))
            .catch(err => console.error("Error fetching todos:", err));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <section className='bg-zinc-700 rounded-md mt-4 w-full p-4'>
            <ul className='grid grid-cols-1 gap-4'>
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <Link key={todo.id} to={`/todo/${todo.id}`} className='no-underline'>
                            <TodoItems
                                id={todo.id}
                                name={todo.name}
                                description={todo.description}
                                complete={todo.complete}
                                onTodoUpdate={fetchTodos} // Keeping your original update logic
                            />
                        </Link>
                    ))
                ) : (
                    <li>No todos found.</li>
                )}
            </ul>
        </section>
    );
}




// import React, { useEffect, useState } from 'react';
// import TodoItems from './Todoitems';
// import axios from 'axios';

// export default function TodoList() {
//     const [todos, setTodos] = useState([]);

//     // Function to fetch todos from the backend
//     const fetchTodos = () => {
//         axios.get("http://localhost:4000/")
//             .then(res => {
//                 setTodos(res.data);
//             })
//             .catch(err => console.error("Error fetching todos:", err));
//     };

//     useEffect(() => {
//         fetchTodos(); // Fetch todos on component mount
//     }, []);

//     // Function to refresh the todo list, could be called after an update
//     const handleTodoUpdate = () => {
//         fetchTodos(); // Re-fetch todos to refresh the list
//     };

//     return (
//         <section className='bg-zinc-700 rounded-md mt-4 w-full p-4'>
//             <ul className='grid grid-cols-1 gap-4'>
//                 {todos.length > 0 ? (
//                     todos.map(todo => (
//                         <TodoItems
//                             key={todo.id}
//                             id={todo.id}
//                             name={todo.name}
//                             description={todo.description}
//                             complete={todo.complete}
//                             onTodoUpdate={handleTodoUpdate} // Pass this function to update the todo list
//                         />
//                     ))
//                 ) : (
//                     <li>No todos found.</li>
//                 )}
//             </ul>
//         </section>
//     );
// }



// // import React, { useEffect, useState } from 'react'
// // import TodoItems from './Todoitems'
// // import axios from 'axios'

// // export default function TodoList() {
// //     const [todos, setTodos] = useState([]);
// //     // const todos = [
// //     //     { id: 1, name: "Task 1", description: "This is my task one" , complete: true},
// //     //     { id: 2, name: "Task 2", description: "This is my task two", complete: false},
// //     //     { id: 3, name: "Task 3", description: "This is my task three", complete: true},
// //     //     { id: 4, name: "Task 4", description: "This is my task four", complete: true},
// //     // ]

// //     useEffect(() => {
// //         axios.get("http://localhost:4000/")
// //             .then(res => setTodos(res.data))
// //             .catch(err => console.log(err))
// //     }, [])

// //     return (
// //         <section className='bg-zinc-700 rounded-md mt-4 w-full'>
// //             <ul className='grid grid-cols-1 rounded-md'>
// //                 {(
// //                     todos.map(todo => (
// //                         <TodoItems
// //                           key={todo.id} // Assuming 'id' is the unique identifier in your data
// //                           id={todo.id}
// //                           name={todo.name}
// //                           description={todo.description}
// //                           complete={todo.complete}
// //                           onTodoUpdate={setTodos} // Assuming you have a method to fetch todos
// //                         />
// //                     )))
// //                 }
// //             </ul>
// //         </section>
// //     )
// // }
