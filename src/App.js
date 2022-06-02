import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import TodoComponent from './files/todoComponent';
import {useState,useContext,createContext } from 'react';
export const AppContext = createContext();

function App() {

  const [folders,setFolders]=useState(localStorage.getItem("archit-todo-folders")?JSON.parse(localStorage.getItem("archit-todo-folders")):[]);
  const [tasks,setTasks]=useState(localStorage.getItem("archit-todo-tasks")?JSON.parse(localStorage.getItem("archit-todo-tasks")):[]);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };
  const dateFormat=(date)=>{
      const d = new Date(date);
      const month = ("0000"+(d.getMonth()+1)).slice(-2);
      const day = ("0000"+d.getDate()).slice(-2);
      const year = ("0000"+d.getFullYear()).slice(-4);
      const hour = ("0000"+d.getHours()).slice(-2);
      const min = ("0000"+d.getMinutes()).slice(-2);
      const sec = ("0000"+d.getSeconds()).slice(-2);
      return `${day}/${month}/${year} ${hour}:${min}:${sec}`;
  }
  return (
    <div className="App">
      <AppContext.Provider value={{folders,tasks,selectedFolder,setSelectedFolder,setFolders,setTasks,expanded,setExpanded,handleChange,dateFormat}}>
        <TodoComponent />
      </AppContext.Provider>
    </div>
  );
}

export default App;
