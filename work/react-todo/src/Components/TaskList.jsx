import React, { useState } from 'react'
import { fetchPutTask } from '../services'

function TaskList({ taskList, userinfo }) {
    const [changeState, setChangeState] = useState(true)
    const [sortBy, setSortBy] = useState('')
    const [filterState, setFilterState] = useState('All')
    const [error, setError] = useState('')

    if (Object.keys(taskList).length === 0) {
        return "";
    }
    if (Object.keys(taskList.data).length === 0) {
        return "";
    }

    function updateTask(event) {
        if (event.target.classList.contains("update-status")) {
            return;
        }

        if (event.target.classList.contains("delete-btn")) {
            fetchPutTask(userinfo.username, event.target.id)
                .then(() => {
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
        if (event.target.classList.contains("update")) {
            if (/\S/.test(taskList.data[event.target.id].taskName)) {
                fetchPutTask(userinfo.username, event.target.id, taskList.data[event.target.id].taskName, taskList.data[event.target.id].taskStatus)
                    .then(() => {
                    })
                    .catch((err) => {
                        setError(err.message);
                    });
            }
        }
    }

    function changeTask(event) {
        if (event.target.classList.contains("update-text")) {
            taskList.data[event.target.id].taskName = event.target.value;
        }

        if (event.target.classList.contains("update-status")) {
            taskList.data[event.target.id].taskStatus = event.target.value;
        }
        setSortBy('');
        setChangeState(!changeState)
    }


    function customSort(a, b) {
        if (sortBy === "" || typeof taskList.data[a].taskName === 'undefined' || typeof taskList.data[b].taskName === 'undefined') {
            return
        }
        if (sortBy === "taskNameInc") {
            return taskList.data[a].taskName.localeCompare(taskList.data[b].taskName)
        }
        if (sortBy === "taskNameDec") {
            return taskList.data[b].taskName.localeCompare(taskList.data[a].taskName)
        }
        if (sortBy === "taskStatusInc") {
            return taskList.data[a].taskStatus.localeCompare(taskList.data[b].taskStatus)
        }
        if (sortBy === "taskStatusDec") {
            return taskList.data[b].taskStatus.localeCompare(taskList.data[a].taskStatus)
        }
        return
    }

    function triggerSort(event) {
        if (event.target.classList.contains("btn-sort-taskname")) {
            if (sortBy === 'taskNameDec' || sortBy === '') {
                setSortBy('taskNameInc')
            }
            else {
                setSortBy('taskNameDec')
            }

        }
        if (event.target.classList.contains("btn-sort-taskstatus")) {
            if (sortBy === 'taskStatusDec' || sortBy === '') {
                setSortBy('taskStatusInc')
            }
            else {
                setSortBy('taskStatusDec')
            }
        }
        setChangeState(!changeState);
    }

    function filterTaskStatus(event) {
        setFilterState(event.target.value);
    }

    const tasks = Object.keys(taskList.data)
        .sort(customSort)
        .filter(taskid => (typeof taskList.data[taskid].taskName !== "undefined"
            && (filterState === "All" || taskList.data[taskid].taskStatus === filterState))
        )
        .map((eachTask) =>
            <div id={taskList.data[eachTask].taskId} onClick={updateTask} onChange={changeTask} stateRefresh={changeState}>
                <div className="item">
                    <div>

                        <input id={taskList.data[eachTask].taskId} className="update-text" name="name" type="text" value={taskList.data[eachTask].taskName} />


                        <select id={taskList.data[eachTask].taskId} className="update-status" value={taskList.data[eachTask].taskStatus}>
                            <option value={"Done"}>Done</option>
                            <option value={"NotDone"}>NotDone</option>
                        </select>


                        <button id={taskList.data[eachTask].taskId} className="update" type="button" name="button" >update</button>
                        <button id={taskList.data[eachTask].taskId} className="delete-btn" type="button" name="button">x</button>
                    </div>

                </div>
            </div>
        );

    return (
        <div>
            <div>
                <h3>Filter by Status</h3>
                <select id="theme" className="filter-status" onChange={filterTaskStatus}>
                    <option value="All">All</option>
                    <option value="Done">Done</option>
                    <option value="NotDone">NotDone</option>
                </select>
            </div>

            <div className="tasks">
                <h1>Task List</h1>
                <ul>
                    <button className="btn-sort-taskname" type="button" onClick={triggerSort} >Sort Task Name
                     </button>
                    <button className="btn-sort-taskstatus" type="button" onClick={triggerSort} >Sort Task Status
                     </button>
                    {tasks}
                </ul>

            </div>
            <div className="status">
                {error}
            </div>

        </div>

    )

}

export default TaskList;