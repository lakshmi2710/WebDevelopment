import React from 'react'

function ActiveUser({ userList }) {

    if (!userList) {
        return "";
    }

    const userlist = Object.values(userList).map((user) =>
        <p>{user}</p>
    )

    return (
        <div className="users">
            <h3>Active Users</h3>
            <ul className="user-list">
                {userlist}
            </ul>
        </div>

    )
}

export default ActiveUser;