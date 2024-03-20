import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function TodoItems({ id, name, description, complete: initialComplete, onTodoUpdate }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);
    const [complete, setComplete] = useState(initialComplete);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleCompleteToggle = () => {
        const updatedComplete = !complete;
        axios.put(`http://localhost:4000/update/${id}`, { complete: updatedComplete })
            .then(() => {
                setComplete(updatedComplete);
                if (onTodoUpdate) onTodoUpdate();
            })
            .catch(err => console.error("Error updating completion status:", err));
    };

    const handleDelete = () => {
        if (!complete) {
            axios.delete(`http://localhost:4000/delete/${id}`)
                .then(() => {
                    if (onTodoUpdate) onTodoUpdate();
                })
                .catch(err => console.error("Error deleting item:", err));
        }
    };

    const handleSave = () => {
        if (!complete && editedName && editedDescription) {
            axios.put(`http://localhost:4000/update/${id}`, { name: editedName, description: editedDescription })
                .then(() => {
                    setIsEditMode(false);
                    if (onTodoUpdate) onTodoUpdate();
                })
                .catch(err => console.error("Error saving edits:", err));
        } else {
            console.error("Invalid input data:", { editedName, editedDescription });
        }
    };

    // Example function for navigating to a detailed view of a todo item
    const handleViewDetails = () => {
        navigate(`/todo/${id}`); // Assuming you have a route setup for viewing todo details
    };



// import React, { useState } from 'react';
// import axios from 'axios';

// export default function TodoItems({ id, name, description, complete: initialComplete, onTodoUpdate }) {
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [editedName, setEditedName] = useState(name);
//     const [editedDescription, setEditedDescription] = useState(description);
//     const [complete, setComplete] = useState(initialComplete); // Tracks the completion state locally.

//     // Function to toggle completion status, allows for both marking complete and not complete.
//     const handleCompleteToggle = () => {
//         // Invert the current completion status.
//         const updatedComplete = !complete;
//         axios.put(`http://localhost:4000/update/${id}`, { complete: updatedComplete })
//             .then(() => {
//                 setComplete(updatedComplete); // Update local state on success.
//                 if (onTodoUpdate) onTodoUpdate(); // Call parent callback to refresh the list.
//             })
//             .catch(err => console.error("Error updating completion status:", err));
//     };

//     // Handles the deletion, but only if the task is not complete.
//     const handleDelete = () => {
//         if (!complete) { // Proceed only if the task is not complete.
//             axios.delete(`http://localhost:4000/delete/${id}`)
//                 .then(() => {
//                     if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component after deletion.
//                 })
//                 .catch(err => console.error("Error deleting item:", err));
//         }
//     };

//     // Saves the edits made to the task, but only if the task is not complete.
//     const handleSave = () => {
//         if (!complete && editedName && editedDescription) { // Simple validation check
//           axios.put(`http://localhost:4000/update/${id}`, { name: editedName, description: editedDescription })
//             .then(() => {
//               setIsEditMode(false);
//               if (onTodoUpdate) onTodoUpdate();
//             })
//             .catch(err => console.error("Error saving edits:", err));
//         } else {
//           console.error("Invalid input data:", {editedName, editedDescription});
//         }
//       };
      
    return (
        <li className='w-full p-4 border-2 border-zinc-700 border-b-zinc-900' onClick={handleViewDetails}>
            <div className='flex flex-col justify-between items-center md:flex-row'>
                {isEditMode ? (
                    <>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="mb-2 md:mb-0"
                            disabled={complete} // Editing is disabled if the task is complete.
                        />
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            disabled={complete} // Editing is disabled if the task is complete.
                        />
                        <button onClick={handleSave} className='text-green-500'>Save</button>
                    </>
                ) : (
                    <>

                        <span className={!complete ? "text-amber-500" : "line-through text-gray-500"}>{name}</span>
                        <span className={!complete ? "text-white" : "line-through text-gray-500"}>{description}</span>
                        <button onClick={handleCompleteToggle} className={`text-${complete ? 'red' : 'green'}-500`}>
                            {complete ? 'Mark Not Complete' : 'Mark Complete'}
                        </button>
                        {!complete && <button onClick={() => setIsEditMode(true)} className='text-blue-500'>Edit</button>}
                        {!complete && <button onClick={handleDelete} className='text-red-600'>Delete</button>}
                    </>
                )}
            </div>
        </li>
    );
}




// import React, { useState } from 'react';
// import axios from 'axios';

// export default function TodoItems({ id, name, description, complete: initialComplete, onTodoUpdate }) {
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [editedName, setEditedName] = useState(name);
//     const [editedDescription, setEditedDescription] = useState(description);
//     const [complete, setComplete] = useState(initialComplete); // Track completion state locally

//     // Function to toggle completion status
//     // Modified to also allow marking a task as not complete again
//     const handleCompleteToggle = () => {
//         const updatedComplete = !complete;
//         axios.put(`http://localhost:4000/update/${id}`, { complete: updatedComplete })
//             .then(() => {
//                 setComplete(updatedComplete); // Update local state on success
//                 if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
//             })
//             .catch(err => console.error("Error updating completion status:", err));
//     };

//     // Handle deletion only if not complete
//     // This remains unchanged, as deletion is already conditional based on completion status
//     const handleDelete = () => {
//         if (!complete) {
//             axios.delete(`http://localhost:4000/delete/${id}`)
//                 .then(() => {
//                     if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
//                 })
//                 .catch(err => console.error("Error deleting item:", err));
//         }
//     };

//     // Save edits only if not complete
//     // This action remains conditional based on completion status
//     const handleSave = () => {
//         if (!complete) {
//             axios.put(`http://localhost:4000/update/${id}`, { name: editedName, description: editedDescription })
//                 .then(() => {
//                     setIsEditMode(false); // Exit edit mode on success
//                     if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
//                 })
//                 .catch(err => console.error("Error saving edits:", err));
//         }
//     };

//     return (
//         <li className='w-full p-4 border-2 border-zinc-700 border-b-zinc-900'>
//             <div className='flex flex-col justify-between items-center md:flex-row'>
//                 {isEditMode ? (
//                     <>
//                         <input
//                             type="text"
//                             value={editedName}
//                             onChange={(e) => setEditedName(e.target.value)}
//                             className="mb-2 md:mb-0"
//                             disabled={complete} // Prevent edit if complete
//                         />
//                         <textarea
//                             value={editedDescription}
//                             onChange={(e) => setEditedDescription(e.target.value)}
//                             disabled={complete} // Prevent edit if complete
//                         />
//                         <button onClick={handleSave} className='text-green-500'>Save</button>
//                     </>
//                 ) : (
//                     <>
//                         <span className={!complete ? "text-amber-500" : "line-through text-gray-500"}>{name}</span>
//                         <span className={!complete ? "text-white" : "line-through text-gray-500"}>{description}</span>
//                         <button onClick={handleCompleteToggle} className={`text-${complete ? 'red' : 'green'}-500`}>
//                             {complete ? 'Mark Not Complete' : 'Mark Complete'}
//                         </button>
//                         {!complete && <button onClick={() => setIsEditMode(true)} className='text-blue-500'>Edit</button>}
//                         {!complete && <button onClick={handleDelete} className='text-red-600'>Delete</button>}
//                     </>
//                 )}
//             </div>
//         </li>
//     );
// }





// // import React, { useState } from 'react';
// // import axios from 'axios';

// // export default function TodoItems({ id, name, description, complete: initialComplete, onTodoUpdate }) {
// //     const [isEditMode, setIsEditMode] = useState(false);
// //     const [editedName, setEditedName] = useState(name);
// //     const [editedDescription, setEditedDescription] = useState(description);
// //     const [complete, setComplete] = useState(initialComplete); // Track completion state locally

// //     // Toggle completion status only if not complete
// //     const handleComplete = () => {
// //         if (!complete) {
// //             const updatedComplete = !complete;
// //             axios.put(`http://localhost:4000/update/${id}`, { complete: updatedComplete })
// //                 .then(() => {
// //                     setComplete(updatedComplete); // Update local state on success
// //                     if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
// //                 })
// //                 .catch(err => console.error("Error updating completion status:", err));
// //         }
// //     };

// //     // Handle deletion only if not complete
// //     const handleDelete = () => {
// //         if (!complete) {
// //             axios.delete(`http://localhost:4000/delete/${id}`)
// //                 .then(() => {
// //                     if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
// //                 })
// //                 .catch(err => console.error("Error deleting item:", err));
// //         }
// //     };

// //     // Save edits (this action should be allowed only if not complete)
// //     const handleSave = () => {
// //         if (!complete) {
// //             axios.put(`http://localhost:4000/update/${id}`, { name: editedName, description: editedDescription })
// //                 .then(() => {
// //                     setIsEditMode(false); // Exit edit mode on success
// //                     if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
// //                 })
// //                 .catch(err => console.error("Error saving edits:", err));
// //         }
// //     };

// //     return (
// //         <li className='w-full p-4 border-2 border-zinc-700 border-b-zinc-900'>
// //             <div className='flex flex-col justify-between items-center md:flex-row'>
// //                 {isEditMode ? (
// //                     <>
// //                         <input
// //                             type="text"
// //                             value={editedName}
// //                             onChange={(e) => setEditedName(e.target.value)}
// //                             className="mb-2"
// //                             disabled={complete}
// //                         />
// //                         <textarea
// //                             value={editedDescription}
// //                             onChange={(e) => setEditedDescription(e.target.value)}
// //                             disabled={complete}
// //                         />
// //                         <button onClick={handleSave} className='text-green-500'>Save</button>
// //                     </>
// //                 ) : (
// //                     <>
// //                         <span className={!complete ? "text-amber-500" : "line-through text-gray-500"}>{name}</span>
// //                         <span className={!complete ? "text-white" : "line-through text-gray-500"}>{description}</span>
// //                         {!complete && <button onClick={() => setIsEditMode(true)} className='text-blue-500'>Edit</button>}
// //                         <button onClick={handleComplete} className={`text-${complete ? 'red' : 'green'}-500`}>
// //                             {complete ? 'Mark Not Complete' : 'Mark Complete'}
// //                         </button>
// //                         {!complete && <button onClick={handleDelete} className='text-red-600'>Delete</button>}
// //                     </>
// //                 )}
// //             </div>
// //         </li>
// //     );
// // }






// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // export default function TodoItems({ id, name, description, complete: initialComplete, onTodoUpdate }) {
// // //     const [isEditMode, setIsEditMode] = useState(false);
// // //     const [editedName, setEditedName] = useState(name);
// // //     const [editedDescription, setEditedDescription] = useState(description);
// // //     const [complete, setComplete] = useState(initialComplete); // Track completion state locally

// // //     // Function to toggle completion status
// // //     const handleComplete = () => {
// // //         const updatedComplete = !complete;
// // //         axios.put(`http://localhost:4000/update/${id}`, { complete: updatedComplete })
// // //             .then(() => {
// // //                 setComplete(updatedComplete); // Update local state on success
// // //                 if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
// // //             })
// // //             .catch(err => console.error("Error updating completion status:", err));
// // //     };

// // //     // Function to handle deletion
// // //     const handleDelete = () => {
// // //         axios.delete(`http://localhost:4000/delete/${id}`)
// // //             .then(() => {
// // //                 if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
// // //             })
// // //             .catch(err => console.error("Error deleting item:", err));
// // //     };

// // //     // Function to save edits
// // //     const handleSave = () => {
// // //         axios.put(`http://localhost:4000/update/${id}`, { name: editedName, description: editedDescription })
// // //             .then(() => {
// // //                 setIsEditMode(false); // Exit edit mode on success
// // //                 if (onTodoUpdate) onTodoUpdate(); // Refresh list in parent component
// // //             })
// // //             .catch(err => console.error("Error saving edits:", err));
// // //     };

// // //     return (
// // //         <li className='w-full p-4 border-2 border-zinc-700 border-b-zinc-900'>
// // //             <div className='flex flex-col justify-between items-center md:flex-row'>
// // //                 {isEditMode ? (
// // //                     <>
// // //                         <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="mb-2" />
// // //                         <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
// // //                         <button onClick={handleSave} className='text-green-500'>Save</button>
// // //                     </>
// // //                 ) : (
// // //                     <>
// // //                         <span className={!complete ? "text-amber-500" : "line-through text-gray-500"}>{name}</span>
// // //                         <span className={!complete ? "text-white" : "line-through text-gray-500"}>{description}</span>
// // //                         {!complete && <button onClick={() => setIsEditMode(true)} className='text-blue-500'>Edit</button>}
// // //                         <button onClick={handleComplete} className={`text-${complete ? 'red' : 'green'}-500`}>
// // //                             {complete ? 'Complete' : 'Not Complete'}
// // //                         </button>
// // //                         <button onClick={handleDelete} className='text-red-600'>Delete</button>
// // //                     </>
// // //                 )}
// // //             </div>
// // //         </li>
// // //     );
// // // }




// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';

// // // // export default function TodoItems({ id, name, description, complete, onTodoUpdate }) {
// // // //     const [isEditMode, setIsEditMode] = useState(false);
// // // //     const [editedName, setEditedName] = useState(name);
// // // //     const [editedDescription, setEditedDescription] = useState(description);

// // // //     const handleComplete = () => {
// // // //         axios.put(`http://localhost:4000/update/${id}`, { complete: true })
// // // //             .then(res => {
// // // //                 // Optionally call onTodoUpdate if provided to refresh the todos list
// // // //                 if (onTodoUpdate) onTodoUpdate();
// // // //             })
// // // //             .catch(err => console.log(err));
// // // //     };

// // // //     const handleDelete = () => {
// // // //         axios.delete(`http://localhost:4000/delete/${id}`)
// // // //             .then(res => {
// // // //                 // Optionally call onTodoUpdate if provided to refresh the todos list
// // // //                 if (onTodoUpdate) onTodoUpdate();
// // // //             })
// // // //             .catch(err => console.log(err));
// // // //     };

// // // //     const handleSave = () => {
// // // //         // Sending a PUT request to the backend with the updated name and description
// // // //         axios.put(`http://localhost:4000/update/${id}`, { name: editedName, description: editedDescription })
// // // //             .then(res => {
// // // //                 setIsEditMode(false); // Exit edit mode
// // // //                 // Call onTodoUpdate if provided to refresh the todos list
// // // //                 if (onTodoUpdate) onTodoUpdate();
// // // //             })
// // // //             .catch(err => console.log(err));
// // // //     };


// // // //     return (
// // // //         <li className='w-full p-4 border-2 border-zinc-700 border-b-zinc-900'>
// // // //             <div className='flex flex-col justify-between items-center md:flex-row'>
// // // //                 {isEditMode ? (
// // // //                     <>
// // // //                         <input
// // // //                             type="text"
// // // //                             value={editedName}
// // // //                             onChange={(e) => setEditedName(e.target.value)}
// // // //                             className="mb-2"
// // // //                         />
// // // //                         <textarea
// // // //                             value={editedDescription}
// // // //                             onChange={(e) => setEditedDescription(e.target.value)}
// // // //                         />
// // // //                     </>
// // // //                 ) : (
// // // //                     <>
// // // //                         <span className={!complete ? "text-amber-500" : "line-through text-gray-500"}>{name}</span>
// // // //                         <span className={!complete ? "text-white" : "line-through text-gray-500"}>{description}</span>
// // // //                     </>
// // // //                 )}
// // // //                 <div className='flex flex-row gap-4'>
// // // //                     {!complete && !isEditMode && (
// // // //                         <button onClick={() => setIsEditMode(true)} className='text-blue-500'>
// // // //                             Edit
// // // //                         </button>
// // // //                     )}
// // // //                     {isEditMode && (
// // // //                         <button onClick={handleSave} className='text-green-500'>
// // // //                             Save
// // // //                         </button>
// // // //                     )}
// // // //                     {!complete && (
// // // //                         <button onClick={handleComplete} className='text-green-500'>
// // // //                             Complete
// // // //                         </button>
// // // //                     )}
// // // //                     <button onClick={handleDelete} className='text-red-600'>
// // // //                         Delete
// // // //                     </button>
// // // //                 </div>
// // // //             </div>
// // // //         </li>
// // // //     );
// // // // }


