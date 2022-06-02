import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import TodoComponent from './files/todoComponent';
import {useState,useContext,createContext } from 'react';
export const AppContext = createContext();

function App() {

  const customSort = (a, b) => {
    if(a.status === b.status) {
      return 0;
    }
    else{
      if(a.status === false) {
        return 1;
      }else{
        return -1;
      }
    }
  }
  const [count,setCount]=useState(localStorage.getItem("archit-todo-count")?parseInt(localStorage.getItem("archit-todo-count")):0);
  const [folders,setFolders]=useState(localStorage.getItem("archit-todo-folders")?JSON.parse(localStorage.getItem("archit-todo-folders")):[]);
  const [tasks,setTasks]=useState(localStorage.getItem("archit-todo-tasks")?JSON.parse(localStorage.getItem("archit-todo-tasks")).sort(function(a,b){ if(a.status===b.status){if(a.priority===b.priority){return a.id-b.id;}else{if(a.priority<b.priority)return -1;return 1;}}else{if(a.status===false)return -1;else return 1;} } ):[]);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState(0);
  // const [selectedTasks, setSelectedTasks] = React.useState(folders[0].content);

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
      <AppContext.Provider value={{count,setCount,folders,tasks,selectedFolder,setSelectedFolder,setFolders,setTasks,expanded,setExpanded,handleChange,dateFormat}}>
        <TodoComponent />
      </AppContext.Provider>
    </div>
  );
}

export default App;
