import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Contact from './contact.js';
import './App.css';
import logo from './Screenshot_2024-12-22_194714-removebg-preview-removebg-preview.svg';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck, FaItalic } from "react-icons/fa";

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

  }

  const handleDeleteTodo = (index) => {
    let reducedToDo = [...allTodos];
    reducedToDo.splice(index,1);

    localStorage.setItem('todolist', JSON.stringify(reducedToDo));
    setTodos(reducedToDo);
  }

  const handleDeleteCompleteTodo = (index) => {
    let reducedCompleteTodo = [...completedTodos];
    reducedCompleteTodo.splice(index);
    localStorage.setItem('completeTodo', JSON.stringify(reducedCompleteTodo));

    setCompletedTodos(reducedCompleteTodo);
  }

  const handleComplete = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = '' + dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filterItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filterItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completeTodo', JSON.stringify(updatedCompletedArr));

  }
  useEffect(() => {
    let savedToDo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDo = JSON.parse(localStorage.getItem('completeTodo'));
    if (savedToDo) {
      setTodos(savedToDo)
    }
    if (savedCompletedToDo) {
      setCompletedTodos(savedCompletedToDo);
    }
  }, [])

  return (
    <Router>
      <div className="bg-white">
        <header className="relative inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="block">
                <img class="h-16 w-16 transition-transform transform hover:scale-110 active:scale-90" src={logo} alt="" />
              </a>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/" className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-500 underline">HOME</Link>
            <Link to="/contact" className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-500 hover:underline">CONTACT_US</Link>
            </div>

          </nav>
        </header>
        <div className="border border-gray-300 rounded-lg shadow-md mx-auto max-w-4xl">
          <div className="flex space-x-4 mt-5 ml-5">
            <div className="space-y-2">
              <label htmlFor="task-title" className="text-gray-700" >Title:</label>
              <input
                id="task-title"
                type="text"
                placeholder="What's the task title?"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="task-description" className="text-gray-700">Description:</label>
              <input
                id="task-description"
                type="text"
                placeholder="What's the task description?"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                className="bg-indigo-600 mt-8 text-white px-4 py-2 rounded-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>

          <div className="p-6  space-x-4">
            <button
              className={`bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isCompleteScreen === false ? 'active' : ''
                }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button className={`bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isCompleteScreen === true ? 'active' : ''
              }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>

          <div>
            {
              isCompleteScreen === true && completedTodos.map((item, index) => {
                return (
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md" key={index}>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-600"><small>Completd on:{item.completedOn}</small></p>
                    </div>
                    <div className="flex space-x-3 text-gray-600">
                      <MdDeleteOutline className="text-2xl cursor-pointer hover:text-red-500" onClick={() => handleDeleteCompleteTodo(index)} title='Delete?' />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div>
            {
              isCompleteScreen === false && allTodos.map((item, index) => {
                return (
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md" key={index}>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex space-x-3 text-gray-600">
                      <FaCheck className=" text-2xl cursor-pointer hover:text-green-500" onClick={() => handleComplete(index)} />
                      <MdDeleteOutline className="text-2xl cursor-pointer hover:text-red-500" onClick={() => handleDeleteTodo(index)} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <Routes>
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
