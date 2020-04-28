import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { fetchTaskList, fetchPostTask, fetchPutTheme, fetchGetTheme } from '../services'


const getTaskList = (setTaskList, setError, username) => {
  fetchTaskList(username)
    .then((taskList) => {
      setTaskList(taskList)

    })
    .catch((err) => {
      setError(err.message);
    });
}

const ToDoListPage = (userinfo) => {

  const [taskList, setTaskList] = useState([]);
  const [taskText, setTask] = useState([]);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('Light');
  const [cssTheme, setThemeCSS] = useState('');

  const addTask = () => {

    if (/\S/.test(taskText)) {
      setError("")
      fetchPostTask(userinfo.username, taskText)
        .then(() => {
          setTask('')

        })
        .catch((err) => {
          setError(err.message);
        });
    }
    else {
      setError("Please Enter valid task")
    }
  }

  const onInput = (event) => {
    setTask(event.target.value);
  }

  const onRefresh = () => {
    getTaskList(setTaskList, setError, userinfo.username);
    getTheme(theme);
    setThemeClassName(theme);
    setError("")
  }

  useEffect(() => {
    if (userinfo.username) {

      getTaskList(setTaskList, setError, userinfo.username);
      getTheme();
      setThemeClassName(theme);
      setError("")
    }
  }, [userinfo.username]);

  const changeTheme = (event) => {
    let currrentTheme = event.target.value;
    setTheme(currrentTheme);
    
    fetchPutTheme(userinfo.username, currrentTheme)
      .then(() => {
        setThemeClassName(currrentTheme);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  const getTheme = () => {
    fetchGetTheme(userinfo.username)
      .then((theme) => {
        setTheme(theme.data)
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  const setThemeClassName = (themeValue) => {
    if (themeValue === 'Light') {
      setThemeCSS('toDo-panel')
      return
    }
    if (themeValue === 'Dark') {
      setThemeCSS('toDo-panel-dark')
      return
    }

    if (themeValue === 'Colourful') {
      setThemeCSS('toDo-panel-colourful')
      return
    }

  }


  return (

    <div id="toDo-app">

      <div className="title">
        Welcome to Task Tracking Page
        </div>

      <div className={cssTheme}>
        {<TaskList taskList={taskList} userinfo={userinfo} />}
        <div>
          <button className="btn-refresh" type="button" onClick={onRefresh} >Refresh
            </button>
        </div>
      </div>
      <div className="theme">
        <select id="theme" className="theme-select" onChange={changeTheme} value={theme}>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="Colourful">Colourful</option>
        </select>
      </div>

      <div>
        <div className="outgoing">
          <input className="task" name="text" type="text" onChange={onInput} value={taskText} />

          <button className="btn-task" type="button" onClick={addTask}>Add Task
            </button>

          <div className="status">
            {error}
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ToDoListPage;
