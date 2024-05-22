import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import the required icons

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5173/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('https://localhost:5173/update/' +id)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
    return (
        <div>
            <h2>To Do List</h2>
            <Create />
            {
                todos.length === 0
                    ? <div><h2>No Record</h2></div>
                    : todos.map((todo, index) => (
                        <div className='task'> 
                            <div className='checkbox' onClick = {()=> handleEdit(todo._id)}>
                                <BsCircleFill className='icon' />
                                <p>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
